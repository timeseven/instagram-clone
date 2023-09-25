import React, { useEffect } from "react";
import { HelmetProps } from "../utils/interface";

// dynamically change the title of document head
const Helmet: React.FC<HelmetProps> = (props) => {
  useEffect(() => {
    document.title = props.title;
    window.scrollTo(0, 0);
  }, [props.title]);

  return <div className="w-full">{props.children}</div>;
};

export default Helmet;
