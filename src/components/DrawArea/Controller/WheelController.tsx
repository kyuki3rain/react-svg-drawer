import React, { ReactNode, useEffect, useRef } from "react";
import { useMove } from "../../../hooks/useMove";
import { useZoom } from "../../../hooks/useZoom";

type Props = {
  children: ReactNode;
};

const WheelController: React.FC<Props> = ({ children }) => {
  const { zoomIn, zoomOut } = useZoom();
  const { move } = useMove();

  const divref = useRef<HTMLDivElement>(null);

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();

    if (e.ctrlKey) {
      if (e.deltaY < 0) zoomIn(e.clientX, e.clientY);
      else zoomOut(e.clientX, e.clientY);
    } else move(e.deltaX, e.deltaY);
  };

  useEffect(() => {
    divref.current?.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      divref.current?.removeEventListener("wheel", onWheel);
    };
  });

  return <div ref={divref}>{children}</div>;
};

export default WheelController;
