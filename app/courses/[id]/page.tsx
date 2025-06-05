"use client";
import SubmitButton from "@/components/SubmitButton";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CourseDetailsById = () => {
  const { data: session } = useSession();
  const currentUserId = session?.user.id;
  const isLoggedIn = session;

  const params = useParams();
  const id = params?.id as string;
  const [fetchCourse, setFetchedCourse] = useState();
  const [courseId, setCourseId] = useState("");
  const [userId, setUserId] = useState("");
  const [isEnroll, setIsEnroll] = useState();

  const getCourse = async () => {
    const res = await fetch(`/api/frontendFetch/${id}`);
    const result = await res.json();
    setFetchedCourse(result);
  };

  const getEnroll = async () => {
    const res = await fetch("/api/enroll/");
    const result = await res.json();
    setIsEnroll(result.getEnroll);
    console.log(result);
  };

  useEffect(() => {
    getEnroll();
  }, []);

  const enroll = isEnroll?.some(
    (enroll: any) =>
      enroll.userId === currentUserId && enroll.courseId === fetchCourse?.id
  );
  useEffect(() => {
    if (id) {
      getCourse();
    }
  }, []);

  useEffect(() => {
    if (fetchCourse) {
      setCourseId(fetchCourse?.id);
      setUserId(fetchCourse?.user?.id);
    }
  }, [fetchCourse]);

  const submitEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseId, userId }),
    });
    const result = await res.json();
  };

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className=" flex">
          {/* <!-- Course Title & Author --> */}
          <div className="mb-6 w-[70%]">
            <h1 className="text-3xl font-bold text-gray-800">
              {fetchCourse?.title}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              By{" "}
              <span className="font-medium text-gray-700">
                {fetchCourse?.user?.name}
              </span>
            </p>
          </div>
          {/* <!-- Course Banner --> */}

          <div className="w-[30%] h-64 bg-gray-200 rounded-xl overflow-hidden mb-8">
            <img
              src={fetchCourse?.thumbnailUrl}
              alt="Course Banner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* <!-- Category, Duration, Lessons --> */}
        <div className="flex flex-wrap gap-4 mb-6">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            {fetchCourse?.category?.name}
          </span>
          <span className="text-sm text-gray-600">
            📘 {fetchCourse?.lesson?.length} Lessons
          </span>
          <span className="text-sm text-gray-600">
            ⏱️ {fetchCourse?.duration}
          </span>
        </div>

        {/* <!-- Course Description --> */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Description
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {fetchCourse?.description}
          </p>
        </div>

        {/* <!-- Lessons List --> */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Lessons</h2>
          <ul className="space-y-3">
            {fetchCourse?.lesson?.map((less) => (
              <li
                key={less.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
              >
                <span className="text-gray-800 font-medium">{less.title}</span>
                <span className="text-gray-500 text-sm">10 min</span>
              </li>
            ))}
          </ul>
        </div>

        {/* <!-- Enrollment Button --> */}
        {!isLoggedIn ? (
          <div>LOGIN TO GET THIS COURSE</div>
        ) : !enroll ? (
          <div className="flex flex-col justify-center items-center">
            <form onSubmit={submitEnroll} method="POST">
              <SubmitButton title="Enroll" />
            </form>
          </div>
        ) : (
          <div className=" ">You are already enrolled</div>
        )}
      </div>
    </div>
  );
};

export default CourseDetailsById;
