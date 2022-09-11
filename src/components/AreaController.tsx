import KeyController from "../controllers/KeyController";

type Props = {
  children: React.ReactNode;
};

const AreaController: React.FC<Props> = ({ children }) => (
  <KeyController>{children}</KeyController>
);

export default AreaController;
