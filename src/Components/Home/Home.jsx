import React, { useEffect, useState } from "react";
import PricingSection from "../Pricing/Pricing";
import Services from "../Services/Services";
import Contact from "../ContactUs/ContactusComponent";
import JourneyComponent from "../Journey/JourneyComponent";
import Test from "./../test3/test";
import Potential from "../Potential/Potential";
import Faqs from "../Faqs/Faqs";
import Preloader from "../Preloader/Preloader";
import { AnimatePresence, motion } from "framer-motion";
import transition from "../../transition";
const fadeIn = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const initScroll = async () => {
      // const LocomotiveScroll = (await import("locomotive-scroll")).default;
      // const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    };
    initScroll();
  }, []);
  useEffect(() => {
    if (!isLoading) {
      // Wait for exit animation duration (0.8s) + delay (0.2s)
      setTimeout(() => {
        setShowContent(true);
      }, 1000); // Matches your slideUp exit duration + delay
    }
  }, [isLoading]);
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      {/* Scroll Container */}
      <motion.div
        id="scroll-container"
        variants={fadeIn}
        initial="initial"
        animate={showContent ? "animate" : "initial"}
        className="w-full"
      >
        <JourneyComponent />
        {/* <Test /> */}
        <Services />
        <Potential />
        <PricingSection />
        <Faqs />
        <Contact />
      </motion.div>
    </>
  );
};

export default transition(Home);
