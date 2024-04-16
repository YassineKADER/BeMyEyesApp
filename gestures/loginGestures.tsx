import { Gesture } from "react-native-gesture-handler";
import { router } from "expo-router";

const redirectToLogin = ()=>{
    router.navigate('(login)/login');
}

const loginHandler = Gesture.Tap();
loginHandler.numberOfTaps(1);
loginHandler.minPointers(4);
loginHandler.maxDeltaY(800);
loginHandler.onStart(redirectToLogin);

export default loginHandler;