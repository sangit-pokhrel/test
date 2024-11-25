import React, { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

const Service = ({ title, description, icon }) => {
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const maskImage = useMotionTemplate`
    radial-gradient(100px 100px at ${offsetX}px ${offsetY}px, black, transparent)`;

  const border = useRef(null); // Ref for the border element

  useEffect(() => {
    const updateMousePosition = (e) => {
      if (!border.current) return; // Ensure the element exists
      const borderRect = border.current.getBoundingClientRect();
      offsetX.set(e.clientX - borderRect.x); // Mouse X position relative to element
      offsetY.set(e.clientY - borderRect.y); // Mouse Y position relative to element
    };

    window.addEventListener("mousemove", updateMousePosition);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [offsetX, offsetY]);

  return (
    <div className="border border-white/30 px-5 py-10 text-center rounded-xl sm:flex-1 relative">
      <motion.div
        className="absolute inset-0 border-2 border-purple-400 rounded-xl"
        style={{
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
        }}
        ref={border} // Attach the ref here
      ></motion.div>
      <div className="inline-flex h-14 w-14 bg-white text-black justify-center items-center rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="mt-6 font-bold">{title}</h3>
        <p className="mt-2 text-white/70">{description}</p>
      </div>
    </div>
  );
};

export default Service;