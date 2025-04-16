"use client";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function OptionsMenu({ children, setIsOpen, isOpen }) {
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute top-0 right-0 text-gray-500">
      <div className="flex justify-end">
        <Menu
          ref={buttonRef}
          className="cursor-pointer"
          onClick={(e) => setIsOpen((prev) => !prev)}
        />
      </div>
      {isOpen && (
        <ul
          ref={menuRef}
          className="rounded-md border border-gray-100 text-sm font-semibold shadow-md *:cursor-pointer *:px-4 *:py-2 *:[&:not(:nth-last-child(-n+1))]:border-b *:[&:not(:nth-last-child(-n+1))]:border-gray-200"
        >
          {children}
        </ul>
      )}
    </div>
  );
}

export default OptionsMenu;
