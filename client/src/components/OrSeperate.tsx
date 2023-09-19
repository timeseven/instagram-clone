import React from "react";

const OrSeperate: React.FC = () => {
  return (
    <span
      className="relative mb-5 text-xs text-gray-500 font-bold 
             before:content-[''] before:absolute before:bg-gray-300 before:w-2/5 before:h-[1px] before:top-1/2 before:-translate-y-1/2 before:left-0
             after:content-[''] after:absolute after:bg-gray-300 after:w-2/5 after:h-[1px] after:top-1/2 after:-translate-y-1/2 after:right-0"
    >
      OR
    </span>
  );
};

export default OrSeperate;
