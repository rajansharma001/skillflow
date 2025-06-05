"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";
import { RiArrowRightSLine } from "react-icons/ri";

const Footer = () => {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  return (
    <div>
      {/* footer content */}

      {!isDashboard && (
        <div className="w-full flex items-center  justify-center py-6 md:py-16 lg:py-16  bg-blue-950">
          <div className="w-full md:w-[85%] px-4 lg:w-[85%] flex flex-col md:flex-row lg:flex-row gap-3">
            <div
              className="w-full md:w-4/12 lg:w-4/12 flex flex-col gap-4 px-2
              "
            >
              <Image
                src="/logo.png"
                className="bg-white"
                alt="logo"
                height={100}
                width={200}
              />
              <p className="text-white text-[14px] ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
                autem sapiente eos possimus animi! Perferendis!
              </p>
              <div className="flex text-white gap-4">
                <FaFacebook
                  size={25}
                  className="hover:text-amber-400 transition-all duration-300 ease-in-out cursor-pointer"
                />
                <FaInstagram
                  size={25}
                  className="hover:text-amber-400 transition-all duration-300 ease-in-out cursor-pointer"
                />
                <LiaLinkedin
                  size={25}
                  className="hover:text-amber-400 transition-all duration-300 ease-in-out cursor-pointer"
                />
                <FaYoutube
                  size={25}
                  className="hover:text-amber-400 transition-all duration-300 ease-in-out cursor-pointer"
                />
              </div>
            </div>
            <div className="w-full md:w-3/12 lg:w-3/12 text-white flex flex-col ">
              <h2 className="text-[14px] font-semibold capitalize">Services</h2>
              <div className="h-[2px] w-[80%] mt-1 bg-white"></div>
              <div className="flex flex-col gap-2 p-0 m-0 mt-2">
                <div className="flex text-[12px] justify-start items-center hover:text-amber-400 transition-all duration-300 ease-in-out cursor-pointer">
                  <RiArrowRightSLine size={15} />
                  <span>Web Development</span>
                </div>
                <div className="flex text-[12px] justify-start items-center hover:text-amber-400 transition-all duration-300 ease-in-out cursor-pointer">
                  <RiArrowRightSLine size={15} />
                  <span>Web Development</span>
                </div>
                <div className="flex text-[12px] justify-start items-center hover:text-amber-400 transition-all duration-300 ease-in-out cursor-pointer">
                  <RiArrowRightSLine size={15} />
                  <span>Web Development</span>
                </div>
                <div className="flex text-[12px] justify-start items-center hover:text-amber-400 transition-all duration-300 ease-in-out cursor-pointer">
                  <RiArrowRightSLine size={15} />
                  <span>Web Development</span>
                </div>
                <div className="flex text-[12px] justify-start items-center hover:text-amber-400 transition-all duration-300 ease-in-out cursor-pointer">
                  <RiArrowRightSLine size={15} />
                  <span>Web Development</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-3/12 lg:w-3/12 text-white flex flex-col ">
              <h2 className="text-[14px] font-semibold capitalize">
                Quick links
              </h2>
              <div className="h-[2px] w-[80%] mt-1 bg-white"></div>
              <div className="flex flex-col gap-2 p-0 m-0 mt-2">
                <div className="flex text-[12px] justify-start items-center hover:text-amber-400 transition-all duration-300 ease-in-out cursor-pointer">
                  <RiArrowRightSLine size={15} />
                  <span>Web Development</span>
                </div>
                <div className="flex text-[12px] justify-start items-center hover:text-amber-400 transition-all duration-300 ease-in-out cursor-pointer">
                  <RiArrowRightSLine size={15} />
                  <span>Web Development</span>
                </div>
                <div className="flex text-[12px] justify-start items-center hover:text-amber-400 transition-all duration-300 ease-in-out cursor-pointer">
                  <RiArrowRightSLine size={15} />
                  <span>Web Development</span>
                </div>
                <div className="flex text-[12px] justify-start items-center hover:text-amber-400 transition-all duration-300 ease-in-out cursor-pointer">
                  <RiArrowRightSLine size={15} />
                  <span>Web Development</span>
                </div>
                <div className="flex text-[12px] justify-start items-center hover:text-amber-400 transition-all duration-300 ease-in-out cursor-pointer">
                  <RiArrowRightSLine size={15} />
                  <span>Web Development</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-3/12 lg:w-3/12">
              <h2 className="text-[14px] font-semibold capitalize text-white">
                Find Us
              </h2>
              <div className="h-[2px] w-[80%] mt-1 bg-white"></div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55142864.09890165!2d-174.111328125!3d32.48196313217178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86de266386b6ec77%3A0x18f66af26201e7e0!2sNASA!5e0!3m2!1sen!2sqa!4v1747097148994!5m2!1sen!2sqa"
                width="100%"
                height="180"
                loading="lazy"
                className="mt-2"
              ></iframe>
            </div>
          </div>
        </div>
      )}
      {/* bottom copyright bar */}
      <div className="bg-gray-900  flex items-center justify-center py-3">
        <p className="text-white text-[12px] capitalize">
          copyright 2025 <strong>E-Learning</strong> || All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
