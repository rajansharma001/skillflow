"use client";
import React from "react";
import Button from "./Button";
import { FaEnvelope } from "react-icons/fa";
import { motion } from "motion/react";

const NewsLetter = () => {
  return (
    <motion.div
      initial={{ scaleX: 5, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
      className="w-full bg-[#704fe6] py-20"
    >
      <div className="w-full flex justify-center items-center ">
        <div className="w-[75%] flex flex-col md:flex-row lg:flex-row gap-10 items-center justify-between">
          <div className="w-full text-white text-center md:text-left lg:text-left">
            <h1 className="text-3xl font-bold">Join Our Newsletter</h1>
            <p className="text-[12px]">
              Subscribe our newsletter to get our latest update & news.
            </p>
          </div>
          <div className="flex relative w-full items-center justify-end text-white">
            <div className="w-[500px] flex items-center border-gray-400 text-black bg-white border-1 py-1 px-3 rounded-md ">
              <input
                type="text"
                placeholder="Enter your E-mail"
                className="relative  py-3 w-[330px] focus:outline-none text-[14px]"
              />
              <Button
                btnStyle="absolute right-2 z-1 bg-[#704fe6] text-white py-3"
                btnTitle="Subscribe Now"
                icon={FaEnvelope}
                link="/#subs"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsLetter;
