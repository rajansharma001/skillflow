"use client";
import AddLesson from "@/components/lesson/AddLesson";
import GetLessons from "@/components/lesson/GetLessons";
import SubmitButton from "@/components/SubmitButton";
import React, { useState } from "react";

const Lesson = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleAddPop = () => {
    setIsAddOpen(true);
  };
  const handleClosePop = () => {
    setIsAddOpen(false);
  };

  return (
    <div className="relative w-full h-screen flex flex-col ">
      <div className="absolute right-0 top-5 ">
        {isAddOpen ? null : (
          <SubmitButton title="Add new Lesson" onclick={handleAddPop} />
        )}
      </div>

      <div className="w-full z-10 absolute  top-5 ">
        {isAddOpen && <AddLesson onClosePop={handleClosePop} />}
      </div>

      <div className="w-full mt-15">
        <h1>Lesson details</h1>
        <GetLessons />
      </div>
    </div>
  );
};

export default Lesson;
