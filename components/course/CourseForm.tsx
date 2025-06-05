import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import SubmitButton from "../SubmitButton";
import { CatType } from "@/types";

const CourseForm = () => {
  const [getCategory, setGetCategory] = useState<CatType[]>([]);
  const [isMessage, setIsMessage] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState<File | undefined>();
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState("");
  const [level, setLevel] = useState("");
  const [language, setLanguage] = useState("");
  const [duration, setDuration] = useState("");
  // const [previewVideoUrl, setPreviewVideoUrl] = useState<File | undefined>();
  const [category_id, setCategory_id] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const getCategory = async () => {
      const res = await fetch("/api/category/");
      const result = await res.json();
      setGetCategory(result);
    };
    getCategory();
  }, []);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/course/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!thumbnailUrl) return;

    setIsUploading(true);
    try {
      const thumbnailUploadedUrl = await uploadFile(thumbnailUrl);
      // const previewVideoUploadedUrl = await uploadFile(previewVideoUrl);
      // if (!previewVideoUploadedUrl) {
      //   setError("Preview video upload failed.");
      //   setIsMessage(true);
      //   return;
      // }

      const data = new FormData();
      data.set("title", title);
      data.set("slug", slug);
      data.set("description", description);
      data.set("thumbnailUrl", thumbnailUploadedUrl);
      data.set("isFree", isFree.toString());
      data.set("price", price);
      data.set("level", level);
      data.set("language", language);
      data.set("duration", duration);
      data.set("category_id", category_id);
      // data.set("previewVideoUrl", previewVideoUploadedUrl);

      const res = await fetch("/api/course/", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      setError("");
      setSuccess("Course added successfully");

      setTitle("");
      setSlug("");
      setDescription("");
      setPrice("");
      setLevel("");
      setLanguage("");
      setDuration("");
      setThumbnailUrl(undefined);
      // setPreviewVideoUrl(undefined);
      if (fileInputRef.current) fileInputRef.current.value = "";

      setIsMessage(true);
      setTimeout(() => setIsMessage(false), 3000);
    } catch (error) {
      setError("Course Submission API Error");
      setSuccess("");
      setIsMessage(true);
      setTimeout(() => setIsMessage(false), 3000);
    }
    setIsUploading(false);
  };

  return (
    <div className="w-full absolute top-0 z-40 h-screen flex flex-col items-center justify-center backdrop-blur-[2px]">
      <div className="flex flex-col items-center justify-center shadow-2xl">
        {isMessage && (error || success) && (
          <div className="p-2 w-full bg-green-400 capitalize text-[12px] text-white font-semibold text-center">
            {error || success}
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        method="POST"
        className="relative shadow-black shadow-2xl p-10 text-[12px] capitalize bg-white w-full max-w-4xl"
      >
        {/* Loader Overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
            <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <div className="flex flex-col gap-2 opacity-100">
          <div className="flex gap-2">
            <Input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Course title"
            />
            <Input
              type="text"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Course slug"
            />
            <select
              name="category_id"
              id="category_id"
              value={category_id}
              onChange={(e) => setCategory_id(e.target.value)}
              className="border-2 border-gray-200 focus:border-gray-300 focus:shadow-2xl p-1 rounded-sm"
            >
              <option value="">Select a category</option>
              {getCategory.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <Input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Course description"
            />
            <div className="flex items-center text-[14px] gap-2 border-2 border-gray-200 px-10 focus:border-gray-300 focus:shadow-2xl rounded-sm">
              <label htmlFor="isFree">IsFree</label>
              <Input
                type="checkbox"
                id="isFree"
                name="isFree"
                checked={isFree}
                onChange={(e) => setIsFree(e.target.checked)}
              />
            </div>
            <Input
              type="text"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Course price"
            />
          </div>

          <div className="flex gap-2">
            <Input
              type="text"
              name="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              placeholder="Course level"
            />
            <Input
              type="text"
              name="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="Course language"
            />
            <Input
              type="text"
              name="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Course duration"
            />
          </div>

          <div className="flex gap-2">
            <Input
              ref={fileInputRef}
              type="file"
              name="thumbnailUrl"
              onChange={(e) => setThumbnailUrl(e.target.files?.[0])}
            />
            {/* <Input
              type="file"
              name="previewVideoUrl"
              onChange={(e) => setPreviewVideoUrl(e.target.files?.[0])}
            /> */}
            <SubmitButton title="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
