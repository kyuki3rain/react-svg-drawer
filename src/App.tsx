import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { RecoilRoot } from "recoil";
import ButtonArea from "./components/ButtonArea";
import DrawArea from "./components/DrawArea";

const App: React.FC = () => (
  <RecoilRoot>
    <CssBaseline />
    <DrawArea />
    <ButtonArea />
  </RecoilRoot>
);

export default App;
