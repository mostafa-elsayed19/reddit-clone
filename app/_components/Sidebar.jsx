"use client";
import { useState } from "react";

import Wrapper from "./Wrapper";

function Sidebar({
  subredditsList,
  position,
  sidebarWidth,
  toggleButton,
  className,
}) {
  const [showSidebar, setShowSidebar] = useState(true);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const sidebarPosition = {
    right: "left-0",
    left: "right-0",
  };

  return (
    <div
      className={`bg-white-100 relative ${!showSidebar ? "w-18" : sidebarWidth ? sidebarWidth : ""} ${className ? className : ""}`}
    >
      <div className={`flex flex-col ${!showSidebar ? "hidden" : ""}`}>
        {subredditsList}
        {position === "right" && (
          <div className="self-end p-4 text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
            aspernatur, minus est temporibus, tempore, impedit eius aperiam quos
            animi veritatis quaerat omnis! Error ipsam rerum quibusdam
            voluptatum repellendus distinctio nobis!
          </div>
        )}
      </div>

      {toggleButton && (
        <button
          className={`absolute top-5 cursor-pointer rounded-full border p-2 ${sidebarPosition[position]}`}
          onClick={toggleSidebar}
        >
          {!showSidebar ? "show" : "hide"}
        </button>
      )}
    </div>
  );
}

export default Sidebar;
