import ClickController from "./Controller/ClickController";
import KeyController from "./Controller/KeyController";
import MouseMoveController from "./Controller/MouseMoveController";
import WheelController from "./Controller/WheelController";

type Props = {
  children: React.ReactNode;
};

const Controller: React.FC<Props> = ({ children }) => (
  <KeyController>
    <WheelController>
      <ClickController>
        <MouseMoveController>{children}</MouseMoveController>
      </ClickController>
    </WheelController>
  </KeyController>
);

export default Controller;
