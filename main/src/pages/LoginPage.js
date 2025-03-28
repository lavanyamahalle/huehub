import React from "react";
import { FaRegEyeSlash, FaRegEye, FaGoogle, FaInstagram, FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../assests/bg3.jpg";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";

const LoginPage = (props) => {
  let setIsLoggedIn = props.setIsLoggedIn;
  const location = useLocation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [visible, Setvisible] = useState(false);
  const navigate = useNavigate();

  // Handles form field changes and updates state
  function changeHandler(event) {
    setFormData((pre) => ({ ...pre, [event.target.id]: event.target.value }));
  }

  // Navigates to the reset password page
  function resethandler() {
    navigate("/reset");
  }

  // Submits the login form
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://huehub-vyrf-git-main-soham-lates-projects.vercel.app/api/v1/auth/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      props.setUser(response.data.user);
      toast.success("Logged In");
      props.socket.emit("login", {
        userId: response.data.user._id,
        socketId: props.socket.id,
      });
      navigate("/gallery");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  };

  // Initiates Google login
  const handleGoogleLogin = async () => {
    try {
      window.location.href = "https://huehub-vyrf-git-main-soham-lates-projects.vercel.app/api/v1/auth/google";
    } catch (error) {
      console.error("Error logging in with Google:", error);
      toast.error("Failed to log in with Google");
    }
  };

  return (
    <div className="relative w-screen h-[100vh] pt-[2rem] text-white">
      {/* Background image */}
      <img src={logo} className="absolute top-0 w-full h-full" />
      <div className="flex flex-wrap justify-center items-center gap-x-20 w-full">
        {/* Animated section for tagline */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="z-30 max-w-96"
        >
          <p className="text-white lg:text-5xl md:text-4xl mx-[1rem] xs:mb-[1rem] xs:text-3xl block">
            "Experience the{" "}
            <ReactTyped
              strings={["HueHub"]}
              typeSpeed={200}
              backSpeed={200}
              loop
              className="text-[#f8ea4f]"
            >
            </ReactTyped>{" "}
            difference – where creativity thrives, inspiration blooms, and
            masterpieces begin."
          </p>
        </motion.div>

        {/* Animated login form */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center mt-5"
        >
          <div className="md:w-[25rem] xs:w-[90vw] max-w-[25rem] min-w-[280px]">
            <div className="flex flex-col backdrop-filter backdrop-blur-lg bg-transparent rounded-md text-md p-2 border border-black">
              <h1 className="text-2xl mt-[2rem] text-center">Welcome to Huehub!</h1>
              <p className="font-thin text-xl mt-[0.3rem] text-center">
                Please Sign-in to your account
              </p>

              <form
                onSubmit={submitHandler}
                className="flex flex-col m-3 mt-[0.5rem] gap-y-2"
              >
                {/* Email input */}
                <label className="flex flex-col" htmlFor="email">
                  <p className="text-left text-xl pt-2">
                    Email<sup>*</sup>
                  </p>
                </label>
                <input
                  required
                  id="email"
                  className="text-black px-2 rounded-md xs:h-[2.7rem] sm:h-[3rem] bg-gray-100"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={changeHandler}
                />

                {/* Password input */}
                <label htmlFor="password">
                  <p className="text-left text-xl pt-2">
                    Password<sup>*</sup>
                  </p>
                </label>
                <div className="w-full rounded-md xs:h-[2.7rem] sm:h-[3rem] bg-gray-100 relative">
                  <input
                    className="text-black px-2 rounded-md xs:h-[2.7rem] sm:h-[3rem] bg-gray-100 w-full"
                    required
                    id="password"
                    type={visible ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={changeHandler}
                  />
                  <div
                    onClick={() => Setvisible(!visible)}
                    className="cursor-pointer absolute right-3 top-4 text-black"
                  >
                    {visible ? <FaRegEye /> : <FaRegEyeSlash />}
                  </div>
                </div>

                {/* Forgot password */}
                <div className="form-link">
                  <div
                    onClick={resethandler}
                    className="forgot-pass hover:cursor-pointer text-red-600 font-bold"
                  >
                    Forgot password?
                  </div>
                </div>

                {/* Login button */}
                <button className="border text-center px-2 py-[3%] mt-5 rounded-md shadow hover:shadow-inner text-white font-semibold bg-blue-600">
                  LOGIN
                </button>
              </form>

              {/* Sign-up link */}
              <div className="form-link">
                <span className="ml-4 blink">
                  Don't have an account?{" "}
                  <a href="/otp" className="link signup-link">
                    Signup
                  </a>
                </span>
              </div>

              <hr className="border-b-2 border-gray-300 mt-6"></hr>

              {/* Social media login options */}
              <div className="flex mt-[1rem] justify-evenly text-white">
                <button>
                  <FaGoogle />
                </button>
                <FaInstagram />
                <FaFacebook />
                <FaTwitter />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
