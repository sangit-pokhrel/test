import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  // FaGithub,
  FaFacebook,
  FaLinkedin,
  // FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    {
      icon: <FaInstagram size={20} />,
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: <FaFacebook size={20} />,
      href: "https://facebook.com",
      label: "Facebook",
    },
    {
      icon: <FaLinkedin size={20} />,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
  ];

  const contactInfo = [
    {
      icon: <FaPhone size={20} />,
      text: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: <FaEnvelope size={20} />,
      text: "contact@vitafit.com",
      href: "mailto:contact@vitafit.com",
    },
    {
      icon: <FaMapMarkerAlt size={20} />,
      text: "123 Fitness Street, Gym City, GC 12345",
      href: "https://maps.google.com",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
            >
              Vita Fit
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-sm max-w-md"
            >
              Your ultimate destination for fitness, nutrition, and the best
              workout plans
            </motion.p>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <span className="text-purple-400">{item.icon}</span>
                  <span className="text-sm">{item.text}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Social Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="bg-gray-800 p-2 rounded-full hover:bg-purple-500 transition-colors duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400"
        >
          © 2024 Vita Fit. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

// import React from "react";
// import Content from "./Content";

// export default function Footer() {
//   return (
//     <div
//       className="relative h-[500px]"
//       style={{
//         clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
//         // minHeight: "100vh", // Ensure the footer spans full height
//       }}
//     >
//       <div className="relative h-[calc(100vh+500px)] -top-[100vh]">
//         <div className="h-[500px] sticky top-[calc(100vh-500px)]">
//           <Content />
//         </div>
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import Content from "./Content";

// export default function Footer() {
//   return (
//     <div
//       className="relative"
//       style={{
//         clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
//         minHeight: "100vh", // Ensure the footer spans full height
//       }}
//     >
//       {/* Content Wrapper */}
//       <div className="relative" style={{ height: "calc(100vh + 200px)" }}>
//         {/* Sticky Footer Content */}
//         <div className="sticky top-[calc(100vh - 200px)] h-[200px]">
//           <Content />
//         </div>
//       </div>
//     </div>
//   );
// }
