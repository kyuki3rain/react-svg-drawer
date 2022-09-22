import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { windowSizeState } from "../states/windowSizeState";

// Hook
export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const setWindowSize = useSetRecoilState(windowSizeState);

  const handleResize = useCallback(() => {
    // Set window width/height to state
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, [setWindowSize]);

  return { handleResize };
}
