import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";
import React, { useState } from "react";
import { TouchableOpacity, Text,View,Button,StyleSheet } from "react-native";

const HelloWorldSceneAR = () => {

  const [text, setText] = useState("Initializing AR...");

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Hello World!");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      setText("Nigga?");
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />
    </ViroARScene>
  );
};

export default () => {
  const [textbox,settextbox]=useState('Placefolder');
  return (
    <View style={styles.container}>

    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
    <View style={styles.overlay}>
      <Text style={{bottom:50}}>{textbox}</Text>
          <TouchableOpacity style={styles.button} onPress={() => settextbox("Button Was Clicked!")}>
      <Text style={styles.buttonText}>{'RESET'}</Text>
    </TouchableOpacity>
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
  container:{
    flex: 1,
  },
  overlay: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
    button: {
    backgroundColor: "white",
    width: 70,
    height: 70,
    borderRadius: 35, // Half of width/height
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // For Android shadow
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },

});
