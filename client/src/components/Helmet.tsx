import React, { useEffect } from "react";
import { HelmetProps } from "../utils/interface";

// dynamically change the title of document head
const Helmet: React.FC<HelmetProps> = (props) => {
  useEffect(() => {
    document.title = props.title;
    window.scrollTo(0, 0);
  }, [props.title]);

  return <div className="w-[calc(100%-17.5vw)] h-screen flex flex-col items-center grow">{props.children}</div>;
};

export default Helmet;
