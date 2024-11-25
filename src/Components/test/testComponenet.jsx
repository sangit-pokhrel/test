// import "./style.css";
import { useState } from "react";
import { motion } from "framer-motion";

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="menu"
    >
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 }
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
        >
          <svg width="15" height="15" viewBox="0 0 20 20">
            <path d="M0 7 L 20 7 L 10 16" />
          </svg>
        </motion.div>
      </motion.button>
      <motion.ul
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05
            }
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3
            }
          }
        }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <motion.li variants={itemVariants}>Item 1 </motion.li>
        <motion.li variants={itemVariants}>Item 2 </motion.li>
        <motion.li variants={itemVariants}>Item 3 </motion.li>
        <motion.li variants={itemVariants}>Item 4 </motion.li>
        <motion.li variants={itemVariants}>Item 5 </motion.li>
      </motion.ul>
    </motion.nav>
  );
}


// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";

// const TestComponenet = () => {
//   // Use refs to directly access DOM elements
//   const containerRef = useRef(null); // Create a ref for the container

//   useEffect(() => {
//     const handleMouseMove = (dets) => {
//       gsap.to(".cursor", {
//         left: dets.x,
//         top: dets.y,
//         duration: 0.2, // Add duration for smooth animation
//         ease: "power2.out", // Optional easing
//       });
//     };

//     document.addEventListener("mousemove", handleMouseMove);

//     // Cleanup the event listener when the component unmounts
//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   useEffect(() => {
//     // Define mouse enter handler
//     const handleMouseEnter = () => {
//       gsap.to(".cursor", {
//         transform: "translate(-50%, -50%) scale(1)",
//       });
//     };

//     // Define mouse leave handler
//     const handleMouseLeave = () => {
//       gsap.to(".cursor", {
//         transform: "translate(-50%, -50%) scale(0)",
//       });
//     };

//     // Select the child element
//     const childElement = document.querySelector("#child1"); // Use correct selector

//     // Add event listeners
//     childElement?.addEventListener("mouseenter", handleMouseEnter);
//     childElement?.removeEventListener("mouseenter", handleMouseEnter);

//     // Cleanup event listeners when component unmounts
//   }, []);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // GSAP animation on all h1 elements inside the container
//       gsap.from(".page1 h1", {
//         y: 100,
//         // opacity: 0,
//         // delay: 0.2,
//         duration: 0.7,
//         stagger: 0.2,
//       });
//     }, containerRef); // Make sure it is scoped to the container

//     return () => ctx.revert(); // Cleanup on unmount
//   }, []);

//   return (
//     <>
//       <div className="cursor w-[150px] h-[150px] bg-[blanchedalmond] fixed rounded-full z-20 transform translate-x-[-50%] translate-y-[-50%] scale-0"></div>
//       <div className="main pt-[10rem] relative flex" ref={containerRef}>
//         <div className="page1">
//           <h1>change</h1>
//           <h1>the world</h1>
//         </div>
//       </div>
//       <div className="page3 min-h-[120vh] w-full bg-[#F7F7F7] flex items-center justify-evenly flex-wrap">
//         <div
//           className="child flex relative border border-black items-center h-[55vh] w-[50vw] justify-center m-10"
//           id="child1"
//         >
//           <div className="about-left shadow-xl p-[2em] rounded max-w-[40rem] flex-grow ">
//             <h2 className="text-[#ff6b6b] font-bold text-[1.8rem]">About Us</h2>
//             <p className="text-[1.1rem] text-[#555] mt-4">
//               Welcome to <strong className="text-[#ff6b6b]">VitaFit</strong>,
//               where we believe in empowering every individual to reach their
//               full fitness potential. Our platform is designed to provide you
//               with everything you need to lead a healthier, stronger, and more
//               balanced life.
//             </p>
//             <p className="text-[1.1rem] text-[#555] mt-4">
//               Whether you’re just beginning your fitness journey or looking to
//               take your performance to the next level, we offer:
//             </p>
//           </div>
//         </div>
//         <div
//           className="child flex relative border border-black items-center h-[55vh] w-[35vw] justify-center m-10 "
//           id="child2"
//         >
//           <img
//             className="h-full"
//             src="https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-6/461980498_8562887160431059_9080859293098155404_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=UEgBTk1KNsAQ7kNvgHSBTDV&_nc_ht=scontent.fktm3-1.fna&_nc_gid=ATY8ODLZ7NYn1hwT-eD2ovX&oh=00_AYDPFpg4G_yCuKKYKakg8LJiTroI3n00ut9626rTqdGklw&oe=67069055"
//             alt=""
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default TestComponenet;
