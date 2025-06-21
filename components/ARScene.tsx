import React, { useContext } from "react";
import {
  ViroARScene,
  ViroTrackingReason,
  ViroTrackingStateConstants,
  ViroQuad,
  ViroSphere,
  ViroMaterials,
} from "@reactvision/react-viro";
import { View } from "react-native";
import {StatusContext,CamContext } from "../Context/Contexts.tsx";

ViroMaterials.createMaterials({
  planeMaterial: {
    diffuseColor: "rgba(0,0,255,0.5)",
  },
  reddot: {
    diffuseColor: "rgb(255, 0, 0)",
  },
});

const HelloWorldSceneAR = () => {
  const { statusState, setStatusState } = useContext(StatusContext);
  const { setcamstate } = useContext(CamContext);

  const camupdate = ({
    position,
    rotation,
  }: {
    position: [number, number, number];
    rotation: [number, number, number];
  }) => {
    if (statusState.status !== "Tracked") return;
    const relposition: [number, number, number] = [
      position[0],
      position[1] + 0.5,
      position[2] + 1,
    ];
    setcamstate({ cameraPosition: relposition, cameraRotation: rotation });
  };

  function onInitialized(state: any, reason: ViroTrackingReason) {
    if (
      statusState.status !== "Tracked" &&
      state === ViroTrackingStateConstants.TRACKING_NORMAL
    ) {
      setTimeout(
        () => setStatusState({ status: "Tracked", textcolor: "green" }),
        100
      );
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      setTimeout(() => {
        setStatusState({ status: "Tracking lost", textcolor: "red" });
        setcamstate({
          cameraPosition: [0, 0, 0],
          cameraRotation: [0, 0, 0],
        });
      }, 100);
    }
  }

  return (
    <ViroARScene
      onTrackingUpdated={onInitialized}
      onCameraTransformUpdate={camupdate}
    >
      {statusState.status === "Tracked" && (
        <View>
          <ViroQuad
            position={[0, -0.5, -1]}
            rotation={[-90, 0, 0]}
            width={1}
            height={1}
            materials={["planeMaterial"]}
          />
          <ViroSphere
            radius={0.01}
            position={[0, -0.5, -1]}
            materials={["reddot"]}
          />
        </View>
      )}
    </ViroARScene>
  );
};

export default HelloWorldSceneAR;
