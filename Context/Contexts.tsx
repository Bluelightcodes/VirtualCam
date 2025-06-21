import React from "react";

export const CamContext = React.createContext({
  camstate: { cameraPosition: [0, 0, 0], cameraRotation: [0, 0, 0] },
  setcamstate: (_: any) => {},
});

export const StatusContext = React.createContext({
  statusState: { status: "", textcolor: "" },
  setStatusState: (_: any) => {},
});