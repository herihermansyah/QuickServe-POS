import React from "react";
import {AiOutlineLoading3Quarters} from "react-icons/ai";

const Loading = () => {
  return (
    <div className="h-full flex items-center justify-center text-gray-300 animate-spin">
      <AiOutlineLoading3Quarters size={40} />
    </div>
  );
};

export default Loading;
