"use client";
import Image from "next/image";
import React from "react";
import { BiRightArrow } from "react-icons/bi";
import { motion, scale } from "motion/react";
import Button from "./Button";
import SubmitButton from "./SubmitButton";
const Hero = () => {
  return (
    <div className="w-full flex justify-center bg-[url(/bgimg.png)]  bg-bottom-left">
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
        className="w-full md:w-[85%] lg:w-[85%] flex flex-col md:flex-row lg:flex-row justify-center items-center py-10"
      >
        <div className="flex flex-col w-full md:w-[50%] lg:w-[50%] px-5 md:px-15 lg:px-15 gap-3 text-center md:text-left lg:text-left">
          <h3 className="text-sm font-bold text-[#704fe6]">
            WELCOME EDUNITY ONLINE COURSES
          </h3>
          <h1 className="text-3xl font-bold">
            Achieving Your Dreams Through Education
          </h1>
          <p className="text-[12px]">
            We are experienced in educationl platform and skilled strategies for
            the success of our online learning.
          </p>
          <motion.div
            initial={{ scaleX: 5, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
          >
            <Button
              btnStyle=" bg-[#704fe6] text-white w-fit"
              btnTitle="Find Course"
              link="/#read-more"
              icon={BiRightArrow}
            />
          </motion.div>
        </div>
        <div className=" hidden w-[50%] md:flex lg:flex justify-center ">
          <Image src="/heroImg.jpg" alt="heroimage" width={500} height={500} />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
