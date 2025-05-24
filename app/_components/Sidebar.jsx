"use client";
import { Menu } from "lucide-react";
import { useState } from "react";

function Sidebar({ data, position, sidebarWidth, toggleButton, className }) {
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
      className={`relative border-gray-300 ${!showSidebar ? "w-18" : sidebarWidth ? sidebarWidth : ""} ${className ? className : ""} ${position === "left" ? "border-r px-6" : ""}`}
    >
      <div className={`flex h-full flex-col ${!showSidebar ? "hidden" : ""}`}>
        <div className="flex-1 overflow-auto">{data}</div>

        {position === "right" && (
          <div className="p-4 text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
            aspernatur, minus est temporibus, tempore, impedit eius aperiam quos
            animi veritatis quaerat omnis! Error ipsam rerum quibusdam
            voluptatum repellendus distinctio nobis!
          </div>
        )}
      </div>
      {data && toggleButton && (
        <div className="absolute top-4 -right-5">
          <button
            className={`cursor-pointer rounded-full border border-gray-500 bg-gray-100 p-2 text-gray-600 hover:border-gray-800 hover:text-gray-800 ${sidebarPosition[position]}`}
            onClick={toggleSidebar}
          >
            {/* {!showSidebar ? "show" : "hide"} */}
            <Menu size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
