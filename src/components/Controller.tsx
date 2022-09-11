import ClickController from "./Controller/ClickController";
import WheelController from "./Controller/WheelController";

type Props = {
  children: React.ReactNode;
};

const Controller: React.FC<Props> = ({ children }) => (
  <WheelController>
    <ClickController>{children}</ClickController>
  </WheelController>
);

export default Controller;
