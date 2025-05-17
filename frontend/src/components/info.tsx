import React from "react";
import { IoFilterSharp, IoSearchOutline } from "react-icons/io5";

interface infoProps {
  title: string;
  subTitle: string;
}
const Info = ({ title, subTitle }: infoProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between py-8">
      <div className="mb-6">
        <h1 className="text-4xl font-semibold text-black dark:text-gray-300 mb-2">
          {title}
        </h1>
        <span className="text-gray-600 dark:text-gray-500">{subTitle}</span>
      </div>
      <div className="flex items-center gap-4 md:flex  md:gap-10 2xl:gap-20">
        <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-md p-2">
          <IoSearchOutline  className="text-xl text-gray-600 dark:text-gray-500"/>
          <input type="text" placeholder="Search now ..." className=" bg-transparent outline-none dark:text-gray-500" />
        </div>
        <button className="flex items-center cursor-pointer gap-2 bg-black dark:bg-violet-800 py-2 px-3 rounded text-white" >
          <IoFilterSharp size={18} />
          <span className="text-sm">Filter By</span>
        </button>
      </div>
    </div>
  );
};

export default Info;
