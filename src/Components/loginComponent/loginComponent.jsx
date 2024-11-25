// src/LoginComponent.js

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/authSlice";

const LoginComponent = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!loginData.email) errors.email = "Email is required";
    if (!loginData.password) errors.password = "Password is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/login",
          loginData
        );
        // console.log(response);
        // console.log(response.data);
        // set token in local storage
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("userRole", user.userRole);

        // console.log(response.data.token);

        // dispatch login action
        dispatch(login({ token, userRole: user.userRole }));

        setTimeout(() => {
          authState.userRole === "admin"
            ? Navigate("/admin")
            : Navigate("/workout");

          // Navigate("/workout");
        }, 1000);

        // show success message
        toast.success(response.data.msg);
      } catch (error) {
        console.error(error.response.data.msg);
        toast.error(error.response.data.msg);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  console.log(authState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="bg-[#000000] p-8 rounded-lg shadow-lg w-full max-w-md relative border border-white">
        <Link
          to="/"
          className="absolute top-2 right-4 text-3xl text-gray-500 hover:text-white"
        >
          &times; {/* Close icon */}
        </Link>
        <h2 className="text-2xl font-bold mb-6 text-white">Login</h2>
        <form onSubmit={handleSubmit}>
          <ToastContainer />
          <div className="mb-4">
            <label className="block text-white font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 bg-[#27272A] rounded-md focus:outline-none focus:ring focus:ring-indigo-100 text-white"
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-white font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 text-white bg-[#27272A] "
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-8"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-500 cursor-pointer" />
              ) : (
                <FaEye className="text-gray-500 cursor-pointer" />
              )}
            </div>
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
          </div>
          <button
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link
            to="/signup" // Change this to your signup page route
            className="text-indigo-500 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
