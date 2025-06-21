import React, { useState } from "react";
import {
  ViroARSceneNavigator,
} from "@reactvision/react-viro";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import HelloWorldSceneAR from "./components/ARScene.tsx";
import { CamContext,StatusContext } from "./Context/Contexts.tsx";
import { styles } from "./styles/style.tsx";

export default function App() {
  const [camstate, setcamstate] = useState({
    cameraPosition: [0, 0, 0],
    cameraRotation: [0, 0, 0],
  });

  const [statusState, setStatusState] = useState({
    status: "Initializing AR..",
    textcolor: "rgb(94, 110, 0)",
  });

  return (
    <StatusContext.Provider value={{ statusState, setStatusState }}>
      <CamContext.Provider value={{ camstate, setcamstate }}>
        <View style={styles.container}>
          <ViroARSceneNavigator
            autofocus={true}
            initialScene={{ scene: HelloWorldSceneAR }}
            style={styles.f1}
          />
          <View style={styles.overlay}>
            <View style={styles.statusBox}>
              <Text style={styles.statusText}>
                {camstate.cameraPosition.join(", ")}
              </Text>
            </View>
            <View style={styles.statusBox}>
              <Text style={styles.statusText}>
                {camstate.cameraRotation.join(", ")}
              </Text>
            </View>
            <View style={styles.statusBox}>
              <Text style={[styles.statusText, { color: statusState.textcolor }]}>
                {statusState.status}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                // Add plane move logic here later
              }}
            >
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CamContext.Provider>
    </StatusContext.Provider>
  );
}


