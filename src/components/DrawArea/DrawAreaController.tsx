import ClickController from "../../controllers/ClickController";
import MouseMoveController from "../../controllers/MouseMoveController";
import WheelController from "../../controllers/WheelController";

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
