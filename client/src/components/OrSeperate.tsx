import React from "react";

const OrSeperate: React.FC = () => {
  return (
    <div
      className="w-full flex items-center mb-5 text-xs text-gray-500 font-bold 
             before:content-[''] before:h-[1px] before:flex-1 before:mr-5 before:bg-gray-300
             after:content-['']  after:h-[1px] after:flex-1 after:ml-5 after:bg-gray-300"
    >
      OR
    </div>
  );
};

export default OrSeperate;
