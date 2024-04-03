import { StyleSheet } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { Text, View} from '@/components/Themed';

export default function TabOneScreen() {
  return (
    // <GestureDetector>
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
    </View>
    // </GestureDetector>
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

