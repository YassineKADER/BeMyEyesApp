import { StyleSheet, BackHandler, ToastAndroid, Pressable, PermissionsAndroid, TouchableOpacity } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { Text, View } from "@/components/Themed";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { takePicture } from "@/utils/takePicture";
import loginHandler from "@/gestures/loginGestures";
import { classifyImageApi } from "@/utils/classifyImages";
import * as Speech from 'expo-speech';
import { Audio } from "expo-av";
import { AndroidAudioEncoder, AndroidOutputFormat, IOSOutputFormat, Recording } from "expo-av/build/Audio";




export default function TabOneScreen() {
  const [recording, setRecording] = useState<Recording>()
  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      const { recording } = await Audio.Recording.createAsync({
        isMeteringEnabled: true,
        android: {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY.android,
          extension: ".wav",
          outputFormat: AndroidOutputFormat.DEFAULT,
          audioEncoder: AndroidAudioEncoder.DEFAULT,
          sampleRate: 16000
        }, ios: {
          ...Audio.RecordingOptionsPresets.HIGH_QUALITY.ios,
          extension: '.wav',
          outputFormat: IOSOutputFormat.LINEARPCM,
        },
        web: {
          mimeType: 'audio/wav',
          bitsPerSecond: 128000,
        },
      })
      setRecording(recording)
      console.log("start recording...")
    } catch (err) {
      console.log(err)
    }
  }
  async function stopRecording() {
    console.log('Stopping recording..');
    // setRecording(undefined);
    await recording?.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording?.getURI();
    console.log('Recording stopped and stored at', uri);
  }
  const camera = useRef<Camera>(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const speak = (text: string) => {
    Speech.speak(text, { language: "english" });
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
  const takepic = Gesture.Tap().minPointers(1).numberOfTaps(1).maxDelay(700).onStart(() => { takePicture(camera, permission).then((s) => { console.log(s); classifyImageApi(s).then((ss) => { console.log(ss); (ss) ? speak(ss) : console.log(ss) }) }) });
  const longPressGesture = Gesture.LongPress()
    .onStart(startRecording)
    .onFinalize(stopRecording);
  const composed = Gesture.Race(takepic, loginHandler, longPressGesture);
  const [oncameraready, setOncameraready] = useState(false);
  return (
    <GestureDetector gesture={composed}>
      <Camera style={{ flex: 1 }} ref={camera}>
        <View style={styles.container}>
          <Text style={styles.title}>
            👋 Hey there! If you can read this, you're probably here to help
            people. Click 7 times to switch to helper mode! 🌟
          </Text>
          <Text>is camera ready: {(oncameraready) ? "true" : "flase"}</Text>
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
