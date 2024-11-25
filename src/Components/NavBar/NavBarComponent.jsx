import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
export const NavbarComponent = () => {
  return <SlideTabs />;
};

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: -100 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="flex justify-between items-center sticky top-0 w-full p-2.5 md:p-4 shadow-lg z-50 bg-[#2c2b2a59] bg-opacity-50 backdrop-blur-md"
    >
      {/* Logo */}
      <h2 className="text-white text-xl md:text-2xl font-bold cursor-pointer relative z-50">
        <Link to="/">VitaFit</Link>
      </h2>

      {/* Hamburger Icon - Now with higher z-index */}
      <div className="lg:hidden relative z-50">
        <button
          onClick={handleMenuToggle}
          className="text-white focus:outline-none p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 md:w-8 md:h-8"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Desktop Navigation */}
      <ul
        className="relative mx-auto hidden lg:flex w-auto rounded-full bg-white p-1"
        onMouseLeave={() => {
          setPosition((pv) => ({
            ...pv,
            opacity: 0,
          }));
        }}
      >
        {authState.isAuthenticated ? (
          <>
            <Tab setPosition={setPosition}>
              <ScrollLink to="about" smooth={true} duration={500} offset={-340}>
                About Us
              </ScrollLink>
            </Tab>
            <Tab setPosition={setPosition}>
              <Link to="/workout">Workout Plans</Link>
            </Tab>
            <Tab setPosition={setPosition}>
              <Link to="/recipe">Recipes</Link>
            </Tab>
            <Tab setPosition={setPosition}>
              <ScrollLink to="faqs" smooth={true} duration={500} offset={0}>
                FAQs
              </ScrollLink>
            </Tab>
            <Tab setPosition={setPosition}>
              <ScrollLink
                to="contactus"
                smooth={true}
                duration={500}
                offset={0}
              >
                Contact Us
              </ScrollLink>
            </Tab>
          </>
        ) : (
          <>
            <Tab setPosition={setPosition}>
              <ScrollLink to="about" smooth={true} duration={500} offset={-340}>
                About Us
              </ScrollLink>
            </Tab>
            <Tab setPosition={setPosition}>
              <ScrollLink
                to="services"
                smooth={true}
                duration={500}
                offset={60}
              >
                Services
              </ScrollLink>
            </Tab>
            <Tab setPosition={setPosition}>
              <ScrollLink to="pricing" smooth={true} duration={500} offset={0}>
                Pricing
              </ScrollLink>
            </Tab>
            <Tab setPosition={setPosition}>
              <ScrollLink to="faqs" smooth={true} duration={500} offset={0}>
                FAQs
              </ScrollLink>
            </Tab>
            <Tab setPosition={setPosition}>
              <ScrollLink
                to="contactus"
                smooth={true}
                duration={500}
                offset={0}
              >
                Contact Us
              </ScrollLink>
            </Tab>
          </>
        )}
        <Cursor position={position} />
      </ul>

      {/* Mobile Menu - Adjusted z-index */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed lg:hidden top-0 right-0 w-full md:w-80 h-screen bg-[#2c2b2a] pt-20 px-6 z-40"
        >
          <div className="flex flex-col space-y-6">
            {authState.isAuthenticated ? (
              <>
                <NavLink onClick={handleMenuToggle} to="about" offset={-340}>
                  About Us
                </NavLink>
                <NavLink onClick={handleMenuToggle} to="/workout" isRoute>
                  Workout Plans
                </NavLink>
                <NavLink onClick={handleMenuToggle} to="/recipe" isRoute>
                  Recipes
                </NavLink>
                <NavLink onClick={handleMenuToggle} to="faqs">
                  FAQs
                </NavLink>
                <NavLink onClick={handleMenuToggle} to="contactus">
                  Contact Us
                </NavLink>
                <button
                  onClick={() => {
                    handleMenuToggle();
                    handleLogout();
                  }}
                  className="text-white bg-red-500 px-4 py-3 rounded-md text-center mt-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink onClick={handleMenuToggle} to="about" offset={-340}>
                  About Us
                </NavLink>
                <NavLink onClick={handleMenuToggle} to="services" offset={60}>
                  Services
                </NavLink>
                <NavLink onClick={handleMenuToggle} to="pricing">
                  Pricing
                </NavLink>
                <NavLink onClick={handleMenuToggle} to="faqs">
                  FAQs
                </NavLink>
                <NavLink onClick={handleMenuToggle} to="contactus">
                  Contact Us
                </NavLink>
                <Link
                  to="/login"
                  onClick={handleMenuToggle}
                  className="bg-white text-black rounded-md px-4 py-3 text-center mt-4"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* Desktop Auth Button */}
      {authState.isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="hidden lg:block text-white bg-red-500 px-4 py-2 rounded-md"
        >
          Logout
        </button>
      ) : (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden lg:block"
        >
          <Link
            to="/login"
            className="bg-white rounded-3xl text-black text-lg md:text-xl hover:rounded-xl px-6 md:px-8 py-2 md:py-3 transition-all duration-300"
          >
            Login
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};

const NavLink = ({ children, to, offset = 0, isRoute = false, onClick }) => {
  if (isRoute) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className="text-white text-lg md:text-xl hover:text-gray-300 transition-colors duration-200"
      >
        {children}
      </Link>
    );
  }

  return (
    <ScrollLink
      to={to}
      smooth={true}
      duration={500}
      offset={offset}
      onClick={onClick}
      className="text-white text-lg md:text-xl hover:text-gray-300 transition-colors duration-200 cursor-pointer"
    >
      {children}
    </ScrollLink>
  );
};

const Tab = ({ children, setPosition }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
  );
};

