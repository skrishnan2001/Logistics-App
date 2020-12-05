import React, { useState } from 'react';
import {
  StyleSheet, Text,
  View, TextInput,
  TouchableOpacity
} from 'react-native';

export default function SignUp() {
  const [setName, nextName] = useState("");
  const [setPhone, newPhone] = useState("");
  const [setEmail, newEmail] = useState("");
  const [address, nextAddress] = useState("");
  const [setPassword, nextPassword] = useState("");
  const [setConfirm, nextConfirmPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Sign Up</Text>

      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Name..."
          placeholderTextColor="#003f5c"
          onChangeText={text => nextName(text)} />
      </View>

      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Mobile no..."
          keyboardType='numeric'
          maxLength={10}
          placeholderTextColor="#003f5c"
          onChangeText={text => newPhone(text)} />
      </View>

      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Email ID..."
          placeholderTextColor="#003f5c"
          onChangeText={text => newEmail(text)} />
      </View>

      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Address..."
          placeholderTextColor="#003f5c"
          multiline
          onChangeText={text => nextAddress(text)} />
      </View>

      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          secureTextEntry
          onChangeText={text => nextPassword(text)} />
      </View>

      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Confirm password..."
          placeholderTextColor="#003f5c"
          secureTextEntry
          onChangeText={text => nextConfirmPassword(text)} />
      </View>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    fontSize: 18,
    color: "white"
  },
  loginText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
});
