import React, { useEffect, useRef } from "react";
import "./style.css";
import gsap from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";
import transition from "../../transition";
import { FaHistory, FaTrophy, FaHandshake } from "react-icons/fa";
import ScrollingText from "./Proverb";

const JourneyComponent = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".journey h1", {
        y: 100,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const { scrollYProgress } = useScroll({});

  // useMotionValueEvent(scrollYProgress, "change", (val) => {
  //   console.log(val);
  // });

  // Control scale and opacity for the Services section
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const headings = ["Our", "Journey to", "Greatness Starts", "Now."];
  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <div>
        {/* Sticky Hero Section */}
        <motion.div
          ref={containerRef}
          className="journey font-montserrat sticky top-0 h-screen  "
        >
          {/* Text */}
          {headings.map((text, index) => (
            <h1
              key={index}
              className="text-white font-bold tracking-tight leading-snug text-[2.2em] sm:text-[3.5em] md:text-[4.5em] lg:text-[5.5em] h-[8vh] sm:h-[10vh] md:h-[12vh] lg:h-[15vh] ml-[.2em] sm:ml-[.5em] md:ml-[.8em]"
            >
              {text}
            </h1>
          ))}
        </motion.div>
        <motion.div
          className="max-w-7xl mx-auto flex flex-col lg:flex-row bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden min-h-[100vh] lg:h-screen"
          style={{ scale }}
        >
          {/* Left Side: Text Section */}
          <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B2CBF] to-[#C77DFF] font-bold text-lg sm:text-xl tracking-wider">
                ABOUT US
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mt-2 mb-6">
                Building Strength,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD]">
                  Creating Legends
                </span>
              </h2>
            </motion.div>

            {/* About Us Cards */}
            <div className="space-y-4">
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.3 }}
                className="group flex items-start p-4 sm:p-6 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 hover:from-[#9D4EDD] hover:to-[#8f6ca4] transition-all duration-300 cursor-pointer"
                // whileHover={{ scale: 1.02, translateX: 10 }}
                // whileTap={{ scale: 0.98 }}
              >
                <div className="bg-gradient-to-br from-[#7B2CBF] to-[#C77DFF] p-3 rounded-lg ">
                  <FaHistory className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-white text-lg sm:text-xl">
                    Our Legacy
                  </h3>
                  <p className="text-gray-300 text-sm font-jost sm:text-base mt-1">
                    A decade of transforming lives through innovative fitness
                    solutions.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.3, delay: 0.1 }}
                className="group flex items-start p-4 sm:p-6 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 hover:from-[#9D4EDD] hover:to-[#8f6ca4] transition-all duration-300 cursor-pointer"
                // whileHover={{ scale: 1.02, translateX: 10 }}
                // whileTap={{ scale: 0.98 }}
                name="about"
              >
                <div className="bg-gradient-to-br from-[#7B2CBF] to-[#C77DFF] p-3 rounded-lg ">
                  <FaTrophy className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-white text-lg sm:text-xl">
                    Our Achievement
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base mt-1">
                    Award-winning fitness center with elite training programs.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.3, delay: 0.2 }}
                className="group flex items-start p-4 sm:p-6 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 hover:from-[#9D4EDD] hover:to-[#8f6ca4] transition-all duration-300 cursor-pointer"
                // whileHover={{ scale: 1.02, translateX: 10 }}
                // whileTap={{ scale: 0.98 }}
              >
                <div className="bg-gradient-to-br from-[#7B2CBF] to-[#C77DFF] p-3 rounded-lg ">
                  <FaHandshake className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-white text-lg sm:text-xl">
                    Our Commitment
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base mt-1">
                    Dedicated to your fitness journey with personalized support.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side: Image Section */}
          <motion.div
            className="lg:w-1/2 min-h-[300px] sm:min-h-[400px] lg:min-h-full relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-black/40 mix-blend-multiply z-10" />
            <img
              src="/media/home.jpg"
              alt="Our Gym Facility"
              className="w-full h-full object-cover absolute inset-0 hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent z-20">
              <div className="flex justify-between text-white max-w-sm mx-auto">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9D4EDD] to-[#7B2CBF] ">
                    10+
                  </div>
                  <div className="text-sm text-gray-300">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9D4EDD] to-[#7B2CBF]">
                    5K+
                  </div>
                  <div className="text-sm text-gray-300">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9D4EDD] to-[#7B2CBF]">
                    50+
                  </div>
                  <div className="text-sm text-gray-300">Trainers</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        <ScrollingText duration={10} repeatCount={Infinity} />
        {/**body */}
      </div>
    </>
  );
};

export default transition(JourneyComponent);

