import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
  ViroMaterials
} from "@reactvision/react-viro";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text,View,Button,StyleSheet } from "react-native";

ViroMaterials.createMaterials({
  planeMaterial: {
    diffuseColor: 'rgba(0,0,255,0.5)', // Semi-transparent blue for detected planes
  },
  selectedPlaneMaterial: {
    diffuseColor: 'rgba(0,255,0,0.7)', // Semi-transparent green for selected plane
  },
  placedObjectMaterial: {
    diffuseColor: '#FF0000', // Red for the placed object
  },
});

const TextContext = React.createContext("");

const HelloWorldSceneAR = () => {
  const [text, setText] = useState("Initializing AR...");
  const message = React.useContext(TextContext);

  const [planes, detectedplaneadder]=useState({});//identifies different planes
  const [selectedplaneid, setplane]=useState(null);//for selecting plane
  const [objectposition, setdobjectposition]=useState(null); //for setting obect position

  //--------------------------------------DURING initialisation--------------------------------------------------------
  function onInitialized(state: any, reason: ViroTrackingReason) 
  {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      //setText(props.message);
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      //setText("Tracking lost");
    }
  }
  //--------------------------------------AFTER initialisation--------------------------------------------------------
  useEffect(() => {setText(message);}, [message]);

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
  //----------------------------------------------------------------------------------------------
export default () => {
  const [textbox,settextbox]=useState('Placeholder');
  return (
    <TextContext.Provider value={textbox}>
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
      <Text style={styles.buttonText}>{'Start'}</Text>
    </TouchableOpacity>
      </View>
    </View>
    </TextContext.Provider>
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
