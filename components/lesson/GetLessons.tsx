import { InputType, Lesson } from "@/types";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import UpdateLesson from "./UpdateLesson";

const GetLessons = () => {
  const [lessonId, setLessonId] = useState("");
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [fetchCourse, setFetchCourse] = useState<InputType[]>([]);
  const [fetchLesson, setFetchLesson] = useState<Lesson[]>([]);
  const getLesson = async () => {
    const res = await fetch("/api/lesson/");
    const result = await res.json();
    setFetchLesson(result);
  };
  useEffect(() => {
    getLesson();
  }, []);

  const handleClosePop = () => {
    setIsUpdateOpen(false);
  };
  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/lesson/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    getLesson();
  };

  const getCourse = async () => {
    const res = await fetch(`/api/course/`);
    const result = await res.json();
    setFetchCourse(result);
  };
  useEffect(() => {
    getCourse();
  }, []);

  const handleTableUpdate = () => {
    getLesson();
  };

  return (
    <div className="w-full relative bg-white">
      <table className="table-auto w-full text-center">
        <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Slug</th>
            <th className="px-4 py-2">courseId</th>
            <th className="px-4 py-2">isFree</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-600">
          {fetchLesson.map((less) => (
            <tr key={less.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{less.id}</td>
              <td className="px-4 py-2">{less.title}</td>
              <td className="px-4 py-2">{less.slug}</td>
              <td className="px-4 py-2">
                {fetchCourse.find((course) => course.id === less.courseId)
                  ?.title || "unknown"}
              </td>
              <td className="px-4 py-2">{less.isFree ? "Free" : "Paid"}</td>

              <td className="px-4 py-2 flex gap-2">
                <button
                  className="py-2 px-5 flex gap-2  justify-center items-center  rounded-[2px] cursor-pointer  bg-red-700 text-white capitalize text-[12px] font-semibold hover:text-white  hover:bg-[#16244d] transition-all transform-3d duration-300 ease-in-out"
                  onClick={() => handleDelete(less.id)}
                >
                  <FiDelete />
                </button>
                <button
                  className="py-2 px-5 flex gap-2  justify-center items-center  rounded-[2px] cursor-pointer  bg-dash-primary text-white capitalize text-[12px] font-semibold hover:text-white  hover:bg-[#16244d] transition-all transform-3d duration-300 ease-in-out"
                  onClick={() => {
                    setIsUpdateOpen(true);
                    setLessonId(less.id);
                  }}
                >
                  <BiEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isUpdateOpen && (
        <div className="absolute top-0 w-full shadow-2xl bg-white ">
          <div className="relative">
            <button
              className=" absolute top-0 right-0 py-2 px-5 flex gap-2  justify-center items-center  rounded-[2px] cursor-pointer  bg-dash-primary text-white capitalize text-[12px] font-semibold hover:text-white  hover:bg-[#16244d] transition-all transform-3d duration-300 ease-in-out"
              onClick={() => {
                setIsUpdateOpen(false);
              }}
            >
              close
            </button>
            <h1>update form</h1>

            <UpdateLesson
              id={lessonId}
              isClosePop={handleClosePop}
              updateLessonTable={handleTableUpdate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GetLessons;
