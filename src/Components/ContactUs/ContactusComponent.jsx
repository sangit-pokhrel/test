import React, { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../config/axiosConfig";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [inView, setInView] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentRef = formRef.current; // Capture the current ref value at this point

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef); // Use the captured ref in the cleanup
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("message", formData.message);

    try {
      const response = await axiosInstance.post("/contact/create", data, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success(response.data.message);
      console.log("Message sent successfully:", response);
      // make form data empty
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.msg || "An error occurred");
    }
  };

  return (
    <div
      className="min-h-screen w-full px-4 py-12 bg-gray-950"
      name="contactus"
    >
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />

      <div
        ref={formRef}
        className={`max-w-6xl mx-auto rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Info Section */}
          <div className="lg:w-2/5 bg-gray-900 p-8 lg:p-12">
            <div
              className={`space-y-6 transition-all duration-500 ${
                inView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Get in Touch
              </h2>

              <p className="text-gray-400 text-lg">
                Questions or concerns? We're here to help. Send us a message and
                we'll get back to you shortly.
              </p>

              <div className="space-y-4 pt-6">
                <div className="flex items-center space-x-4 text-gray-300">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <span>contact@yourcompany.com</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-300">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <span>+1 (123) 456-7890</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-300">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <span>123 Business Avenue, Suite 100</span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-800">
                <p className="text-gray-400">
                  Business Hours:
                  <br />
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 10:00 AM - 2:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:w-3/5 bg-gray-800 p-8 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-white transition-all"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-[#9D4EDD] to-[#7B2CBF] text-white rounded-lg hover:from-[#7B2CBF] hover:to-[#9D4EDD] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all active:scale-[0.99]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

// import React, { useState } from "react";

// import { motion } from "framer-motion";
// import axiosInstance from "../../config/axiosConfig";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("name", formData.name);
//     data.append("email", formData.email);
//     data.append("message", formData.message);

//     try {
//       const response = await axiosInstance.post("/contact/create", data, {
//         headers: { "Content-Type": "application/json" },
//       });
//       toast.success(response.data.message);
//       console.log("Message sent successfully:", response);
//       // make form data empty
//       setFormData({
//         name: "",
//         email: "",
//         message: "",
//       });
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error(error.response?.data?.msg || "An error occurred");
//     }
//   };
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#E2DDDB]">
//       <ToastContainer />

//       <motion.div
//         initial={{ opacity: 0, scale: 0.9, y: 20 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         className="bg-gray-800 text-gray-100 p-10 rounded-lg shadow-lg w-full max-w-4xl flex"
//       >
//         {/* Left section with text */}
//         <div className="w-1/2 pr-12">
//           <h2 className="text-4xl font-bold mb-6">Talk to Our Specialists</h2>
//           <p className="text-lg mb-8">
//             Fill in your details, and our team will contact you shortly.
//           </p>
//           <div className="text-sm">
//             <p>Email: contact@yourcompany.com</p>
//             <p>WhatsApp: +1 123-456-7890</p>
//           </div>
//         </div>

//         {/* Right section with form */}
//         <div className="w-1/2">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium mb-2" htmlFor="name">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 border border-gray-600 bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2" htmlFor="email">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 border border-gray-600 bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label
//                 className="block text-sm font-medium mb-2"
//                 htmlFor="message"
//               >
//                 Message
//               </label>
//               <textarea
//                 id="message"
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 required
//                 rows="4"
//                 className="w-full px-4 py-3 border border-gray-600 bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               ></textarea>
//             </div>
//             <button
//               type="submit"
//               className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
//             >
//               Send
//             </button>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ContactForm;
