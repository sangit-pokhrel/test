import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const Responsive = ({ open }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-20 left-0 w-full h-screen"
          >
            <div className="text-xl font-semibold uppercase bg-white text-black py-10 px-20 rounded-lg">
              <ul className="flex flex-col gap-10">
                <li>
                  <a href="/" className="text-black">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-black">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-black">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Responsive;
