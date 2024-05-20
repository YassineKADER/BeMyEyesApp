import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
  
export async function modelLoader(setModel:Function) {
    try {
      await tf.ready();
      let mmodel = await mobilenet.load({ version: 1.0, alpha: 0.5 });
      setModel(mmodel);
      console.log("Model Loaded With success")
    } catch (er) {
      console.log(er);
    }
  }
