import React from "react";
import FunctionButtons from "../components/ButtonArea/FunctionButtons";
import ModeButtons from "../components/ButtonArea/ModeButtons";
import StyleWindow from "../components/ButtonArea/StyleWindow";

const ButtonArea: React.FC = () => {
  return (
    <div>
      <div
        style={{
          float: "left",
          paddingTop: 5,
          paddingLeft: 5,
          paddingRight: 5,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ModeButtons />
        <FunctionButtons />
      </div>
      <div
        style={{
          float: "right",
          paddingTop: 5,
          paddingLeft: 5,
          paddingRight: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <StyleWindow></StyleWindow>
      </div>
    </div>
  );
};

export default ButtonArea;
