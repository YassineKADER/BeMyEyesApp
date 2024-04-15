import { StyleSheet, BackHandler, ToastAndroid, Pressable, PermissionsAndroid, TouchableOpacity } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { Text, View } from "@/components/Themed";
import { useEffect, useRef, useState } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { Camera} from "expo-camera";
import "@tensorflow/tfjs-react-native";
import { modelLoader } from "@/utils/modelLoader";
import { takePicture } from "@/utils/takePicture";
import { classifyImage } from "@/utils/calessifyImages";
export default function TabOneScreen() {
  const camera = useRef<Camera>(null);
  const [model, setModel] = useState<mobilenet.MobileNet>();
  const [permission, requestPermission] = Camera.useCameraPermissions();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);
  useEffect(()=>{
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await Camera.requestMicrophonePermissionsAsync();
      console.log(status);
    })();
  },[])
  const [loadcam,setLoadcam] = useState(false)
  useEffect(() => {
  modelLoader(setModel);
  }, []);

  const takepic = Gesture.Tap().numberOfTaps(2).maxDelay(700).onStart(()=>{takePicture(camera,permission).then((s)=>classifyImage(s,model).then((ss)=>{(ss)?ToastAndroid.show(ss.toString()+"",230):console.log(ss)}))});
  const [oncameraready, setOncameraready] = useState(false);
  return (
    <GestureDetector gesture={takepic}>
      <Camera style={{flex:1}} ref={camera}>
        <View style={styles.container}>
          <Text style={styles.title}>
            👋 Hey there! If you can read this, you're probably here to help
            people. Click 7 times to switch to helper mode! 🌟
          </Text>
          <Text>{model !== null ? "Model Ready !" : ""}</Text>
          <Pressable onPress={()=>takePicture(camera, permission)}><Text>takepic</Text></Pressable>
          <Text>is camera ready: {(oncameraready)?"true":"flase"}</Text>
         <Pressable onPress={()=>{setLoadcam(true);console.log(camera.current?.componentDidMount)}}><Text>loadcam</Text></Pressable>
        </View>
        </Camera>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    width: "80%",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "normal",
  },  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
