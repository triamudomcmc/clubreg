import {useEffect, useState} from "react";

export const detectOuside = (ref, dep, callback) => {
  useEffect(() => {

    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) && dep) {
        callback()
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, dep]);
}

export function useWindowDimensions() {

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }

  const [windowDimensions, setWindowDimensions] = useState({width: 0, height: 0});

  useEffect(() => {

    setWindowDimensions(getWindowDimensions());

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}