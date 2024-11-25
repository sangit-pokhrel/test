import { FaPlus, FaMinus } from "react-icons/fa"; // Import both icons
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Faqs = () => {
  const items = [
    {
      question: "What is the best equipment for beginners?",
      answer:
        "For beginners, we recommend starting with versatile equipment like resistance bands, dumbbells, and kettlebells. These tools help build strength, flexibility, and endurance without overwhelming you.",
    },
    {
      question: "Do you offer personalized workout plans?",
      answer:
        "Yes! We offer customized workout plans based on your fitness level and goals. Our team of experts will help you create a plan tailored to your needs, whether you're looking to build muscle, lose weight, or improve overall fitness.",
    },
    {
      question: "What should I focus on first: cardio or strength training?",
      answer:
        "It depends on your goals. If you're aiming to lose weight, cardio can help burn calories, but strength training builds muscle and boosts metabolism. A balanced mix of both is often the best approach.",
    },
    {
      question: "Can I access your fitness hub on my mobile device?",
      answer:
        "Absolutely! Our platform is fully responsive, so you can access workout plans, track progress, and browse products easily on your smartphone or tablet.",
    },
    {
      question: "What if I need help with choosing the right equipment?",
      answer:
        "Our team is here to assist you! You can reach out to our support team for personalized recommendations on the best equipment for your specific fitness goals.",
    },
  ];
  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const AccordionItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="py-7 border-b border-white/30">
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleAccordion}
        >
          <span className="flex-1 text-lg font-bold">{question}</span>
          {isOpen ? <FaMinus /> : <FaPlus />}{" "}
          {/* Toggle between plus and minus */}
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: "16px" }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
            >
              {answer}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="bg-black text-white bg-gradient-to-b from-[#9c76d6] to-black py-[72px]" name="faqs">
      <div className="container">
        <h2 className="text-center text-5xl font-bold tracking-tighter">
          Frequently Asked Questions
        </h2>
        <motion.div className="mt-12">
          {items.map(({ question, answer }, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0 }}
              variants={featureVariants}
            >
              <AccordionItem key={index} question={question} answer={answer} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Faqs;
