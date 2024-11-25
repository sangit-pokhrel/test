import React from "react";
import { FaCogs, FaHandsHelping, FaCoffee } from "react-icons/fa"; // Example icons
import Service from "./Service";

const Services = () => {
  const services = [
    {
      title: "Tailored Workout Plans",
      description:
        " Our expertly designed workout plans cater to all fitness levels from complete beginners to seasoned athletes. With a widerange of programs targeting different goals like strength,endurance, or weight loss, you can choose a plan that fits yourspecific needs and schedule.",
      icon: <FaCogs size="3rem" />,
    },
    {
      title: "Our Mission: Building a Lifestyle of Fitness and Wellness",
      description:
        "At VitaFit, our mission is to make fitness a sustainable lifestyle, not just a temporary goal. Our goal is to help you develop a long-term commitment to health and wellness, providing you with the tools, resources, and support you need to achieve your fitness goals and maintain them over time.",
      icon: <FaHandsHelping size="3rem" />,
    },
    {
      title: "Nutrition Guidance",
      description:
        "We provide personalized meal plans that align with your workout goals. Whether you're aiming for muscle gain, fat loss, or overall wellness, we'll help you achieve your goals through a balanced and nutritious diet.",
      icon: <FaCoffee size="3rem" />,
    },
  ];

  return (
    <div className="bg-black text-white py-[72px] sm:py-24" name="services" >
      <div className="container">
        <h2 className="text-center font-bold text-5xl sm:text-6xl tracking-tighter">
          Everything You Need to Achieve Your Fitness Goals
        </h2>
        <div className="max-w-xl mx-auto">
          <p className="text-center mt-5 text-white/70">
            At VitaFit, we're committed to helping you achieve your fitness
            goals and live a healthier, more active lifestyle. Our services
            include:
          </p>
        </div>
        <div className="mt-16 flex flex-col sm:flex-row gap-4">
          {services.map((service, index) => (
            <Service
              title={service.title}
              description={service.description}
              icon={service.icon}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;