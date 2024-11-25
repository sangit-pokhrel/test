import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa";

export default function Content() {
  return (
    <div className="bg-[#4E4E5A] py-8 text-white px-4 sm:px-6 lg:px-12 flex flex-col justify-between h-full">
      <Section1 />
      <Section2 />
    </div>
  );
}

const Section1 = () => {
  return (
    <div>
      <Nav />
    </div>
  );
};

const Section2 = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-center sm:text-left">
      <h1 className="text-[12rem] xs:text-[10rem] sm:text-[8vw] md:text-[6vw] lg:text-[4vw] leading-[0.8]">
        Fitness Hub
      </h1>
      <p className="text-gray-400 mt-2 sm:mt-0 text-sm xs:text-base">
        Designed & Developed by Fitness Hub Team
      </p>
    </div>
  );
};

const Nav = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Logo and About Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl font-bold mb-4">Fitness Hub</h3>
        <p className="text-sm text-gray-300 mb-6">
          Your ultimate destination for fitness, nutrition, and the best workout
          equipment.
        </p>
        <p className="text-sm text-gray-400">
          © 2024 Fitness Hub. All rights reserved.
        </p>
      </motion.div>

      {/* Contact Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
        <ul className="text-sm space-y-1">
          <li>
            <span className="font-semibold">Phone:</span> +123-456-7890
          </li>
          <li>
            <span className="font-semibold">Email:</span> info@fitnesshub.com
          </li>
          <li>
            <span className="font-semibold">Location:</span> 1234 Fitness St,
            Healthy City, HC 56789
          </li>
        </ul>
      </motion.div>

      {/* Social Media Links Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
        <ul className="flex space-x-3 sm:space-x-4 text-sm">
          <li>
            <button className="flex items-center space-x-1 hover:text-gray-400">
              <FaInstagram /> <span>Instagram</span>
            </button>
          </li>
          <li>
            <button className="flex items-center space-x-1 hover:text-gray-400">
              <FaFacebookF /> <span>Facebook</span>
            </button>
          </li>
          <li>
            <button className="flex items-center space-x-1 hover:text-gray-400">
              <FaTwitter /> <span>Twitter</span>
            </button>
          </li>
          <li>
            <button className="flex items-center space-x-1 hover:text-gray-400">
              <FaGithub /> <span>GitHub</span>
            </button>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

/**COPIED FROM INSTA DAVIDM_AI */

// import React from 'react';
// import { FaInstagram, FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const socialMediaLinks = [
//   { name: 'Instagram', icon: FaInstagram, link: '#' },
//   { name: 'Facebook', icon: FaFacebook, link: '#' },
//   { name: 'GitHub', icon: FaGithub, link: '#' },
//   { name: 'LinkedIn', icon: FaLinkedin, link: '#' },
// ];

// const Footer = () => {
//   const year = new Date().getFullYear();

//   return (
//     <footer className="bg-primary-dark text-light py-10">
//       <div className="container mx-auto">
//         {/* Footer top */}
//         <section className="footer-top flex flex-col items-center text-center">
//           <h2 className="text-3xl font-bold mb-2">Subscribe to our newsletter</h2>
//           <p className="text-lg mb-4">Stay up to date with our news and articles</p>
//           <div className="footer-subscribe flex flex-col items-center">
//             <input
//               type="email"
//               className="w-full max-w-xs py-2 px-4 border border-primary-light bg-transparent rounded mb-4"
//               placeholder="Your Email"
//             />
//             <button className="bg-primary text-white py-2 px-4 rounded">Sign up</button>
//           </div>
//         </section>

//         {/* Footer columns */}
//         <section className="footer-columns grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10">
//           <div className="footer-logo text-center sm:text-left">
//             <h2 className="text-xl font-bold mb-2">Maxwell Technologies</h2>
//             <img src="assets/logo.svg" alt="Maxwell Technologies" className="mx-auto sm:mx-0" />
//           </div>
//           <div>
//             <h3 className="text-lg font-bold mb-2">Resources</h3>
//             <ul>
//               <li><Link to="#" className="hover:underline">Support</Link></li>
//               <li><Link to="#" className="hover:underline">And the following list items...</Link></li>
//             </ul>
//           </div>
//         </section>

//         {/* Social icons */}
//         <div className="social-bottom mt-10 text-center">
//           <h4 className="text-lg font-bold mb-2">Follow us:</h4>
//           <ul className="flex justify-center space-x-6">
//             {socialMediaLinks.map(({ name, icon: Icon, link }, index) => (
//               <li key={index} className="relative">
//                 <Link to={link}>
//                   <motion.div
//                     className="flex items-center space-x-2"
//                     whileHover={{ x: 10 }} // Shift to the right when hovered
//                   >
//                     <motion.div
//                       className="text-2xl"
//                       initial={{ x: 0 }}
//                       whileHover={{ x: -10 }} // Move icon to the left on hover
//                       transition={{ type: 'spring', stiffness: 300 }}
//                     >
//                       <Icon className="hover:text-primary transition" />
//                     </motion.div>
//                     <motion.span
//                       className="text-base"
//                       initial={{ opacity: 0, x: 10 }} // Hidden initially
//                       whileHover={{ opacity: 1, x: 0 }} // Slide in text on hover
//                       transition={{ duration: 0.3 }}
//                     >
//                       {name}
//                     </motion.span>
//                   </motion.div>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Footer bottom */}
//         <div className="footer-bottom mt-10 text-center">
//           <small>© <span id="year">{year}</span> Quantedge Technologies, Inc. All rights reserved.</small>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
