"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Button from "./Button";
import { BiLogIn } from "react-icons/bi";
import { FaRegWindowClose, FaWpforms } from "react-icons/fa";
import { redirect, usePathname, useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { getSession, signOut, useSession } from "next-auth/react";
import { LuLogOut } from "react-icons/lu";

const menu = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Course", link: "/courses" },
  { title: "Contact Us", link: "/contact" },
  { title: "Donate", link: "/donate" },
];

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");

  const [sideMenu, setSideMenu] = useState(false);
  const pathName = usePathname();

  const { data: session, status } = useSession();
  return (
    <div className="w-full flex justify-center items-center  ">
      {!isDashboard && (
        <div className="w-full flex md:w-[85%] lg:w-[85%] justify-between items-center  py-3">
          {/* logo */}
          <div className="w-3/12">
            <Link href="/">
              <Image src="/logo.png" alt="logo" width={200} height={100} />
            </Link>
          </div>
          {/* nav menu */}
          <div className="w-6/12 flex gap-6 uppercase text-[12px] font-semibold justify-center md:justify-end lg:justify-end items-center ">
            {/* large device menu */}
            <div className="hidden md:flex lg:flex">
              {menu.map((item) => (
                <Link
                  href={item.link}
                  key={item.title}
                  className={`cursor-pointer hover:text-white flex ml-2 hover:bg-[#16244d] py-1 px-2 rounded-sm transition-all duration-300 ease-in-out ${
                    pathName == item.link
                      ? "bg-[#16244d] text-white py-1 px-2 rounded-sm"
                      : ""
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* mobile menu */}
            <div className="flex md:hidden lg:hidden">
              <button onClick={() => setSideMenu(true)}>
                <GiHamburgerMenu size={20} />
              </button>
            </div>
            <div
              className={`flex flex-col fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
                sideMenu == true ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="flex justify-between px-3 py-3">
                <Link href="/">
                  <Image src="/logo.png" alt="logo" width={150} height={100} />
                </Link>
                <button onClick={() => setSideMenu(false)}>
                  <FaRegWindowClose size={20} />
                </button>
              </div>
              <div className="w-[80%] flex flex-col mt-3">
                {menu.map((item) => (
                  <Link
                    href={item.link}
                    key={item.title}
                    className={`cursor-pointer hover:text-white hover:bg-[#16244d] p-3 rounded-sm transition-all duration-300 ease-in-out ${
                      pathName == item.link
                        ? "bg-[#16244d] text-white py-1 px-2 rounded-sm"
                        : ""
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* buttons */}
          {!session ? (
            <div className="w-3/12 flex gap-2 justify-end">
              <Button
                btnStyle="text-black border-1 border-[#16244d]"
                btnTitle="login"
                link="/auth/login"
                icon={BiLogIn}
                textStyle="hidden md:flex lg:flex"
              />
              <Button
                btnStyle="bg-[#704fe6] text-white"
                btnTitle="signup"
                link="/auth/signup"
                icon={FaWpforms}
                textStyle="hidden md:flex lg:flex"
              />
            </div>
          ) : (
            <div className="w-3/12 flex gap-2 justify-end">
              <button
                onClick={async () => {
                  await signOut({ redirect: false });
                  router.push("/");
                }}
                className="bg-[#7353e6] text-white   py-2 px-5 flex gap-2 cursor-pointer justify-center items-center  rounded-md  capitalize text-[12px] font-semibold hover:text-white  hover:bg-[#16244d] transition-all transform-3d duration-300 ease-in-out"
              >
                logout
                <LuLogOut />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
