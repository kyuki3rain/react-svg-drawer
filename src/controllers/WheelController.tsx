import React, { ReactNode, useEffect, useRef } from "react";
import { useWheelController } from "../operators/useWheelController";

type Props = {
  children: ReactNode;
};

const WheelController: React.FC<Props> = ({ children }) => {
  const { onWheel } = useWheelController();

  const divref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const divrefEffect = divref.current;
    divrefEffect?.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      divrefEffect?.removeEventListener("wheel", onWheel);
    };
  }, [onWheel]);

  return <div ref={divref}>{children}</div>;
};

export default WheelController;
