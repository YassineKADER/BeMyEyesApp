import { StyleSheet, BackHandler, ToastAndroid } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import loginHandler from "../../gestures/loginGestures";
import * as FileSystem from "expo-file-system";
import * as mobilenet from "@tensorflow-models/mobilenet";

import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import { decodeJpeg } from "@tensorflow/tfjs-react-native";
export default function TabOneScreen() {
  const [model, setModel] = useState<mobilenet.MobileNet>();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);
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
    } catch (er) {
      console.log(er);
    }
  }
  useEffect(() => {
    mango();
  }, []);
  const [isConnected, setIsConnected] = useState(false);

  return (
    <GestureDetector gesture={loginHandler}>
      <View style={styles.container}>
        <Text style={styles.title}>
          👋 Hey there! If you can read this, you're probably here to help
          people. Click 7 times to switch to helper mode! 🌟
        </Text>
        <Text>{model !== null ? "Model Ready !" : ""}</Text>
      </View>
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
