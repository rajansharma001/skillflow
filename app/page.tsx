import CategoriesCard from "@/components/CategoriesCard";
import CourseCard from "@/components/CourseCard";
import Hero from "@/components/Hero";
import NewsLetter from "@/components/NewsLetter";
import React from "react";

const Home = () => {
  return (
    <div>
      <Hero />
      <CategoriesCard />
      <CourseCard />
      <NewsLetter />
    </div>
  );
};

export default Home;
