import { Gesture } from "react-native-gesture-handler";
import { router } from "expo-router";

const redirectToLogin = ()=>{
    router.navigate('(login)');
}

const loginHandler = Gesture.Tap();
loginHandler.numberOfTaps(7);
loginHandler.maxDeltaY(800);
loginHandler.onStart(redirectToLogin);

export default loginHandler;