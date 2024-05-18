import { StyleSheet, BackHandler, ToastAndroid, Pressable, PermissionsAndroid, TouchableOpacity, Image } from "react-native";
import { GestureDetector, Gesture, Directions } from "react-native-gesture-handler";
import { Text, View } from "@/components/Themed";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { takePicture } from "@/utils/takePicture";
import loginHandler from "@/gestures/loginGestures";
import { classifyImageApi, processAudio } from "@/utils/classifyImages";
import * as Speech from 'expo-speech';
import { Audio } from "expo-av";
import { AndroidAudioEncoder, AndroidOutputFormat, IOSOutputFormat, Recording } from "expo-av/build/Audio";
import { FlingGesture } from "react-native-gesture-handler/lib/typescript/handlers/gestures/flingGesture";
import * as FileSystem from 'expo-file-system';
import LottieView from 'lottie-react-native';

export default function TabOneScreen() {
  const [recording, setRecording] = useState<Recording>()
  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      // const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
      const { recording } = await Audio.Recording.createAsync({
        ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
        android: {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY.android,
          sampleRate: 16000,
        },
        ios: {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY.ios,
          sampleRate: 16000,
        },
        web: {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY.web,
        },
      });
      setRecording(recording)
      console.log("start recording...")
    } catch (err) {
      console.log(err)
    }
  }
  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording?.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording?.getURI();
    if (uri) {
      const da = await processAudio(uri)
      console.log(da)
      speak(da)
    }
    console.log('Recording stopped and stored at', uri);
  }
  const camera = useRef<Camera>(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speak = (text: string) => {
    setIsSpeaking(true)
    Speech.speak(text, { language: "en-US", onDone: () => setIsSpeaking(false), onStopped: () => setIsSpeaking(false) });
  }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await Camera.requestMicrophonePermissionsAsync();
      console.log(status);
    })();
  }, [])
  const [loadcam, setLoadcam] = useState(false)
  const takepic = Gesture.Tap().minPointers(1).numberOfTaps(1).maxDelay(300).onStart(() => { takePicture(camera, permission).then((s) => { console.log(s); classifyImageApi(s, "").then((ss) => { console.log(ss); (ss) ? speak(ss) : console.log(ss) }) }) });
  const takepicvision = Gesture.Fling().direction(Directions.UP).onStart(() => { takePicture(camera, permission).then((s) => { console.log(s); classifyImageApi(s, "/vision").then((ss) => { console.log(ss); (ss) ? speak(ss) : console.log(ss) }) }) });
  const longPressGesture = Gesture.LongPress().minDuration(1000)
    .onStart(startRecording)
    .onFinalize(stopRecording);
  const composed = Gesture.Race(takepic, takepicvision, longPressGesture);
  const [oncameraready, setOncameraready] = useState(false);
  const animation = useRef(null)
  return (
    <GestureDetector gesture={composed}>
      <Camera style={{ flex: 1 }} ref={camera}>
        <View style={styles.container}>
          <Image source={require("../../assets/images/logo.png")}
            style={{ height: 100, margin: 5 }}
          ></Image>
          {isSpeaking && <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 200,
              height: 200,
            }}
            source={require('../../assets/animation.json')}
          />}
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
  }, camera: {
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
