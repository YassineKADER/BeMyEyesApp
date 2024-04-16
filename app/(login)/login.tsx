import { StyleSheet } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { Text, View} from '@/components/Themed';
import { TextInput } from 'react-native';
import { Link } from 'expo-router';

export default function TabOneScreen() {
  return (
    // <GestureDetector>
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder='type here....'></TextInput>
      <Link href="/(login)/signup"><Text>SignUp</Text></Link>
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
  },input: {
    width: "80%",
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    color:'white'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

