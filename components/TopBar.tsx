"use client";
import { scale, useScroll, motion, useSpring } from "motion/react";
import { usePathname } from "next/navigation";
import React from "react";
import {
  FaEnvelopeOpenText,
  FaLinkedin,
  FaPhoneVolume,
  FaYoutube,
} from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { IoLogoFacebook } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";

const TopBar = () => {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  return (
    <div className="flex w-full bg-[#16244d] items-center justify-center">
      <motion.div
        style={{ scaleX: smoothScroll }}
        className={`top-0 left-0 right-0 fixed bg-dash-primary h-0.5 w-full  origin-left`}
      ></motion.div>
      {!isDashboard && (
        <div className="flex flex-col gap-2  py-3 md:w-[85%] lg:w-[85%] items-center w-full md:flex-row lg:flex-row p-0">
          <div className="flex w-full  md:w-[60%] lg:w-[50%] text-white justify-center lg:justify-start flex-wrap">
            <span className="flex gap-1 ml-3 items-center justify-center text-[12px]">
              <FaPhoneVolume className="text-[#f8cc5c] size-4" /> +977 98580
              00000
            </span>
            <span className="flex gap-1 ml-6 items-center justify-center text-[12px]">
              <FaEnvelopeOpenText className="text-[#f8cc5c] size-4" />{" "}
              example@gmail.com
            </span>
            <span className="flex gap-1 ml-6 items-center justify-center text-[12px]">
              <GrLocation className="text-[#f8cc5c] size-4" /> Kohalpur-10,
              Banke
            </span>
          </div>
          <div className="flex w-[40%] text-white p-0 h-full justify-center md:justify-end lg:justify-end ">
            <div className="flex gap-2 text-[12px] items-center  text-white">
              <IoLogoFacebook className=" size-5  transition-all duration-300 ease-in-out hover:text-[#f8cc5c] cursor-pointer" />
              <RiInstagramFill className=" size-5  transition-all duration-300 ease-in-out hover:text-[#f8cc5c] cursor-pointer" />
              <FaLinkedin className=" size-5  transition-all duration-300 ease-in-out hover:text-[#f8cc5c] cursor-pointer" />
              <FaYoutube className=" size-5  transition-all duration-300 ease-in-out hover:text-[#f8cc5c] cursor-pointer" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
