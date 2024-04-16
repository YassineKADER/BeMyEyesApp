import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image, ScrollView } from "react-native";

export default function LoginScreen() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ height: 100, margin:5}} 
        />
        <Text style={styles.title}>SignIn</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="gray"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry
        />
        <Link href="/(login)/signup" style={styles.text}>
          <Text>New here? Sign up!</Text>
        </Link>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continue With Google</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: "black",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  text: {
    textAlign: "left",
    width: "80%",
    marginLeft: 10,
  },
});
