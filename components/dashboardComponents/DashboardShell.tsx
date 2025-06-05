"use client";
import React, { useEffect, useState } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { BiBook, BiMoney, BiUser } from "react-icons/bi";
import { BsMessenger } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { PiNotificationDuotone, PiSquaresFourFill } from "react-icons/pi";
import { signOut, useSession } from "next-auth/react";
import { TbLogout } from "react-icons/tb";
import { LiaStar } from "react-icons/lia";

interface DbUser {
  name: string;
  email: string;
  image: string;
  role: string;
}

const DashboardShell = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isSideOpen, setIsSideOpen] = useState(false);

  const { data: session } = useSession();
  const [userData, setUserData] = useState<DbUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/userdata?email=${session?.user?.email}`);
      const user = await res.json();

      setUserData(user);
    };

    fetchUser();
  }, [session]);

  return (
    <div className="w-full px-6 flex gap-2 bg-gray-200  m-0">
      <aside
        className={`relative flex items-center justify-center transition-all duration-300 ease-in-out ${
          isSideOpen ? "w-[8%]" : "w-[15%]"
        }`}
      >
        <div className="absolute top-3 ">
          {!isSideOpen ? (
            <button
              onClick={() => setIsSideOpen(true)}
              className="p-2 cursor-pointer bg-dash-primary text-white font-bold rounded-full"
            >
              <FaLongArrowAltLeft />
            </button>
          ) : (
            <button
              onClick={() => setIsSideOpen(false)}
              className="p-2 cursor-pointer bg-dash-primary text-white font-bold rounded-full"
            >
              <FaLongArrowAltRight />
            </button>
          )}
        </div>

        <div className="w-full h-screen py-5 bg-white">
          {/*  side nav menu */}
          <div className=" w-full flex flex-col justify-center items-center">
            <div className="mt-6">
              <Image src="/logo.png" alt="logo" width={120} height={120} />
            </div>
            {/* menu */}
            <div className="flex w-full flex-col justify-center items-start  gap-3 mt-5">
              <Link href="/dashboard" className="w-full">
                <div
                  className={`   ${
                    !isSideOpen ? "justify-left" : "justify-center"
                  } flex w-full gap-2 items-center capitalize text-[12px] py-2 px-10  hover:bg-dash-primary   font-bold text-gray-600 hover:text-white transition-all duration-300 ease-in`}
                >
                  <PiSquaresFourFill size={18} />
                  <span className={!isSideOpen ? "block" : "hidden"}>
                    dashboard
                  </span>{" "}
                </div>
              </Link>
              <Link href="/dashboard/course" className="w-full ">
                <div
                  className={`   ${
                    !isSideOpen ? "justify-left" : "justify-center"
                  } flex w-full gap-2 items-center justify-left ${!isSideOpen} capitalize text-[12px] py-2 px-10  hover:bg-dash-primary   font-bold text-gray-600 hover:text-white transition-all duration-300 ease-in`}
                >
                  <BiBook size={18} />
                  <span className={!isSideOpen ? "block" : "hidden"}>
                    course
                  </span>
                </div>
              </Link>
              <Link href="/dashboard/lesson" className="w-full ">
                <div
                  className={`   ${
                    !isSideOpen ? "justify-left" : "justify-center"
                  } flex w-full gap-2 items-center justify-left ${!isSideOpen} capitalize text-[12px] py-2 px-10  hover:bg-dash-primary   font-bold text-gray-600 hover:text-white transition-all duration-300 ease-in`}
                >
                  <BiBook size={18} />
                  <span className={!isSideOpen ? "block" : "hidden"}>
                    Lesson
                  </span>
                </div>
              </Link>
              <Link href="/dashboard/course_category" className="w-full ">
                <div
                  className={`   ${
                    !isSideOpen ? "justify-left" : "justify-center"
                  } flex w-full gap-2 items-center justify-left ${!isSideOpen} capitalize text-[12px] py-2 px-10  hover:bg-dash-primary   font-bold text-gray-600 hover:text-white transition-all duration-300 ease-in`}
                >
                  <LiaStar size={18} />
                  <span className={!isSideOpen ? "block" : "hidden"}>
                    course category
                  </span>
                </div>
              </Link>
              <Link href="/dashboard/donation" className="w-full ">
                <div
                  className={`   ${
                    !isSideOpen ? "justify-left" : "justify-center"
                  } flex w-full gap-2 items-center  justify-left ${!isSideOpen} capitalize text-[12px] py-2 px-10  hover:bg-dash-primary   font-bold text-gray-600 hover:text-white transition-all duration-300 ease-in`}
                >
                  <BiMoney size={18} />
                  <span className={!isSideOpen ? "block" : "hidden"}>
                    donation
                  </span>
                </div>
              </Link>
              <Link href="/dashboard/user" className="w-full ">
                <div
                  className={`   ${
                    !isSideOpen ? "justify-left" : "justify-center"
                  } flex w-full gap-2 items-center  justify-left ${!isSideOpen} capitalize text-[12px] py-2 px-10  hover:bg-dash-primary   font-bold text-gray-600 hover:text-white transition-all duration-300 ease-in`}
                >
                  <BiUser size={18} />
                  <span className={!isSideOpen ? "block" : "hidden"}>User</span>
                </div>
              </Link>
              <Link href="/dashboard/messages" className="w-full ">
                <div
                  className={`   ${
                    !isSideOpen ? "justify-left" : "justify-center"
                  } flex w-full gap-2 items-center  justify-left ${!isSideOpen} capitalize text-[12px] py-2 px-10  hover:bg-dash-primary   font-bold text-gray-600 hover:text-white transition-all duration-300 ease-in`}
                >
                  <BsMessenger size={18} />
                  <span className={!isSideOpen ? "block" : "hidden"}>
                    messages
                  </span>
                </div>
              </Link>
              <Link href="/dashboard/notification" className="w-full ">
                <div
                  className={`   ${
                    !isSideOpen ? "justify-left" : "justify-center"
                  } flex w-full gap-2 items-center  justify-left ${!isSideOpen} capitalize text-[12px] py-2 px-10  hover:bg-dash-primary   font-bold text-gray-600 hover:text-white transition-all duration-300 ease-in`}
                >
                  <PiNotificationDuotone size={18} />
                  <span className={!isSideOpen ? "block" : "hidden"}>
                    notification
                  </span>
                </div>
              </Link>
              <Link href="/dashboard/settings" className="w-full ">
                <div
                  className={`   ${
                    !isSideOpen ? "justify-left" : "justify-center"
                  } flex w-full gap-2 items-center  justify-left ${!isSideOpen} capitalize text-[12px] py-2 px-10  hover:bg-dash-primary   font-bold text-gray-600 hover:text-white transition-all duration-300 ease-in`}
                >
                  <CiSettings size={18} />
                  <span className={!isSideOpen ? "block" : "hidden"}>
                    settings
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* user and logout  */}
          <div className="flex  justify-center items-center">
            <div className="absolute bottom-5">
              {userData && (
                <div className="flex flex-wrap  gap-5 justify-center items-center px-2">
                  <div className="flex gap-2 ">
                    <img
                      src={userData.image}
                      alt="img"
                      className="h-10 w-10 rounded-md"
                    />

                    <div className="flex flex-col text-[12px] font-bold uppercase">
                      <p>{userData.name.split(" ")[0]}</p>
                      <p className="text-[11px] font-semibold">
                        {userData.role}
                      </p>
                    </div>
                  </div>

                  <div className=" ">
                    <button
                      onClick={() => signOut()}
                      className="cursor-pointer flex text-xl text-white p-2 bg-dash-primary rounded-full font-semibold uppercase items-center justify-center"
                    >
                      <TbLogout />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
      <main className={`${isSideOpen ? "w-[92%]" : "w-[85%]"} `}>
        {children}
      </main>
    </div>
  );
};

export default DashboardShell;
