import React from "react";
import { motion } from "motion/react";

interface BrushHighlightProps {
  text: string;
  isDarkMode: boolean;
}

export const BrushHighlight: React.FC<BrushHighlightProps> = ({ text, isDarkMode }) => {
  const highlightKeywords = [
    "TikTok",
    "Instagram",
    "X / Twitter",
    "Twitter",
    "X"
  ];

  const matchedKeyword = highlightKeywords.find(kw => 
    text.toLowerCase().includes(kw.toLowerCase())
  );

  if (!matchedKeyword) {
    return <>{text}</>;
  }

  const index = text.toLowerCase().indexOf(matchedKeyword.toLowerCase());
  const prefix = text.substring(0, index);
  const highlightPart = text.substring(index, index + matchedKeyword.length);
  const suffix = text.substring(index + matchedKeyword.length);

  return (
    <>
      {prefix}
      <span className="relative inline-block px-1 mr-1">
        <span className="relative z-10">{highlightPart}</span>
        <svg
          className="absolute bottom-[-6px] left-0 w-full h-[14px] overflow-visible pointer-events-none"
          viewBox="0 0 100 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Main detailed artistic brush path - hand drawn effect */}
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
              duration: 5,
              ease: "easeInOut",
              times: [0, 0.2, 0.7, 0.9, 1],
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
          {/* Shadow/Secondary brush path - creates standard double-layered marker ink overlap */}
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
              duration: 5,
              ease: "easeInOut",
              times: [0.03, 0.23, 0.67, 0.87, 1], // slightly offset to feel hand-sketched
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        </svg>
      </span>
      {suffix}
    </>
  );
};
