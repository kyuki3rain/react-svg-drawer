import { useEffect } from "react";
import { useWindowSize } from "../operators/useWindowSize";

export const useHandleResizeEffect = () => {
  const { handleResize } = useWindowSize();

  useEffect(() => {
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]); // Empty array ensures that effect is only run on mount
};
