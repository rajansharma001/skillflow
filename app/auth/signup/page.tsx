"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      // redirect to login after success
      router.push("/auth/login");
    } catch (err) {
      setError("Network error, try again");
      console.log("Resgistration Error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full flex justify-center py-15 px-2">
        <div className="w-[400px] gap-2 flex flex-col py-10 justify-center items-center border-1 border-[#7353e6] border-dashed">
          <Image src="/logo.png" alt="logo" height={100} width={200} />
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-full px-2 gap-3 justify-between items-center mt-5">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-[14px] w-[80%] font-semibold p-2 border-1 border-[#7353e6]"
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com*"
                className="text-[14px] w-[80%] font-semibold p-2 border-1 border-[#7353e6]"
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="example@gmail.com*"
                className="text-[14px] w-[80%] font-semibold p-2 border-1 border-[#7353e6]"
              />

              <div className="flex justify-center items-center gap-1">
                <input type="checkbox" />

                <span className="text-[12px] font-medium">
                  Agree Terms & Conditions
                </span>
              </div>
              <button
                type="submit"
                className="bg-[#7353e6] text-white w-[200px]  py-2 px-5 flex gap-2 cursor-pointer justify-center items-center  rounded-md  capitalize text-[12px] font-semibold hover:text-white  hover:bg-[#16244d] transition-all transform-3d duration-300 ease-in-out"
              >
                Register
                <FiLogIn />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