export default SlideTabs;

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../features/authSlice";
// import "./navbar.css";
// import { motion, useScroll, useMotionValueEvent } from "framer-motion";
// // import { toggle } from "../../features/navbarSlice";
// const NavbarComponent = () => {
//   const navigate = useNavigate();

//   const dispatch = useDispatch();
//   const authState = useSelector((state) => state.auth);
//   // console.log(authState.isAuthenticated);
//   console.log(authState.userRole);
//   //   const isOpen = useSelector((state) => state.navbar.isOpen);

//   const handleLogout = () => {
//     dispatch(logout()); ***
//     navigate("/login");
//   };

//   const { scrollY } = useScroll();
//   const [hidden, setHidden] = useState(false);

//   useMotionValueEvent(scrollY, "change", (latest) => {
//     const previous = scrollY.getPrevious();
//     if (latest > previous && latest > 150) {
//       setHidden(true);
//     } else {
//       setHidden(false);
//     }
//   });

//   return (
//     <motion.header
//       variants={{
//         visible: { y: 0 },
//         hidden: { y: -100 },
//       }}
//       animate={hidden ? "hidden" : "visible"}
//       transition={{ duration: 0.35, ease: "easeInOut" }}
//       className="flex justify-between items-center sticky top-0 w-full p-5 shadow-lg z-50 bg-black bg-opacity-50 backdrop-blur-md"
//     >
//       <h2 className="text-white text-2xl font-bold cursor-pointer">
//         <Link to="/">VitaFit</Link>
//       </h2>
//       <nav className="navigation space-x-7 justify-between">
//         <Link to="/">Home</Link>
//         <Link to="/about">About</Link>
//         <Link to="/product">Shop</Link>
//         <Link to="/contactus">Contact Us</Link>
//         {authState.isAuthenticated ? (
//           <>
//             <Link to="/workout">Workout</Link>
//             <Link to="/addworkout">Add Workout</Link>
//             <Link to="/nutrition">Nutrition</Link>

//             {authState.userRole === "admin" ? (
//               <>
//                 <Link to="/addproduct">Add Product</Link>
//                 <Link to="/addcategory">Add Category</Link>
//                 <Link to="/addworkout-type">Add Workout-Type</Link>
//               </>
//             ) : null}
//             <button onClick={handleLogout}>Log Out</button>
//           </>
//         ) : (
//           <>
//             <Link
//               to="/login"
//               className="btnlogin-popup bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-400 transition duration-300"
//             >
//               Sign In
//             </Link>
//           </>
//         )}
//       </nav>
//     </motion.header>
//   );
// };

// export default NavbarComponent;
