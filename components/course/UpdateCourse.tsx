import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import SubmitButton from "../SubmitButton";
import { CatType, InputType } from "@/types";
import { useRouter } from "next/navigation";

interface props {
  id: string;
  onClose: () => void;
  onChange: () => void;
}
const UpdateCourse = ({ id, onClose, onChange }: props) => {
  const [course, setCourse] = useState<InputType | null>();
  const [getCategory, setGetCategory] = useState<CatType[]>([]);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState<File | undefined>();
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState("");
  const [level, setLevel] = useState("");
  const [language, setLanguage] = useState("");
  const [duration, setDuration] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [previewVideoUrl, setPreviewVideoUrl] = useState<File | undefined>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

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

  useEffect(() => {
    if (!id) return;
    const getCourse = async () => {
      const courseData = await fetch(`/api/course/${id}`, {
        method: "GET",
      });
      const result = await courseData.json();
      setCourse(result);
    };

    getCourse();
  }, []);

  useEffect(() => {
    const getCategory = async () => {
      const res = await fetch("/api/category/");
      const result = await res.json();
      setGetCategory(result);
    };
    getCategory();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    let finalThumbnailUrl =
      typeof thumbnailUrl === "string" ? thumbnailUrl : "";
    // let finalPreviewVideoUrl =
    //   typeof previewVideoUrl === "string" ? previewVideoUrl : "";

    if (thumbnailUrl instanceof File) {
      finalThumbnailUrl = await uploadFile(thumbnailUrl);
    }

    // if (previewVideoUrl instanceof File) {
    //   finalPreviewVideoUrl = await uploadFile(previewVideoUrl);
    // }

    try {
      const res = await fetch(`/api/course/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          slug,
          description,
          thumbnailUrl: finalThumbnailUrl,
          isFree,
          price,
          level,
          language,
          duration,
          category_id,
          // previewVideoUrl: finalPreviewVideoUrl,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();

      onClose();
      router.push("/dashboard/course");
      onChange();
    } catch (err) {
      console.log("update error", err);
    }
  };

  useEffect(() => {
    if (course) {
      setTitle(course.title || "");
      setSlug(course.slug || "");
      setDescription(course.description || "");
      setThumbnailUrl(course.thumbnailUrl);
      setIsFree(course.isFree || false);
      setPrice(course.price || "");
      setLevel(course.level || "");
      setLanguage(course.language || "");
      setDuration(course.duration || "");
      setCategory_id(course.category_id || "");
      // setPreviewVideoUrl(course.previewVideoUrl);
    }
  }, [course]);

  return (
    <div>
      <form
        onSubmit={handleUpdate}
        method="POST"
        className="shadow-black shadow-2xl p-10 text-[12px] capitalize bg-white w-full"
      >
        <div className="flex flex-col gap-2">
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
              name="category"
              id="category"
              value={category_id}
              onChange={(e) => setCategory_id(e.target.value)}
              className="border-2 border-gray-200 focus:border-gray-300 focus:shadow-2xl p-1 rounded-sm"
            >
              <option value={category_id}>{category_id}</option>
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
            <div className="flex items-center text-[14px] gap-2 border-2 border-gray-200 px-10 focus:border-gray-300 focus:shadow-2xl rounded-sm ">
              <label htmlFor="isFree">IsFree</label>
              <Input
                type="checkbox"
                id="isFree"
                name="isFree"
                checked={isFree}
                onChange={(e) => setIsFree(e.target.checked)}
                className=""
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
            <div className="flex flex-col">
              <img
                src={thumbnailUrl}
                alt={title}
                className="h-[50px] w-[50px]"
              />
              <Input
                type="file"
                ref={fileInputRef}
                name="thambnailUrl"
                onChange={(e) => setThumbnailUrl(e.target.files?.[0])}
                placeholder="Course thambnailUrl"
              />
            </div>

            {/* <Input
              type="file"
              name="previewVideoUrl"
              onChange={(e) => setPreviewVideoUrl(e.target.files?.[0])}
              placeholder="Course previewVideoUrl"
            /> */}
            <SubmitButton title="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateCourse;
