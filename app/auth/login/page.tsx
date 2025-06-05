"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { GrGoogle } from "react-icons/gr";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setErrorMsg("Invalid email or password");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    } else if (res?.ok) {
      setSuccessMsg("Logged in successful");
      setTimeout(() => {
        router.push(res.url ?? "/dashboard");
      }, 3000);
    }
  };
  return (
    <div>
      <div className="w-full flex justify-center py-15 px-2">
        <div className="w-[400px] gap-2 flex flex-col py-10 justify-center items-center border-1 border-[#7353e6] border-dashed">
          <form onSubmit={handleSubmit}>
            {errorMsg && (
              <div className="w-full flex justify-center items-center">
                <p className=" bg-red-400 w-[80%] font-semibold text-center text-white text-sm py-3 size">
                  {errorMsg}
                </p>
              </div>
            )}

            {successMsg && (
              <div className="w-full flex justify-center items-center">
                <p className=" bg-green-400 w-[80%] font-semibold text-center text-white text-sm py-3 size">
                  {successMsg}
                </p>
              </div>
            )}

            <div className="w-[400px] gap-2 flex flex-col py-10 justify-center items-center border-t-0 border-1 border-[#7353e6] border-dashed">
              <Image src="/logo.png" alt="logo" height={100} width={200} />
              <div className="flex w-[80%] gap-3 justify-between items-center mt-5">
                <label htmlFor="username" className="text-[14px] font-semibold">
                  Username:
                </label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMsg("");
                  }}
                  placeholder="example@gmail.com*"
                  className="text-[14px] font-semibold p-2 border-1 border-[#7353e6]"
                />
              </div>
              <div className="w-[80%] flex gap-3 justify-between items-center mt-2">
                <label htmlFor="password" className="text-[14px] font-semibold">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMsg("");
                  }}
                  placeholder="***************"
                  className="text-[14px]  font-semibold p-2 border-1 border-[#7353e6]"
                />
              </div>

              <div className="flex w-[80%]  text-[14px] mt-4 justify-between items-center">
                <span className="hover:text-[#7353e6] cursor-pointer">
                  Forgot Password?
                </span>
                <div className="flex items-center gap-1">
                  <input type="radio" /> <span>Remember me</span>
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#7353e6] text-white w-[200px]  py-2 px-5 flex gap-2 cursor-pointer justify-center items-center  rounded-md  capitalize text-[12px] font-semibold hover:text-white  hover:bg-[#16244d] transition-all transform-3d duration-300 ease-in-out"
              >
                Login
                <FiLogIn />
              </button>
            </div>
          </form>
          <span className="text-[12px] font-bold">OR</span>
          <div>
            <button
              onClick={() => signIn("google")}
              className="bg-[#7353e6] text-white w-[200px]  py-2 px-5 flex gap-2 cursor-pointer justify-center items-center  rounded-md  capitalize text-[12px] font-semibold hover:text-white  hover:bg-[#16244d] transition-all transform-3d duration-300 ease-in-out"
            >
              Login with Google
              <GrGoogle />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
