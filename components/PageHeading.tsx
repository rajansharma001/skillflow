import React from "react";

const PageHeading = ({ pageTitle }: { pageTitle: string }) => {
  return (
    <div className="w-full flex justify-center bg-[url(/page.png)] object-cover">
      <div className="w-[75%] flex justify-center items-center py-20">
        <h1 className="text-3xl font-bold text-black">{pageTitle}</h1>
      </div>
    </div>
  );
};

export default PageHeading;
