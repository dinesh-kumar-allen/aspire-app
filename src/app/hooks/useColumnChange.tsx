"use client";
import { useEffect, useState } from "react";

const useColumnChange = () => {
  const [columns, setColumns] = useState(4);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setColumns(1);
      } else if (window.innerWidth < 1024) {
        setColumns(2);
      } else if (window.innerWidth < 1280) {
        setColumns(3);
      } else if (window.innerWidth < 1536) {
        setColumns(4);
      } else {
        setColumns(4);
      }
      setColumns(window.innerWidth / 300);
    };
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return columns;
};

export default useColumnChange;
