import React from "react";
import { motion } from "framer-motion";

const ScrollingText = ({ text = "Every Step Forward Is A Victory", duration = 12, repeatCount = Infinity }) => {
  return (
    <div className="relative w-full overflow-hidden p-12 bg-white">
      <div className="flex">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "0%" }}
            animate={{ x: "-100%" }}
            transition={{
              duration,
              repeat: repeatCount,
              ease: "linear",
              delay: -duration * (i / 4),
            }}
            className="flex-shrink-0 whitespace-nowrap"
          >
            <span
              className="text-6xl lg:text-7xl font-bold tracking-wider text-black inline-block mr-16"
            >
              {text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingText;
