"use client";

import { Chess, type Square } from "chess.js";
import { FlipVertical2, RotateCcw, Undo2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { LEVELS, type Level } from "@/lib/chess/engine";

type Color = "w" | "b";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
// Filled glyphs for both colours (colour comes from CSS). U+FE0E forces text, not emoji, rendering.
const GLYPH: Record<string, string> = {
  k: "♚︎",
  q: "♛︎",
  r: "♜︎",
  b: "♝︎",
  n: "♞︎",
  p: "♟︎",
};
const NAME: Record<string, string> = {
  k: "king",
  q: "queen",
  r: "rook",
  b: "bishop",
  n: "knight",
  p: "pawn",
};

type MoveInput = { from: string; to: string; promotion?: string };

function buildGame(moves: MoveInput[]) {
  const g = new Chess();
  for (const m of moves) g.move(m);
  return g;
}

export function ChessGame() {
  const worker = useRef<Worker | null>(null);
  const requestId = useRef(0);

  // The whole game is just the list of moves played; everything else is derived.
  const [moves, setMoves] = useState<MoveInput[]>([]);
  const [playerColor, setPlayerColor] = useState<Color>("w");
  const [level, setLevel] = useState<Level>(LEVELS[1]);
  const [selected, setSelected] = useState<Square | null>(null);
  const [workerFailed, setWorkerFailed] = useState(false);

  const chess = useMemo(() => buildGame(moves), [moves]);
  const fen = chess.fen();
  const turn = chess.turn();
  const gameOver = chess.isGameOver();
  const botTurn = !gameOver && turn !== playerColor && !workerFailed;
  const thinking = botTurn;
  const myTurn = turn === playerColor && !gameOver;
  const lastMove = moves.length > 0 ? moves[moves.length - 1] : null;

  // Start the engine worker once
  useEffect(() => {
    try {
      const w = new Worker(new URL("../../lib/chess/engine.worker.ts", import.meta.url), {
        type: "module",
      });
      worker.current = w;
      return () => {
        w.terminate();
        worker.current = null;
      };
    } catch {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWorkerFailed(true);
    }
  }, []);

  // Ask the bot whenever it is its turn. Cleanup invalidates the request, so a new game,
  // an undo or a level change simply discards the old answer.
  useEffect(() => {
    const w = worker.current;
    if (!botTurn || !w) return;
    const id = ++requestId.current;
    const onMessage = (
      e: MessageEvent<{ id: number; move: MoveInput | null }>,
    ) => {
      if (e.data.id !== id || !e.data.move) return;
      setMoves((m) => [...m, e.data.move as MoveInput]);
    };
    w.addEventListener("message", onMessage);
    const timer = window.setTimeout(() => {
      w.postMessage({
        id,
        fen,
        options: {
          maxDepth: level.maxDepth,
          timeMs: level.timeMs,
          randomness: level.randomness,
        },
      });
    }, 250); // short pause so the bot's reply does not feel instant
    return () => {
      window.clearTimeout(timer);
      w.removeEventListener("message", onMessage);
    };
  }, [botTurn, fen, level]);

  const legalTargets = useMemo(() => {
    if (!selected) return new Set<string>();
    return new Set(chess.moves({ square: selected, verbose: true }).map((m) => m.to));
  }, [selected, chess]);

  const onSquare = (sq: Square) => {
    if (!myTurn) return;
    if (selected && legalTargets.has(sq)) {
      // promotion is always to a queen to keep the UI simple
      setMoves((m) => [...m, { from: selected, to: sq, promotion: "q" }]);
      setSelected(null);
      return;
    }
    const piece = chess.get(sq);
    setSelected(piece && piece.color === playerColor ? sq : null);
  };

  const newGame = (color: Color) => {
    setMoves([]);
    setPlayerColor(color);
    setSelected(null);
  };

  // Take back the bot's reply and the player's move
  const minMoves = playerColor === "b" ? 1 : 0; // keep the bot's opening move when playing Black
  const undo = () => {
    if (thinking) return;
    setMoves((m) => m.slice(0, Math.max(minMoves, m.length - (turn === playerColor ? 2 : 1))));
    setSelected(null);
  };
  const canUndo = !thinking && moves.length > minMoves;

  // Status line
  let status = "Your move";
  if (chess.isCheckmate()) status = turn === playerColor ? "Checkmate. The bot wins." : "Checkmate. You win!";
  else if (chess.isStalemate()) status = "Draw by stalemate.";
  else if (chess.isThreefoldRepetition()) status = "Draw by repetition.";
  else if (chess.isInsufficientMaterial()) status = "Draw: not enough material.";
  else if (chess.isDraw()) status = "Draw.";
  else if (thinking) status = "Bot is thinking…";
  else if (chess.inCheck()) status = "Check! Your move";

  // Board orientation: player's colour at the bottom
  const ranks = playerColor === "w" ? [8, 7, 6, 5, 4, 3, 2, 1] : [1, 2, 3, 4, 5, 6, 7, 8];
  const files = playerColor === "w" ? FILES : [...FILES].reverse();
  const kingInCheck = chess.inCheck()
    ? chess.board().flat().find((p) => p?.type === "k" && p.color === turn)?.square
    : undefined;

  const history = chess.history();
  const movePairs: string[][] = [];
  for (let i = 0; i < history.length; i += 2) movePairs.push(history.slice(i, i + 2));

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,34rem)_1fr] lg:gap-12">
      <div>
        <div
          role="group"
          aria-label="Chess board"
          className="grid aspect-square w-full grid-cols-8 overflow-hidden rounded-2xl border border-border shadow-2xl shadow-[#7c3aed]/10"
        >
          {ranks.flatMap((rank) =>
            files.map((file) => {
              const sq = `${file}${rank}` as Square;
              const piece = chess.get(sq);
              const dark = (FILES.indexOf(file) + rank) % 2 === 1;
              const isSelected = selected === sq;
              const isTarget = legalTargets.has(sq);
              const isLast = lastMove?.from === sq || lastMove?.to === sq;
              const isCheck = kingInCheck === sq;
              return (
                <button
                  key={sq}
                  type="button"
                  onClick={() => onSquare(sq)}
                  aria-label={`${sq}${piece ? `, ${piece.color === "w" ? "white" : "black"} ${NAME[piece.type]}` : ", empty"}${isTarget ? ", legal move" : ""}`}
                  aria-pressed={isSelected}
                  className="relative flex aspect-square items-center justify-center text-[clamp(1.6rem,7vw,3rem)] leading-none outline-offset-[-3px]"
                  style={{
                    background: isCheck
                      ? "color-mix(in srgb, #ef4444 55%, var(--surface))"
                      : isSelected
                        ? "color-mix(in srgb, var(--accent) 55%, var(--surface))"
                        : isLast
                          ? "color-mix(in srgb, var(--accent) 38%, var(--surface))"
                          : dark
                            ? "color-mix(in srgb, var(--accent) 38%, var(--surface))"
                            : "color-mix(in srgb, var(--accent) 14%, var(--surface))",
                  }}
                >
                  {piece && (
                    <span
                      aria-hidden="true"
                      style={
                        piece.color === "w"
                          ? { color: "#ffffff", textShadow: "0 0 2px #000, 0 0 2px #000, 0 1px 3px rgba(0,0,0,.6)" }
                          : { color: "#0d0810", textShadow: "0 0 1.5px #fff, 0 0 1.5px #fff, 0 0 4px rgba(255,255,255,.45)" }
                      }
                    >
                      {GLYPH[piece.type]}
                    </span>
                  )}
                  {isTarget && (
                    <span
                      aria-hidden="true"
                      className={`absolute rounded-full bg-accent/70 ${piece ? "inset-1 bg-transparent ring-4 ring-accent/70" : "size-1/4"}`}
                    />
                  )}
                  {file === files[0] && (
                    <span aria-hidden="true" className="absolute left-0.5 top-0.5 text-[10px] font-medium text-muted">
                      {rank}
                    </span>
                  )}
                  {rank === ranks[7] && (
                    <span aria-hidden="true" className="absolute bottom-0 right-1 text-[10px] font-medium text-muted">
                      {file}
                    </span>
                  )}
                </button>
              );
            }),
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <p
          role="status"
          aria-live="polite"
          className="rounded-2xl border border-border bg-surface/80 px-5 py-4 text-lg font-medium"
        >
          {status}
        </p>

        {workerFailed && (
          <p className="rounded-xl border border-border px-4 py-3 text-sm text-muted">
            The chess engine could not start in this browser.
          </p>
        )}

        <fieldset>
          <legend className="text-xs font-medium uppercase tracking-[0.2em] text-muted">Level</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {LEVELS.map((l) => (
              <button
                key={l.id}
                type="button"
                aria-pressed={level.id === l.id}
                onClick={() => setLevel(l)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                  level.id === l.id
                    ? "border-transparent bg-accent text-accent-foreground"
                    : "border-border hover:border-accent hover:text-accent"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">The level applies to the bot&apos;s next move.</p>
        </fieldset>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => newGame(playerColor)}
            className="bg-brand inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-[filter] hover:brightness-110"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            New game
          </button>
          <button
            type="button"
            onClick={() => newGame(playerColor === "w" ? "b" : "w")}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            <FlipVertical2 className="size-4" aria-hidden="true" />
            Play as {playerColor === "w" ? "Black" : "White"}
          </button>
          <button
            type="button"
            onClick={undo}
            disabled={!canUndo}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium transition-colors hover:border-accent hover:text-accent disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground"
          >
            <Undo2 className="size-4" aria-hidden="true" />
            Undo
          </button>
        </div>

        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted">Moves</h2>
          {movePairs.length === 0 ? (
            <p className="mt-3 text-sm text-muted">No moves yet. You play {playerColor === "w" ? "White" : "Black"}.</p>
          ) : (
            <ol className="mt-3 grid max-h-56 grid-cols-[auto_1fr_1fr] gap-x-4 gap-y-1 overflow-y-auto font-mono text-sm" data-lenis-prevent>
              {movePairs.map((pair, i) => (
                <li key={i} className="contents">
                  <span className="text-muted">{i + 1}.</span>
                  <span>{pair[0]}</span>
                  <span>{pair[1] ?? ""}</span>
                </li>
              ))}
            </ol>
          )}
        </div>

        <p className="text-xs text-muted">
          Pawns promote to a queen. The engine is a small alpha-beta search running in your browser.
        </p>
      </div>
    </div>
  );
}
