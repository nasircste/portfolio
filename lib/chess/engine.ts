import { Chess, type Move, type PieceSymbol } from "chess.js";

// A small alpha-beta chess engine on top of chess.js.
// Material + piece-square tables, move ordering, quiescence search and iterative
// deepening with a time limit. Plays roughly like a club beginner to intermediate player.

const VALUE: Record<PieceSymbol, number> = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };

// Piece-square tables, from White's point of view (row 0 = rank 8).
// prettier-ignore
const PST: Record<PieceSymbol, number[]> = {
  p: [
     0,  0,  0,  0,  0,  0,  0,  0,
    50, 50, 50, 50, 50, 50, 50, 50,
    10, 10, 20, 30, 30, 20, 10, 10,
     5,  5, 10, 25, 25, 10,  5,  5,
     0,  0,  0, 20, 20,  0,  0,  0,
     5, -5,-10,  0,  0,-10, -5,  5,
     5, 10, 10,-20,-20, 10, 10,  5,
     0,  0,  0,  0,  0,  0,  0,  0,
  ],
  n: [
    -50,-40,-30,-30,-30,-30,-40,-50,
    -40,-20,  0,  0,  0,  0,-20,-40,
    -30,  0, 10, 15, 15, 10,  0,-30,
    -30,  5, 15, 20, 20, 15,  5,-30,
    -30,  0, 15, 20, 20, 15,  0,-30,
    -30,  5, 10, 15, 15, 10,  5,-30,
    -40,-20,  0,  5,  5,  0,-20,-40,
    -50,-40,-30,-30,-30,-30,-40,-50,
  ],
  b: [
    -20,-10,-10,-10,-10,-10,-10,-20,
    -10,  0,  0,  0,  0,  0,  0,-10,
    -10,  0,  5, 10, 10,  5,  0,-10,
    -10,  5,  5, 10, 10,  5,  5,-10,
    -10,  0, 10, 10, 10, 10,  0,-10,
    -10, 10, 10, 10, 10, 10, 10,-10,
    -10,  5,  0,  0,  0,  0,  5,-10,
    -20,-10,-10,-10,-10,-10,-10,-20,
  ],
  r: [
     0,  0,  0,  0,  0,  0,  0,  0,
     5, 10, 10, 10, 10, 10, 10,  5,
    -5,  0,  0,  0,  0,  0,  0, -5,
    -5,  0,  0,  0,  0,  0,  0, -5,
    -5,  0,  0,  0,  0,  0,  0, -5,
    -5,  0,  0,  0,  0,  0,  0, -5,
    -5,  0,  0,  0,  0,  0,  0, -5,
     0,  0,  0,  5,  5,  0,  0,  0,
  ],
  q: [
    -20,-10,-10, -5, -5,-10,-10,-20,
    -10,  0,  0,  0,  0,  0,  0,-10,
    -10,  0,  5,  5,  5,  5,  0,-10,
     -5,  0,  5,  5,  5,  5,  0, -5,
      0,  0,  5,  5,  5,  5,  0, -5,
    -10,  5,  5,  5,  5,  5,  0,-10,
    -10,  0,  5,  0,  0,  0,  0,-10,
    -20,-10,-10, -5, -5,-10,-10,-20,
  ],
  k: [
    -30,-40,-40,-50,-50,-40,-40,-30,
    -30,-40,-40,-50,-50,-40,-40,-30,
    -30,-40,-40,-50,-50,-40,-40,-30,
    -30,-40,-40,-50,-50,-40,-40,-30,
    -20,-30,-30,-40,-40,-30,-30,-20,
    -10,-20,-20,-20,-20,-20,-20,-10,
     20, 20,  0,  0,  0,  0, 20, 20,
     20, 30, 10,  0,  0, 10, 30, 20,
  ],
};

const MATE = 100000;

class Timeout extends Error {}

/** Static evaluation in centipawns from the side to move's point of view. */
function evaluate(game: Chess): number {
  let score = 0;
  const board = game.board();
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const sq = board[r][c];
      if (!sq) continue;
      const base = VALUE[sq.type];
      if (sq.color === "w") score += base + PST[sq.type][r * 8 + c];
      else score -= base + PST[sq.type][(7 - r) * 8 + c];
    }
  }
  return game.turn() === "w" ? score : -score;
}

