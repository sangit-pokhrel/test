import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
const Potential = () => {
  const appImage = useRef(null);
  const { scrollYProgress } = useScroll({
    target: appImage,
    offset: ["start end", "end end"],
    deceleration: 0.9,
    smooth: true,
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [11, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  return (
    <div className="bg-black text-white bg-gradient-to-b from-[#0D0D0D] via-[#2B0A51] to-[#9c76d6] py-[72px] sm:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-5xl sm:text-6xl font-bold tracking-tighter">
          Unlock Your Potential
        </h2>
        <div className="max-w-xl mx-auto">
          <p className="text-xl text-center text-white/70 mt-5">
            With the right equipment, greatness is within reach. See our top
            choice
          </p>
        </div>
        <motion.div
          style={{
            opacity: opacity,
            rotateX: rotateX,
            transformPerspective: "800px",
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/media/potential.png`}
            alt="Potential"
            className="mt-14 mx-auto rounded-lg shadow-lg max-w-full"
            ref={appImage}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Potential;