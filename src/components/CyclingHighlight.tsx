import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

interface CyclingHighlightProps {
  text: string;
  isDarkMode: boolean;
}

export const CyclingHighlight: React.FC<CyclingHighlightProps> = ({ text, isDarkMode }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Cycle index from 0 -> 1 -> 2 -> 0 every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Helper to find indices of keywords in text
  const findKeywordIndices = (textString: string) => {
    const matches: { id: number; start: number; end: number; text: string }[] = [];

    // 1. Find TikTok
    const ttRegex = /tiktok/i;
    const ttMatch = ttRegex.exec(textString);
    if (ttMatch) {
      matches.push({
        id: 0,
        start: ttMatch.index,
        end: ttMatch.index + ttMatch[0].length,
        text: textString.substring(ttMatch.index, ttMatch.index + ttMatch[0].length)
      });
    }

    // 2. Find Instagram
    const igRegex = /instagram/i;
    const igMatch = igRegex.exec(textString);
    if (igMatch) {
      matches.push({
        id: 1,
        start: igMatch.index,
        end: igMatch.index + igMatch[0].length,
        text: textString.substring(igMatch.index, igMatch.index + igMatch[0].length)
      });
    }

    // 3. Find X, Twitter or X Videos
    const xOptions = [/x videos/i, /x (twitter)/i, /x\/twitter/i, /twitter/i, /x/i];
    let xMatch: RegExpExecArray | null = null;
    for (const regex of xOptions) {
      const m = regex.exec(textString);
      if (m) {
        // Prevent overlap with TikTok or Instagram (just in case)
        const isOverlapping = matches.some(prev =>
          (m.index >= prev.start && m.index < prev.end) ||
          (m.index + m[0].length > prev.start && m.index + m[0].length <= prev.end)
        );
        if (!isOverlapping) {
          xMatch = m;
          break;
        }
      }
    }

    if (xMatch) {
      matches.push({
        id: 2,
        start: xMatch.index,
        end: xMatch.index + xMatch[0].length,
        text: textString.substring(xMatch.index, xMatch.index + xMatch[0].length)
      });
    }

    // Sort matches by start position
    matches.sort((a, b) => a.start - b.start);
    return matches;
  };

  const matches = findKeywordIndices(text);

  if (matches.length === 0) {
    return <>{text}</>;
  }

  const result: React.ReactNode[] = [];
  let lastIndex = 0;

  matches.forEach((match, idx) => {
    // Add text preceding the match
    if (match.start > lastIndex) {
      result.push(<span key={`text-pre-${idx}`}>{text.substring(lastIndex, match.start)}</span>);
    }

    const isActive = activeIndex === match.id;

    // Render keyword, optionally underlined with drawing animation
    result.push(
      <span key={`match-${match.id}`} className="relative inline-block px-1 select-none">
        <span className="relative z-10 font-black">{match.text}</span>
        {isActive && (
          <svg
            className="absolute bottom-[-6px] left-0 w-full h-[14px] overflow-visible pointer-events-none"
            viewBox="0 0 100 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* Main brush path with precise loop matching the 4-second cycle */}
            <motion.path
              d="M 2 4 C 18 5.2, 35 3.5, 52 4.5 C 68 5.5, 84 3.2, 98 3.8"
              stroke="#14B8A6"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="150"
              initial={{ strokeDashoffset: 150 }}
              animate={{
                strokeDashoffset: [150, 0, 0, 150]
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                times: [0, 0.15, 0.85, 1], // draw over 0.6s, hold for 2.8s, wipe over 0.6s
                repeat: 0
              }}
            />
            {/* Shadow path offset for hand-drawn marker marker overlap */}
            <motion.path
              d="M 6 5.5 C 22 6.5, 38 4.5, 55 5 C 70 5.5, 82 4.1, 94 4.5"
              stroke="#14B8A6"
              strokeWidth="1.4"
              opacity="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="150"
              initial={{ strokeDashoffset: 150 }}
              animate={{
                strokeDashoffset: [150, 0, 0, 150]
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                times: [0.03, 0.18, 0.82, 0.97],
                repeat: 0
              }}
            />
          </svg>
        )}
      </span>
    );

    lastIndex = match.end;
  });

  // Add trailing text
  if (lastIndex < text.length) {
    result.push(<span key="text-trailing">{text.substring(lastIndex)}</span>);
  }

  return <>{result}</>;
};
