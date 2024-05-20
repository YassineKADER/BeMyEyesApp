import { Directions, Gesture } from "react-native-gesture-handler";
import { router } from "expo-router";

const redirectToLogin = ()=>{
    router.navigate('(login)/login');
}
//switch from 2 taps with 3 fingers to fling to left with 2 fingers, i found the three fingers taps a little bit laggy
const loginHandler = Gesture.Fling();
loginHandler.direction(Directions.LEFT);
loginHandler.numberOfPointers(2);
loginHandler.onStart(()=>redirectToLogin())

export default loginHandler;