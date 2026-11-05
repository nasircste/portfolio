import type { CSSProperties } from "react";

type SplitTextProps = {
  text: string;
  /** Extra delay (ms) before the first character animates */
  delay?: number;
};

// Splits text into per-character spans that slide up once the loader finishes.
// Words stay unbroken; the full text is exposed to screen readers via aria-label.
export function SplitText({ text, delay = 0 }: SplitTextProps) {
  let index = 0;
  return (
    <span aria-label={text} className="inline-block">
      {text.split(" ").map((word, w) => (
        <span key={w} aria-hidden="true" className="inline-block whitespace-nowrap">
          {Array.from(word).map((ch) => {
            const i = index++;
            return (
              <span key={i} className="char-wrap">
                <span
                  className="char"
                  style={{ "--i": i, "--delay": `${delay}ms` } as CSSProperties}
                >
                  {ch}
                </span>
              </span>
            );
          })}
          {w < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
