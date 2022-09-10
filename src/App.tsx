import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { RecoilRoot } from "recoil";
import DrawArea from "./components/DrawArea";

const App: React.FC = () => (
  <RecoilRoot>
    <CssBaseline />
    <DrawArea />
  </RecoilRoot>
);

export default App;
