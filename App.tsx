import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
  ViroMaterials,
  ViroQuad,
  ViroSphere
} from "@reactvision/react-viro";
import React, { useContext, useRef, useState } from "react";
import { TouchableOpacity, Text,View,Button,StyleSheet } from "react-native";

ViroMaterials.createMaterials({
  planeMaterial: {
    diffuseColor: 'rgba(0,0,255,0.5)', // Semi-transparent blue for detected planes
  },
  reddot:{
    diffuseColor:'rgb(255, 0, 0)'
  }
});

//Contexts
const TextContext = React.createContext("");
const StatusContext = React.createContext({
  statusState: { status: "", textcolor: "" },
  setStatusState: (value: { status: string; textcolor: string }) => {},
});
const CamContext = React.createContext({
  camstate:{cameraPosition:[0,0,0],
            cameraRotation:[0,0,0]},
  setcamstate: (_: any) => {},
});

const GridContext = React.createContext

//Contexts


const HelloWorldSceneAR = () => {
  //using contexts

  const { statusState, setStatusState } = useContext(StatusContext);//stores tracked
  const { setcamstate } = useContext(CamContext);
  const camupdate = ({position,rotation,}: {position: [number, number, number];rotation: [number, number, number];}) => {
  if (statusState.status !== "Tracked") return;
  const relposition:[number,number,number]=[position[0]-0,position[1]+0.5,position[2]+1]
  setcamstate({
    cameraPosition: relposition,
    cameraRotation: rotation,
  });
  // console.log(relposition)
  // console.log(rotation)
};
//states

  //--------------------------------------DURING initialisation--------------------------------------------------------
  function onInitialized(state: any, reason: ViroTrackingReason) 
  {
    console.log("onInitialized", state, reason);
    if (statusState.status !== "Tracked" && state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setTimeout(()=>{setStatusState({ status: "Tracked", textcolor: "green" });},100)
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      setTimeout(()=>{setStatusState({ status: "Tracking lost", textcolor: "red" });
                      setcamstate({cameraPosition: [0,0,0],cameraRotation: [0,0,0],});},100)
    }
  }
  //--------------------------------------AFTER initialisation--------------------------------------------------------

  return (
    
    <ViroARScene onTrackingUpdated={onInitialized} onCameraTransformUpdate={camupdate}>
      {statusState.status == "Tracked" && (
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
      position={[0, -0.5, -1]}  // same as quad center
      materials={['reddot']}
    />
    </View>    
    )}
    </ViroARScene>
  );
};
  //----------------------------------------------------------------------------------------------
export default () => {
  const [camstate,setcamstate]=useState({cameraPosition:[0,0,0],cameraRotation:[0,0,0]});
  const [statusState, setStatusState] = useState({
  status: 'Initializing AR..',
  textcolor: 'rgb(94, 110, 0)'
}); //initilises status and status color while initilising

  return (
      <StatusContext.Provider value={{ statusState, setStatusState }}>
        <CamContext.Provider value={{camstate,setcamstate}}>
        <View style={styles.container}>
          <ViroARSceneNavigator
          autofocus={true}
          initialScene={{
            scene: HelloWorldSceneAR,
          }}
          style={styles.f1}
          />  
        <View style={styles.overlay}>
          <View style={styles.statusBox}><Text style={[styles.statusText, { color: 'black'}]}>{camstate.cameraPosition.join(", ")}</Text></View>
          <View style={styles.statusBox}><Text style={[styles.statusText, { color: 'black'}]}>{camstate.cameraRotation.join(", ")}</Text></View>
          <View style={styles.statusBox}><Text style={[styles.statusText, { color: statusState.textcolor }]}>{statusState.status}</Text></View>
              <TouchableOpacity
              style={styles.button}
              onPress={() => {}}>
              <Text style={styles.buttonText}>Start</Text>
              </TouchableOpacity>
          </View>
    </View>
    </CamContext.Provider>
    </StatusContext.Provider>
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
  statusBox: {
  backgroundColor: 'rgb(255, 255, 255)', // translucent white
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 12,
  marginBottom: 10,
},

statusText: {
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
},

});
