import * as FileSystem from "expo-file-system";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import { decodeJpeg } from "@tensorflow/tfjs-react-native";
export async function classifyImage(imgUri: string|null|undefined, model:mobilenet.MobileNet|null|undefined){
    if(imgUri && model){
     try {
      const fileUri = imgUri;
      const imgB64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;
      const newData = new Uint8Array(imgBuffer);
      const imageTensor = decodeJpeg(newData);
      const prediction = await model.classify(imageTensor);
      return prediction
      
    } catch (error) {
      console.log(error);
      return
    }
    }
    return
}