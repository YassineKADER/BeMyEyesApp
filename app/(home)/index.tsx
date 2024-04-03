import { StyleSheet, BackHandler, ToastAndroid} from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { Text, View} from '@/components/Themed';
import { useEffect } from 'react';
import loginHandler from '../../gestures/loginGestures';


export default function TabOneScreen() {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);



  return (
    <GestureDetector gesture={loginHandler}>
    <View style={styles.container}>
      <Text style={styles.title}>👋 Hey there! If you can read this, you're probably here to help people. Click 7 times to switch to helper mode! 🌟</Text>
    </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width:"80%",
    textAlign:"center",
    fontSize: 18,
    fontWeight: 'normal',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

