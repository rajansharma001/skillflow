"use client";
import { FaBook, FaClock, FaLongArrowAltRight } from "react-icons/fa";
import Button from "./Button";
import { FaArrowRightLong, FaPerson } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { InputType } from "@/types";
import { motion } from "motion/react";

const CourseCard = () => {
  const [fetchedCourse, setFetchedCourse] = useState<InputType[]>([]);
  const getCourse = async () => {
    const res = await fetch("/api/frontendFetch/");
    const result = await res.json();
    setFetchedCourse(result);
  };

  useEffect(() => {
    getCourse();
  }, []);
  return (
    <div className="w-full flex flex-col justify-center items-center py-6 mt-6">
      <div className="w-full md:w-[75%] lg:w-[75%] px-6 ">
        {/* card header */}
        <div className="flex flex-col gap-3 items-center justify-center">
          <motion.div
            initial={{ scaleX: 5, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
            className="bg-[#d6ccfb] px-4 py-1 w-fit   rounded-sm text-[12px] text-[#7353e6] font-semibold"
          >
            <h3 className="px-4 py-1  rounded-sm text-[12px] bg-[#d6ccfb] text-[#7353e6] font-semibold">
              Top Popular Course
            </h3>
          </motion.div>
          <motion.div
            initial={{ scaleX: 5, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
            className="flex flex-col md:flex-row lg:flex-row justify-between w-full"
          >
            <h1 className="text-2xl font-bold capitalize text-center md:text-left lg:text-left">
              Edunity Course can join with us.
            </h1>
            <Button
              btnTitle="Load More Course"
              btnStyle="bg-[#7353e6] text-white "
              link="/#course"
              icon={FaLongArrowAltRight}
            />
          </motion.div>
        </div>
        {/* card compnent */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {fetchedCourse.map((course) => (
            <motion.div
              initial={{ scaleX: 3, animation: "alternate", opacity: 0.5 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "backInOut" }}
              key={course.id}
              className="border-dashed gap-4 px-3 py-5  border-1 rounded-md border-[#7353e6] flex flex-col justify-center"
            >
              <div className="relative w-full aspect-[16/9]">
                <img
                  src={course.thumbnailUrl}
                  alt="courseImg"
                  className=" object-fill w-full h-[200px]  rounded-md "
                />
                <span className="absolute bottom-5 left-5 z-40 text-[11px] text-white capitalize  bg-[#16244d] px-3 py-1 rounded-md  flex items-center">
                  {course?.category?.name || "No category"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-gray-700">
                  ⭐⭐⭐⭐⭐{course.rating}
                </span>
                <span className="text-[11px] font-bold text-[#7353e6]">
                  {course.price}
                </span>
              </div>
              <div className="w-full flex items-center justify-center ">
                <div className="flex w-[95%] justify-between bg-white shadow-2xl text-[11px] text-gray-500 font-bold">
                  <span className="flex justify-center items-center gap-1">
                    <FaBook />
                    Lesson: {course?.lesson?.length}
                  </span>
                  <span className="flex justify-center items-center gap-1">
                    <FaClock /> Duration: {course.duration}
                  </span>
                  <span className="flex justify-center items-center gap-1">
                    <FaPerson />
                    Student:{course?.enroll?.length}
                  </span>
                </div>
              </div>
              <h1 className="text-[14px] w-fit font-semibold capitalize text-gray-800 hover:text-[#7353e6] cursor-pointer">
                {course.title}
              </h1>
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={course?.user?.image}
                    alt="defaultUser"
                    className="object-cover rounded-full h-[30px] w-[30px]"
                  />
                  <span className="text-[12px] text-gray-700 font-semibold">
                    {course?.user?.name}
                  </span>
                </div>
                <Button
                  btnStyle="bg-[#7353e6] text-white"
                  btnTitle="Enrol Now"
                  icon={FaArrowRightLong}
                  link={`/courses/${course.id}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
