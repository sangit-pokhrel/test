import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    const marker = document.getElementById("top-marker");
    if (marker) {
      observer.observe(marker);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Refined animation variants with adjusted timing
  const buttonVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.23, 1, 0.32, 1], // Custom easing curve
        opacity: { duration: 0.2 },
        scale: {
          type: "spring",
          stiffness: 380,
          damping: 25,
        },
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
        mass: 1,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: "easeIn",
      },
    },
  };

  // Refined floating animation for the arrow
  const floatingArrowVariants = {
    animate: {
      y: [0, -3, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        times: [0, 0.5, 1],
      },
    },
  };

  return (
    <>
      <div id="top-marker" className="absolute top-0 h-1 w-full" />

      <AnimatePresence>
        {visible && (
          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            whileTap="tap"
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-gradient-to-tr from-purple-600 to-blue-500 
                       hover:from-purple-700 hover:to-blue-600
                       text-white rounded-full shadow-lg cursor-pointer 
                       flex items-center justify-center z-50 
                       transition-colors duration-200 group"
            aria-label="Scroll to top"
          >
            <motion.div
              variants={floatingArrowVariants}
              animate="animate"
              className="flex items-center justify-center"
            >
              <ArrowUp className="w-6 h-6 stroke-2" />
            </motion.div>

            <span
              className="absolute -top-10 left-1/2 -translate-x-1/2 
                           bg-gray-800 text-white px-2 py-1 rounded text-sm
                           opacity-0 group-hover:opacity-100 
                           transition-opacity duration-200 ease-in-out
                           whitespace-nowrap"
            >
              Back to top
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollToTop;
