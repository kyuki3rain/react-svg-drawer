import React from "react";
import FunctionButtons from "./ButtonArea/FunctionButtons";
import ModeButtons from "./ButtonArea/ModeButtons";

const ButtonArea: React.FC = () => {
  return (
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
  );
};

export default ButtonArea;
