import Link from "next/link";
import React from "react";
import { motion } from "motion/react";

interface BtnProps {
  handleClick?: () => void;
  link?: any;
  btnStyle: string;
  btnTitle: string;
  icon: any;
  textStyle?: string;
}

const Button = ({
  link,
  btnStyle,
  btnTitle,
  icon: Icon,
  textStyle,
}: BtnProps) => {
  return (
    <Link
      href={link}
      className={`${btnStyle}  py-2 px-5 flex gap-2  justify-center items-center  rounded-md  capitalize text-[12px] font-semibold hover:text-white  hover:bg-[#16244d] transition-all transform-3d duration-300 ease-in-out`}
    >
      <span className={`${textStyle} `}>{btnTitle}</span>
      <span>{Icon && <Icon />}</span>
    </Link>
  );
};

export default Button;
