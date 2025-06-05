"use client";
import React, { useEffect, useState } from "react";
import SubmitButton from "../SubmitButton";
import { FiDelete } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import { InputType } from "@/types";
import { GrClose } from "react-icons/gr";
import UpdateCourse from "./UpdateCourse";
import Image from "next/image";

interface Props {
  name: string;
  id: string;
}

interface UserProps {
  id: string;
  name: string;
}
const GetCourse = () => {
  const [authorUser, setAuthorUser] = useState<UserProps[]>([]);
  const [fetchCourse, setFetchCourse] = useState<InputType[]>([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [courseCategory, setCourseCategory] = useState<Props[]>([]);

  const handleClose = () => {
    setUpdateModal(false);
  };

  const courseData = async () => {
    const res = await fetch(`/api/course/`, {
      method: "GET",
    });
    const result = await res.json();

    setFetchCourse(result);
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/alluser");
      const result = await res.json();
      setAuthorUser(result);
    };
    getUser();
  }, []);

  useEffect(() => {
    courseData();
  }, []);

  useEffect(() => {
    const getCategory = async () => {
      const res = await fetch("/api/category/");
      const result = await res.json();

      setCourseCategory(result);
    };
    getCategory();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/course/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      setFetchCourse((prev) =>
        prev ? prev.filter((course) => course.id !== id) : prev
      );

      console.log("Course deleted");
    } catch (err) {
      console.log("API ERROR", err);
    }
  };

  return (
    <div className="relative">
      <table className="table-auto w-full text-center ">
        <thead className="bg-gray-100 text-center items-center text-gray-700 text-sm font-semibold">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Slug</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Lessons</th>
            <th className="px-4 py-2">AuthorId</th>
            <th className="px-4 py-2">Thumbnail</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-600  text-center ">
          {fetchCourse.map((course) => (
            <tr key={course.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{course.id}</td>
              <td className="px-4 py-2">{course.title}</td>
              <td className="px-4 py-2">{course.slug}</td>
              <td className="px-4 py-2">{course.price}</td>
              <td className="px-4 py-2">
                {courseCategory.find((cat) => cat.id === course.category_id)
                  ?.name || "Unknown"}
              </td>

              <td className="px-4 py-2">{course.lesson.length}</td>

              <td className="px-4 py-2">
                {authorUser.find((user) => user.id == course.authorId)?.id ||
                  "Unknown"}
              </td>

              <td className="px-4 py-2  ">
                <img
                  src={course.thumbnailUrl}
                  alt="thumbanail"
                  className="h-[50px] w-[50px]"
                />
              </td>

              <td className="px-4 py-2 flex items-center justify-center gap-2">
                <SubmitButton
                  icon={<FiDelete />}
                  title=""
                  onclick={() => handleDelete(course.id)}
                  btnStyle="bg-red-700"
                />

                <button
                  className="py-2 px-5 flex gap-2   rounded-[2px] cursor-pointer  bg-dash-primary text-white capitalize text-[12px] font-semibold hover:text-white  hover:bg-[#16244d] transition-all transform-3d duration-300 ease-in-out"
                  onClick={() => {
                    setUpdateModal(true);
                    setCourseId(course.id);
                  }}
                >
                  <BiEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {updateModal && (
        <div className=" absolute inset-0 top-0 w-full h-screen">
          <div className="relative inset-0 top-0 w-full h-screen">
            <button
              className="absolute  top-0 right-0 py-2 px-5 flex gap-2  justify-center items-center  rounded-[2px] cursor-pointer  bg-dash-primary text-white capitalize text-[12px] font-semibold hover:text-white  hover:bg-[#16244d] transition-all transform-3d duration-300 ease-in-out"
              onClick={() => {
                setUpdateModal(false);
              }}
            >
              <GrClose />
            </button>
            <UpdateCourse
              id={courseId}
              onClose={handleClose}
              onChange={courseData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GetCourse;
