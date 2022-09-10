import React from "react";
import { RecoilRoot } from "recoil";
import DrawArea from "./components/DrawArea";

const App: React.FC = () => (
  <RecoilRoot>
    <DrawArea />
  </RecoilRoot>
);

export default App;
