"use client";
import CourseForm from "@/components/course/CourseForm";
import GetCourse from "@/components/course/GetCourse";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";

const NewCourse = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-h-screen  bg-white relative flex flex-col">
      <div className="  m-5 flex justify-end items-end">
        {!isOpen ? (
          <SubmitButton
            title="Add New Course"
            onclick={() => setIsOpen(true)}
          />
        ) : (
          <SubmitButton title="close" onclick={() => setIsOpen(false)} />
        )}
      </div>
      <div className="mt-8">
        <GetCourse />
        {isOpen && (
          <div className=" w-full absolute inset-0 flex justify-center items-center top-20">
            <CourseForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewCourse;
