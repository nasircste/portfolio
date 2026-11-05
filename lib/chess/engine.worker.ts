import { findBestMove, type SearchOptions } from "./engine";

type Request = { id: number; fen: string; options: SearchOptions };

// Runs the search off the main thread so the page stays responsive while the bot thinks.
self.onmessage = (e: MessageEvent<Request>) => {
  const { id, fen, options } = e.data;
  let move = null;
  try {
    move = findBestMove(fen, options);
  } catch {
    move = null;
  }
  self.postMessage({ id, move });
};
