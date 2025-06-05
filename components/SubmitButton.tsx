import React from "react";
interface Btn {
  title: string;
  onclick?: () => void;
  icon?: React.ReactNode;
  btnStyle?: string;
}

const SubmitButton = ({ title, onclick, icon, btnStyle }: Btn) => {
  return (
    <button
      type="submit"
      onClick={onclick}
      className={`${btnStyle} py-2 px-5 flex gap-2  justify-center items-center  rounded-[2px] cursor-pointer  bg-dash-primary text-white capitalize text-[12px] font-semibold hover:text-white  hover:bg-[#16244d] transition-all transform-3d duration-300 ease-in-out`}
    >
      {title} {icon && icon}
    </button>
  );
};

export default SubmitButton;
