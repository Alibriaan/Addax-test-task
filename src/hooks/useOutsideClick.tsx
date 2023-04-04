import { useEffect, useState } from "react";

export function useOutsideClick(ref: React.RefObject<HTMLElement>, onClickOutside?: () => void) {
  const [isOutside, setIsOutside] = useState(true);

  const handleMouseEnter = () => {
    setIsOutside(false);
  }

  const handleMouseLeave = () => {
    setIsOutside(true);
  }

  useEffect(() => {
    ref.current?.addEventListener("mouseenter", handleMouseEnter);
    ref.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      ref.current?.removeEventListener("mouseenter", handleMouseEnter);
      ref.current?.removeEventListener("mouseleave", handleMouseLeave);
    }
  }, []);


  useEffect(() => {
    if(isOutside && onClickOutside) {
      window.addEventListener("click", handleClick);
    } else {
      window.removeEventListener("click", handleClick);
    };

    return () => {
      window.removeEventListener("click", handleClick);
    }
  }, [isOutside]);

  const handleClick = () => isOutside && onClickOutside && onClickOutside();

  return { isOutside };
}