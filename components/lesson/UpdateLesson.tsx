import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import SubmitButton from "../SubmitButton";
import { InputType, Lesson } from "@/types";

interface Props {
  id: string;
  isClosePop: () => void;
  updateLessonTable: () => void;
}
const UpdateLesson = ({ id, isClosePop, updateLessonTable }: Props) => {
  const [fetchCourse, setFetchCourse] = useState<InputType[]>([]);
  const [fetchLesson, setFetchLesson] = useState<Lesson>();

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

  const getCourse = async () => {
    const res = await fetch(`/api/course/`);
    const result = await res.json();
    setFetchCourse(result);
  };

  const handleChange = (e: any) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  useEffect(() => {
    const getLesson = async () => {
      const res = await fetch(`/api/lesson/${id}`, {
        method: "GET",
      });
      const result = await res.json();
      setFetchLesson(result);
    };
    console.log(fetchLesson);
    getLesson();
  }, []);
  useEffect(() => {
    if (fetchLesson) {
      setFormData({
        title: fetchLesson.title || fetchLesson.title || "",
        slug: fetchLesson.slug || "",
        videoUrl: fetchLesson.videoUrl || "",
        videoLength: fetchLesson.videoLength || "",
        courseId: fetchLesson.courseId || "",
        isFree: fetchLesson.isFree || false,
        summary: fetchLesson.summary || "",
        resources: fetchLesson.resources || "",
      });
    }
  }, [fetchLesson]);

  useEffect(() => {
    getCourse();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/lesson/${id}`, {
      method: "PUT",
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

    isClosePop();
    updateLessonTable();
  };

  return (
    <div>
      <div>
        <form onSubmit={handleUpdate} className="space-y-4 max-w-md mx-auto">
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
          <SubmitButton title="Update" />
        </form>
      </div>
    </div>
  );
};

export default UpdateLesson;
