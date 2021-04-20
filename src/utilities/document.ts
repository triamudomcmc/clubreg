import {useEffect} from "react";

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