// {
//   <div className="container w-full pt-[5em] mx-auto pb-[2em] min-w-full ">
//   {/*bg-[#f4f4f4] */}
//   <motion.div
//     variants={fadeIn(1)} // Fade in with a 0.3s delay
//     initial="hidden"
//     whileInView="show"
//     viewport={{ once: false, amount: 0.5 }}
//     className=" flex-col lg:flex-row about flex  justify-evenly mb-[5rem] gap-x-[1rem] ml-[5rem] mr-[5rem] items-center"
//   >
//     <div className="about-left shadow-xl p-[2em] rounded max-w-[40rem] flex-grow ">
//       <h2 className="text-[#ff6b6b] font-bold text-[1.8rem]">About Us</h2>
//       <p className="text-[1.1rem] text-[#555] mt-4">
//         Welcome to <strong className="text-[#ff6b6b]">VitaFit</strong>,
//         where we believe in empowering every individual to reach their
//         full fitness potential. Our platform is designed to provide you
//         with everything you need to lead a healthier, stronger, and more
//         balanced life.
//       </p>
//       <p className="text-[1.1rem] text-[#555] mt-4">
//         Whether you’re just beginning your fitness journey or looking to
//         take your performance to the next level, we offer:
//       </p>
//     </div>
//     <div className="about-pic w-full lg:w-auto mt-6 lg:mt-0 flex justify-center">
//       <img
//         src="./media/about.jpg"
//         alt=""
//         className=" ml-[5rem] mr-[5rem] flex-grow max-w-[80%] lg:max-w-[25rem] lg:flex-grow-0 max-h-[80%] lg:max-h-[20rem]   "
//       />
//     </div>
//   </motion.div>
//   {
//     // <div className="tailored">
//     //   <div className="t-pic">
//     //     {/* <img src="./media/tailored.jpg" alt=""> */}
//     //   </div>
//     //   <div className="w-r">
//     //     <strong className="text-[#ff6b6b]">
//     //       <h2>Tailored Workout Plans</h2>
//     //     </strong>
//     //     <p className="text-[1.1rem] text-[#555]">
//     //       Our expertly designed workout plans cater to all fitness
//     //       levels—from complete beginners to seasoned athletes. With a wide
//     //       range of programs targeting different goals like strength,
//     //       endurance, or weight loss, you can choose a plan that fits your
//     //       specific needs and schedule.
//     //     </p>
//     //     <p className="text-[1.1rem] text-[#555]">
//     //       Beyond just exercises, we focus on progression. Whether you're
//     //       doing bodyweight workouts at home or using gym equipment, our
//     //       plans evolve with your performance, helping you continuously push
//     //       past your limits and achieve real, lasting results.
//     //     </p>
//     //   </div>
//     // </div>
//     // <div className="nutri">
//     //   <div className="n-l">
//     //     <strong className="text-[#ff6b6b]">
//     //       <h2>Nutritional Guidance</h2>
//     //     </strong>
//     //     <p className="text-[1.1rem] text-[#555]">
//     //       Nutrition is a key part of any fitness journey, and at{" "}
//     //       <strong className="text-[#ff6b6b]">VitaFit</strong>, we’re here to
//     //       guide you through it. Our platform offers personalized meal plans
//     //       that align with your workout goals—whether you're aiming for
//     //       muscle gain, fat loss, or overall wellness. From calorie counts to
//     //       macronutrient breakdowns, every meal plan is crafted to fuel your
//     //       body efficiently while satisfying your taste buds.
//     //     </p>
//     //   </div>
//     //   <div className="n-r">{/* <img src="./media/n-r.jpg" alt=""> */}</div>
//     // </div>
//     // <div className="shop">
//     //   <div className="s-l">{/* <img src="./media/s-l.avif" alt=""> */}</div>
//     //   <div className="s-r">
//     //     <strong className="text-[#ff6b6b]">
//     //       <h2>Shop for Essentials</h2>
//     //     </strong>
//     //     <p className="text-[1.1rem] text-[#555]">
//     //       Your fitness journey is supported by the right gear, and our shop
//     //       is packed with everything you need to succeed. We offer a curated
//     //       selection of high-quality fitness equipment, from dumbbells and
//     //       resistance bands to yoga mats and kettlebells. No matter your
//     //       fitness level or the type of workouts you enjoy, you’ll find the
//     //       tools you need to train effectively at home or in the gym.
//     //     </p>
//     //     <p className="text-[1.1rem] text-[#555]">
//     //       In addition to equipment, we stock top-rated supplements and
//     //       accessories designed to maximize your performance and recovery.
//     //       Explore products that boost your energy, enhance muscle recovery,
//     //       and keep you on track to meet your fitness goals. Our shop is your
//     //       one-stop destination for all things fitness!
//     //     </p>
//     //   </div>
//     // </div>
//     // <div className="mission">
//     //   <div className="m-l">
//     //     <strong className="text-[#ff6b6b]">
//     //       <h2>Our Mission: Building a Lifestyle of Fitness and Wellness</h2>
//     //     </strong>
//     //     <p className="text-[1.1rem] text-[#555]">
//     //       At VitaFit, our mission is to make fitness a sustainable
//     //       lifestyle, not just a temporary goal. We’re here to support you in
//     //       every aspect of your journey—physically, mentally, and
//     //       emotionally—through personalized workout plans, expert nutrition
//     //       advice, and high-quality fitness gear.
//     //     </p>
//     //     <p className="text-[1.1rem] text-[#555]">
//     //       Join our community and transform your approach to fitness.
//     //       Together, we’ll help you unlock your full potential and make
//     //       health and wellness an essential part of your everyday life.
//     //     </p>
//     //   </div>
//     //   <div className="m-pic">
//     //     {/* <img src="./media/mission.avif" alt=""/> */}
//     //   </div>
//     // </div>
//   }
// </div>
// }