function orderMoves(moves: Move[]): Move[] {
  const scored = moves.map((m) => {
    let s = 0;
    if (m.captured) s += 10 * VALUE[m.captured] - VALUE[m.piece];
    if (m.promotion) s += VALUE[m.promotion];
    if (m.san.endsWith("+") || m.san.endsWith("#")) s += 50;
    return { m, s };
  });
  scored.sort((a, b) => b.s - a.s);
  return scored.map((x) => x.m);
}

type Ctx = { deadline: number; nodes: number };

function quiesce(game: Chess, alpha: number, beta: number, ctx: Ctx, depth: number): number {
  if ((++ctx.nodes & 1023) === 0 && Date.now() > ctx.deadline) throw new Timeout();
  const stand = evaluate(game);
  if (depth === 0) return stand;
  if (stand >= beta) return beta;
  if (stand > alpha) alpha = stand;

  const captures = orderMoves(game.moves({ verbose: true }).filter((m) => m.captured));
  for (const m of captures) {
    game.move(m);
    const score = -quiesce(game, -beta, -alpha, ctx, depth - 1);
    game.undo();
    if (score >= beta) return beta;
    if (score > alpha) alpha = score;
  }
  return alpha;
}

function negamax(
  game: Chess,
  depth: number,
  alpha: number,
  beta: number,
  ply: number,
  ctx: Ctx,
): number {
  if ((++ctx.nodes & 1023) === 0 && Date.now() > ctx.deadline) throw new Timeout();
  if (depth === 0) return quiesce(game, alpha, beta, ctx, 3);

  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return game.inCheck() ? -MATE + ply : 0;

  let best = -Infinity;
  for (const m of orderMoves(moves)) {
    game.move(m);
    const score = -negamax(game, depth - 1, -beta, -alpha, ply + 1, ctx);
    game.undo();
    if (score > best) best = score;
    if (score > alpha) alpha = score;
    if (alpha >= beta) break;
  }
  return best;
}

export type BotMove = { from: string; to: string; promotion?: string };

export type SearchOptions = {
  maxDepth: number;
  timeMs: number;
  /** 0 = always the best move; higher values sometimes pick a near-best move */
  randomness: number;
};

export function findBestMove(fen: string, opts: SearchOptions): BotMove | null {
  const game = new Chess(fen);
  const rootMoves = orderMoves(game.moves({ verbose: true }));
  if (rootMoves.length === 0) return null;

  const ctx: Ctx = { deadline: Date.now() + opts.timeMs, nodes: 0 };
  let scored: { move: Move; score: number }[] = rootMoves.map((m) => ({ move: m, score: 0 }));

  // Iterative deepening: keep the result of the last depth that finished in time
  for (let depth = 1; depth <= opts.maxDepth; depth++) {
    try {
      const result: { move: Move; score: number }[] = [];
      let alpha = -Infinity;
      for (const { move } of scored) {
        game.move(move);
        // full window for every root move so each gets an exact score (needed for randomness)
        const score = -negamax(game, depth - 1, -Infinity, Infinity, 1, ctx);
        game.undo();
        result.push({ move, score });
        if (score > alpha) alpha = score;
      }
      result.sort((a, b) => b.score - a.score);
      scored = result;
    } catch (e) {
      if (e instanceof Timeout) break;
      throw e;
    }
  }

  let pick = scored[0];
  if (opts.randomness > 0 && scored.length > 1) {
    // Choose among moves within a margin of the best (never throws away a forced mate)
    const margin = opts.randomness * 150;
    if (Math.abs(scored[0].score) < MATE / 2) {
      const candidates = scored.filter((s) => scored[0].score - s.score <= margin);
      pick = candidates[Math.floor(Math.random() * candidates.length)];
    }
  }
  return { from: pick.move.from, to: pick.move.to, promotion: pick.move.promotion };
}

export const LEVELS = [
  { id: "easy", label: "Easy", maxDepth: 2, timeMs: 500, randomness: 2 },
  { id: "medium", label: "Medium", maxDepth: 3, timeMs: 1200, randomness: 0.6 },
  { id: "hard", label: "Hard", maxDepth: 4, timeMs: 2500, randomness: 0 },
] as const;

export type Level = (typeof LEVELS)[number];
