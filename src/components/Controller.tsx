import ClickController from "./Controller/ClickController";
import MouseMoveController from "./Controller/MouseMoveController";
import WheelController from "./Controller/WheelController";

type Props = {
  children: React.ReactNode;
};

const Controller: React.FC<Props> = ({ children }) => (
  <WheelController>
    <ClickController>
      <MouseMoveController>{children}</MouseMoveController>
    </ClickController>
  </WheelController>
);

export default Controller;
