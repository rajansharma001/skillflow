"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";

interface UserType {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
}

const UserPage = () => {
  const [currentUser, setCurrentUser] = useState<UserType | null>();
  const getUser = async () => {
    try {
      const res = await fetch(`/api/userbyid/`);
      const result = await res.json();
      setCurrentUser(result.getUserByID);
    } catch (err) {
      console.log("User not found", err);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full p-2">
      <div className="w-full flex flex-col p-10 bg-white shadow-2xl justify-center items-center">
        <div className="flex justify-center gap-2 items-center w-[25%] shadow-2xl shadow-dash-primary p-5 rounded-md">
          <div>
            <img src={currentUser?.image} alt="" />
          </div>
          <div className="flex flex-col">
            <p className="text-[14px] font-semibold">{currentUser?.name}</p>
            <p className="text-[12px] font-semibold">{currentUser?.role}</p>
            <p className="text-[12px] font-semibold">{currentUser?.email}</p>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default UserPage;
