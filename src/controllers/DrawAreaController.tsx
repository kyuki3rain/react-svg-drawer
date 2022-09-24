import ClickController from "./DrawAreaController/ClickController";
import MouseMoveController from "./DrawAreaController/MouseMoveController";
import WheelController from "./DrawAreaController/WheelController";

type Props = {
  children: React.ReactNode;
};

const DrawAreaController: React.FC<Props> = ({ children }) => (
  <WheelController>
    <ClickController>
      <MouseMoveController>{children}</MouseMoveController>
    </ClickController>
  </WheelController>
);

export default DrawAreaController;
