import { StyleSheet } from "react-native/Libraries/StyleSheet/StyleSheet";

export const styles = StyleSheet.create({
  f1: { flex: 1 },
  container: { flex: 1 },
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
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  statusBox: {
    backgroundColor: "rgb(255, 255, 255)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 10,
  },
  statusText: {
    color:'black',
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});