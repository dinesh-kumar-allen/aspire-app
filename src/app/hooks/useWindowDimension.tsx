"use client";
import { useEffect, useState } from "react";

// Custom hook for window dimensions
const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState({
      width: typeof window !== "undefined" ? window.innerWidth : 1200,
      height: typeof window !== "undefined" ? window.innerHeight : 800,
    });
  
    useEffect(() => {
      const handleResize = () => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
  
      if (typeof window !== "undefined") {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []);
  
    return windowDimensions;
  };        

export default useWindowDimensions;