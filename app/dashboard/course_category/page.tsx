"use client";

import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FaDeleteLeft } from "react-icons/fa6";
import { GrClose } from "react-icons/gr";
import { RiDeleteBinFill } from "react-icons/ri";

interface CategoryType {
  id: string;
  name: string;
  slug: string;
}

const Category = () => {
  const [editCat, setEditCat] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isMessage, setIsMessage] = useState(true);
  const [success, setSuccess] = useState("");
  const [cat_name, setCatName] = useState("");
  const [cat_slug, setCatSlug] = useState("");
  //   fetch category
  const [getCat, setGetCat] = useState<CategoryType[] | null>([]);

  const FetchCategory = async () => {
    const res = await fetch("/api/category");
    const result = await res.json();
    setGetCat(result);
  };
  const handleUpdate = async (id: string, e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`/api/category/${id}`, {
        method: "PUT",
        body: JSON.stringify({ editCat, editSlug }),
      });
      const result = await res.json();
      console.log(result);
      setSuccess("Category updated successfully");
      await FetchCategory();
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cat_name, cat_slug }),
      });
      const result = await res.json();
      console.log(result);

      if (!res.ok) {
        console.log("Something went wrong:", result.error || result.message);
        return;
      }
      setCatName("");
      setCatSlug("");
      setSuccess("Category added successfully");

      await FetchCategory();
    } catch (err) {
      setError("Something went wrong.");
      console.log("Something went wrong", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/category/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!res.ok) throw new Error("Deletion failed");

      setGetCat((prev) => prev?.filter((cat) => cat.id !== id) || []);
      setIsPopOpen(false);
      setDeleteId(null);
      setSuccess("Category deleted successfully");
    } catch (error) {
      console.log("api error");
      setError("Something went wrong.");
    }
  };

  useEffect(() => {
    FetchCategory();
  }, []);
  useEffect(() => {
    if (error || success) {
      setIsMessage(false);
      const timer = setTimeout(() => {
        setIsMessage(true);
        setError("");
        setSuccess("");
      }, 3000); // 3 seconds is more user-friendly

      return () => clearTimeout(timer); // Clean up on unmount or before next run
    }
  }, [error, success]);
  return (
    <div className="relative flex w-full flex-col justify-center items-center mt-5 bg-white rounded-md shadow-2xl ">
      <h1 className="text-xl font-semibold capitalize mt-3">
        Manage Course Category
      </h1>
      <form
        onSubmit={handleSubmit}
        className="py-3 w-full flex flex-col items-center justify-center  "
      >
        <div className="flex w-[50%] flex-col gap-3 text-[12px]">
          <input
            type="text"
            name="cat_name"
            value={cat_name}
            onChange={(e) => setCatName(e.target.value)}
            placeholder="New Category Name"
            className=" ring-1  ring-dash-primary focus:border-none focus:ring-2 p-2 rounded-[2px]"
          />
          <input
            type="text"
            name="cat_slug"
            value={cat_slug}
            onChange={(e) => setCatSlug(e.target.value)}
            placeholder="Type Category Slug"
            className="ring-1  ring-dash-primary focus:border-none focus:ring-2 p-2 rounded-[2px]"
          />
          <button
            type="submit"
            className="py-2 px-5 flex gap-2  justify-center items-center  rounded-[2px] cursor-pointer  bg-dash-primary text-white capitalize text-[12px] font-semibold hover:text-white  hover:bg-[#16244d] transition-all transform-3d duration-300 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="mt-5 bg-white rounded-md shadow-2xl p-6 w-full">
        {!isMessage && (error || success) && (
          <div
            className={`p-2 w-full  text-white text-[12px] text-center rounded-sm mt-2 font-semibold ${
              error ? "bg-red-700" : "bg-green-700"
            }`}
          >
            {error || success}
          </div>
        )}

        <table className="table-auto border w-full text-[12px] mt-2 scroll-auto">
          <thead>
            <tr>
              <th className="border p-1">S.No.</th>
              <th className="border">Category Name</th>
              <th className="border">Category Slug</th>
              <th className="border">Action</th>
            </tr>
          </thead>
          <tbody>
            {getCat &&
              getCat.map((cat, index) => (
                <tr key={cat.id} className="text-center">
                  <td className="border  p-1">{index + 1}</td>
                  <td className="border">{cat.name}</td>
                  <td className="border">{cat.slug}</td>
                  <td>
                    <div className="flex border justify-center items-center gap-1 p-1 text-white">
                      <button
                        onClick={() => {
                          {
                            setIsUpdatePopupOpen(true);
                            setEditId(cat.id);
                            setEditCat(cat.name);
                            setEditSlug(cat.slug);
                          }
                        }}
                        className="py-2 px-5 flex gap-2  justify-center items-center  rounded-[2px] cursor-pointer  bg-dash-primary capitalize text-[12px] font-semibold hover:bg-[#16244d] transition-all transform-3d duration-300 ease-in"
                      >
                        <BiEdit />
                      </button>
                      <button
                        onClick={() => {
                          setIsPopOpen(true);
                          setDeleteId(cat.id);
                        }}
                        className="py-2 px-5 flex gap-2  justify-center items-center  rounded-[2px] cursor-pointer  bg-red-700  capitalize text-[12px] font-semibold hover:bg-[#16244d] transition-all transform-3d duration-300 ease-in"
                      >
                        <FaDeleteLeft />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* popup warning */}
      {isPopOpen && (
        <div className="p-10 gap-3 bg-white absolute top-50 rounded-md shadow-red-500 z-40 w-[30%] shadow-2xl flex flex-col items-center justify-center">
          <RiDeleteBinFill size={65} className="text-red-700" />
          <h1 className="text-2xl capitalize font-bold ">Are you sure?</h1>
          <p className="text-[12px] capitalize font-semibold -mt-3">
            You want to delete
          </p>

          <div className="w-[80%] flex justify-between">
            <button
              onClick={() => setIsPopOpen(false)}
              className="py-2 px-5 flex gap-2  justify-center items-center  rounded-[2px] cursor-pointer  bg-gray-400 text-white capitalize text-[12px] font-semibold hover:text-white  hover:bg-[#16244d] transition-all duration-300 ease-in"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (deleteId) handleDelete(deleteId);
              }}
              className="py-2 px-5 flex gap-2  justify-center items-center  rounded-[2px] cursor-pointer  bg-red-700 text-white capitalize text-[12px] font-semibold hover:text-white  hover:bg-[#16244d] transition-all duration-300 ease-in"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* popuop for update */}
      {isUpdatePopupOpen && (
        <div className="w-full py-10 absolute top-0 z-40 h-screen flex items-center justify-center backdrop-blur-[2px]">
          <form
            onSubmit={(e) => {
              if (editId) handleUpdate(editId, e);
              setEditCat("");
              setEditSlug("");
              setIsUpdatePopupOpen(false);
            }}
            className="py-6 flex w-[50%]  absolute z-50 top-50 flex-col items-center justify-center  bg-white shadow-2xl shadow-dash-primary"
          >
            <button
              onClick={() => setIsUpdatePopupOpen(false)}
              className="py-2 absolute top-3 right-3 z-50 px-5 flex gap-2  justify-center items-center  rounded-[2px] cursor-pointer  bg-dash-primary text-white capitalize text-[12px] font-semibold hover:text-white  hover:bg-[#16244d] transition-all transform-3d duration-300 ease-in-out"
            >
              <GrClose />
            </button>
            <h1 className="text-xl font-semibold text-[14px] w-full text-center flex items-center justify-center py-2 gap-1  mt-3 capitalize">
              you are updating the category:{" "}
              <p className="text-dash-primary">{editCat}</p>
            </h1>
            <div className="flex flex-col gap-3 text-[12px] w-[80%]">
              <input
                type="text"
                name="edit_cat_name"
                value={editCat}
                onChange={(e) => setEditCat(e.target.value)}
                placeholder="New Category Name"
                className=" ring-1  ring-dash-primary focus:border-none focus:ring-2 p-2 rounded-[2px]"
              />
              <input
                type="text"
                name="edit_cat_slug"
                value={editSlug}
                onChange={(e) => setEditSlug(e.target.value)}
                placeholder="Type Category Slug"
                className="ring-1  ring-dash-primary focus:border-none focus:ring-2 p-2 rounded-[2px]"
              />
              <button
                type="submit"
                className="py-2 px-5 flex gap-2  justify-center items-center  rounded-[2px] cursor-pointer  bg-dash-primary text-white capitalize text-[12px] font-semibold hover:text-white  hover:bg-[#16244d] transition-all transform-3d duration-300 ease-in-out"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Category;
