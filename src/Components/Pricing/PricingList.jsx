// import { pricing } from "../../constants/index";
import CheckIcon from "../../assets/svg/Check";
import { motion } from "framer-motion";

const PricingList = () => {
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  const buttonVariants = {
    rest: {
      scale: 1,
      backgroundColor: "rgb(139, 92, 246)", // purple-500
    },
    hover: {
      scale: 1.05,
      backgroundColor: "rgb(124, 58, 237)", // purple-600
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

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
  const pricing = [
    {
      id: "0",
      title: "Basic",
      description: "Start your fitness journey",
      price: "29.99",
      features: [
        "Monthly payment with no long-term contract",
        "Access to basic gym equipment",
        "Standard locker room access",
        "Mobile app for workout tracking",
        "Monthly fitness tips newsletter",
      ],
    },
    {
      id: "1",
      title: "Pro",
      description: "Enhanced fitness experience",
      price: "49.99",
      features: [
        "Monthly plan with 3-month minimum commitment",
        "All Basic features included",
        "Unlimited group fitness classes",
        "Free towel service",
        "Access to sauna and spa",
        "Quarterly fitness assessment",
      ],
    },
    {
      id: "2",
      title: "Elite",
      description: "Ultimate fitness transformation",
      price: "89.99",
      features: [
        "Monthly plan with 10% discount on 12-month commitment",
        "All Pro features included",
        "2 personal training sessions per month",
        "Nutrition consultation",
        "Priority class booking",
        "Free guest passes (2/month)",
        "VIP locker with laundry service",
      ],
    },
  ];

  return (
    <div className="flex gap-[1rem] max-lg:flex-wrap" name="pricing">
      {pricing.map((item, cardIndex) => (
        <motion.div
          key={item.id}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          className="w-[19rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 [&>h4]:first:text-color-2 [&>h4]:even:text-color-1 [&>h4]:last:text-color-3"
        >
          <motion.h4
            className="h4 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {item.title}
          </motion.h4>
          <motion.p
            className="body-2 min-h-[4rem] mb-3 text-n-1/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {item.description}
          </motion.p>
          <motion.div
            className="flex items-center h-[5.5rem] mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            {item.price && (
              <>
                <div className="h3 text-white">$</div>
                <div className="text-[5.5rem] text-white leading-none font-bold">
                  {item.price}
                </div>
              </>
            )}
          </motion.div>
          <motion.button
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className={`w-full px-6 py-4 mb-6 text-base font-semibold rounded-2xl
              ${
                item.price
                  ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg"
                  : "border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
              }
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50`}
            onClick={() =>
              (window.location.href = item.price
                ? "/pricing"
                : "mailto:contact@jsmastery.pro")
            }
          >
            <div className="flex items-center justify-center gap-2">
              {item.price ? (
                <>
                  Get Started
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </motion.svg>
                </>
              ) : (
                "Contact us"
              )}
            </div>
          </motion.button>
          <ul>
            {item.features.map((feature, index) => (
              <motion.li
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                // viewport={{ once: true }}
                viewport={{ once: false, amount: 0.5 }}
                variants={featureVariants}
                className="flex items-start py-5 border-t border-n-6"
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <CheckIcon />
                </motion.div>
                <p className="body-2 text-white ml-4">{feature}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default PricingList;
