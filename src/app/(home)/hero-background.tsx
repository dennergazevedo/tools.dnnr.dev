"use client";

import { motion } from "framer-motion";

const TOKENS = [
  { symbol: "{}", top: "8%", left: "4%", opacity: 0.07, size: "text-lg", duration: 22, xRange: 20, yRange: 14, delay: 0 },
  { symbol: "</>", top: "18%", left: "91%", opacity: 0.06, size: "text-xl", duration: 28, xRange: 12, yRange: 18, delay: 1.5 },
  { symbol: "=>", top: "72%", left: "7%", opacity: 0.05, size: "text-base", duration: 20, xRange: 16, yRange: 22, delay: 3 },
  { symbol: "[]", top: "85%", left: "85%", opacity: 0.06, size: "text-lg", duration: 24, xRange: 14, yRange: 12, delay: 0.8 },
  { symbol: "//", top: "35%", left: "2%", opacity: 0.05, size: "text-sm", duration: 26, xRange: 10, yRange: 20, delay: 2 },
  { symbol: "const", top: "55%", left: "94%", opacity: 0.04, size: "text-sm", duration: 30, xRange: 8, yRange: 16, delay: 4 },
  { symbol: "===", top: "92%", left: "40%", opacity: 0.05, size: "text-base", duration: 18, xRange: 22, yRange: 10, delay: 1 },
  { symbol: "&&", top: "12%", left: "48%", opacity: 0.04, size: "text-base", duration: 32, xRange: 18, yRange: 24, delay: 5 },
  { symbol: "fn()", top: "65%", left: "1%", opacity: 0.06, size: "text-sm", duration: 23, xRange: 14, yRange: 18, delay: 2.5 },
  { symbol: ">_", top: "25%", left: "79%", opacity: 0.07, size: "text-2xl", duration: 19, xRange: 16, yRange: 12, delay: 0.5 },
  { symbol: "01", top: "80%", left: "55%", opacity: 0.04, size: "text-xs", duration: 27, xRange: 20, yRange: 8, delay: 3.5 },
  { symbol: "??", top: "48%", left: "96%", opacity: 0.05, size: "text-base", duration: 21, xRange: 10, yRange: 20, delay: 1.2 },
  { symbol: "::", top: "5%", left: "70%", opacity: 0.04, size: "text-sm", duration: 29, xRange: 12, yRange: 16, delay: 6 },
  { symbol: "async", top: "95%", left: "15%", opacity: 0.04, size: "text-xs", duration: 25, xRange: 16, yRange: 10, delay: 4.5 },
  { symbol: "return", top: "42%", left: "0%", opacity: 0.04, size: "text-xs", duration: 34, xRange: 8, yRange: 22, delay: 7 },
  { symbol: "()", top: "75%", left: "72%", opacity: 0.06, size: "text-lg", duration: 17, xRange: 18, yRange: 14, delay: 2.2 },
  { symbol: "!==", top: "30%", left: "60%", opacity: 0.04, size: "text-sm", duration: 31, xRange: 14, yRange: 18, delay: 8 },
  { symbol: "||", top: "60%", left: "45%", opacity: 0.03, size: "text-base", duration: 36, xRange: 10, yRange: 12, delay: 9 },
];

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {TOKENS.map((token, i) => (
        <motion.span
          key={i}
          className={`absolute font-mono ${token.size} text-amber-400`}
          style={{
            top: token.top,
            left: token.left,
            opacity: token.opacity,
          }}
          animate={{
            x: [0, token.xRange, -token.xRange / 2, token.xRange / 3, 0],
            y: [0, -token.yRange, token.yRange / 2, -token.yRange / 4, 0],
          }}
          transition={{
            duration: token.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: token.delay,
          }}
        >
          {token.symbol}
        </motion.span>
      ))}
    </div>
  );
}
