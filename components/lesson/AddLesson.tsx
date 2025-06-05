"use client";
import React, { useEffect, useState } from "react";
import SubmitButton from "../SubmitButton";
import { Input } from "../ui/input";
import { InputType } from "@/types";

interface Props {
  onClosePop: () => void;
}
const AddLesson = ({ onClosePop }: Props) => {
  const closePop = () => {
    onClosePop();
  };

  const [fetchCourse, setFetchCourse] = useState<InputType[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    videoUrl: "",
    videoLength: "",
    courseId: "",
    isFree: false,
    summary: "",
    resources: "",
  });

  const handleChange = (e: any) => {
    const { name, type, value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const getCourse = async () => {
    const res = await fetch(`/api/course/`);
    const result = await res.json();
    setFetchCourse(result);
  };
  useEffect(() => {
    getCourse();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/lesson/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    setFormData({
      title: "",
      slug: "",
      videoUrl: "",
      videoLength: "",
      courseId: "",
      isFree: false,
      summary: "",
      resources: "",
    });
    closePop();
  };

  return (
    <div className="relative w-full p-10 bg-white shadow-2xl">
      AddLesson
      <div className="absolute  top-0 right-0">
        <SubmitButton title="Close" onclick={onClosePop} />
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <Input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="Slug"
          />
          <Input
            type="text"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            placeholder="Video URL"
          />
          <Input
            type="text"
            name="videoLength"
            value={formData.videoLength}
            onChange={handleChange}
            placeholder="Video Length"
          />
          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            className="p-1 border-2 border-gray-100 w-full rounded-md"
          >
            {fetchCourse &&
              fetchCourse.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
          </select>
          <div className="flex items-center space-x-2">
            <label htmlFor="isFree">Free?</label>
            <input
              type="checkbox"
              name="isFree"
              checked={formData.isFree}
              onChange={handleChange}
            />
          </div>
          <Input
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Summary"
          />
          <Input
            name="resources"
            value={formData.resources}
            onChange={handleChange}
            placeholder="Resources (optional)"
          />
          <SubmitButton title="Add Lesson" />
        </form>
      </div>
    </div>
  );
};

export default AddLesson;
