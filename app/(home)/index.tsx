import { StyleSheet, BackHandler, ToastAndroid, Pressable, PermissionsAndroid, TouchableOpacity } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { Text, View } from "@/components/Themed";
import { useEffect, useRef, useState } from "react";
import loginHandler from "../../gestures/loginGestures";
import * as FileSystem from "expo-file-system";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { AutoFocus, Camera, CameraType, FlashMode } from "expo-camera";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import { decodeJpeg } from "@tensorflow/tfjs-react-native";
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
  // useEffect(()=>{
  //   (async () => {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //     await Camera.requestMicrophonePermissionsAsync();
  //     // await Camera.useCameraPermissions();
  //     console.log(status);
  //     // console.log(permission);
  //   })();
  // },[])
  const [loadcam,setLoadcam] = useState(false)
  const test =()=>{ (async ()=>{
    if(camera.current){
      try{
        // await camera.current.recordAsync();
        // await Camera.requestCameraPermissionsAsync()
        await camera.current._onCameraReady();
        await camera.current.resumePreview();
        await camera.current.forceUpdate();
        // console.log(camera.current.getSupportedRatiosAsync());
        console.log("Did mount "+camera.current.componentDidMount);
        let picture = await camera.current.takePictureAsync({quality:1,base64:true});
        console.log(picture.uri);
        await classifyImage(picture.uri);
      }
      catch(err){
        console.log(err);
      }
    }
  })()}

  const classifyImage = async (imgUri: string) => {
    try {
      const fileUri = imgUri;
      const imgB64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;
      const newData = new Uint8Array(imgBuffer);
      const imageTensor = decodeJpeg(newData); // transforms byte array into 3d tensor
      if (null != model) {
        const prediction = await model.classify(imageTensor);
        console.info(prediction);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function mango() {
    try {
      await tf.ready();
      let mmodel = await mobilenet.load({ version: 2.0, alpha: 0.5 });
      setModel(mmodel);
      await classifyImage("file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FbeMyEyes-f806a8ca-c77e-416f-962e-a76cc76f0d81/Camera/79635a25-1814-4e97-a793-5d4c24281539.jpg")
    } catch (er) {
      console.log(er);
    }
  }
  useEffect(() => {
    mango();
  }, []);
  const [isConnected, setIsConnected] = useState(false);

  const takepic = Gesture.Tap().numberOfTaps(2).maxDelay(700).onStart(()=>test());
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
          <Pressable onPress={()=>test()}><Text>takepic</Text></Pressable>
          <Text>is camera ready: {(oncameraready)?"true":"flase"}</Text>
          {/* {loadcam && <Camera ref={camera} type={CameraType.back}  focusable={true} focusDepth={1} useCamera2Api={true} ratio="16:9" onCameraReady={()=>setOncameraready(true)} onMountError={(error) => {
            console.log("cammera error", error);
          }} flashMode={FlashMode.torch}>
          </Camera>} */}
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
