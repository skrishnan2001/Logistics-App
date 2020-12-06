import React, { useState } from 'react';
import {
  StyleSheet, Text,
  View, TextInput,
  TouchableOpacity, ScrollView
} from 'react-native';

export default function SignUp() {
  const [setName, nextName] = useState("");
  const [setPhone, newPhone] = useState("");
  const [setEmail, newEmail] = useState("");
  const [address, nextAddress] = useState("");
  const [setPassword, nextPassword] = useState("");
  const [setConfirm, nextConfirmPassword] = useState("");

  const [nameState, newNameState] = useState("");
  const [phoneState, newPhoneState] = useState("");
  const [emailState, newEmailState] = useState("");
  const [passwordState, newPasswordState] = useState("");
  const [confirmState, newConfirmState] = useState("");
  const [addressState, newAddressState] = useState("");

  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const validate = () => {
    if (setName == "" || setPhone == "" || setEmail == "" ||
      setPassword == "" || setConfirm == "" || address == "") {
      if (setEmail == "") {
        newEmailState("Email required");
      }
      else if (reg.test(setEmail) == false) {
        newEmailState("Invalid Email Format");
      }
      else {
        newEmailState("");
      }
      if (setName == "") {
        newNameState("Name required");
      }
      else {
        newNameState("");
      }
      if (setPhone == "") {
        newPhoneState("Mobile number required");
      }
      else {
        newPhoneState("");
      }
      if (address == "") {
        newAddressState("Address required");
      }
      else {
        newAddressState("");
      }
      if (setPassword == "") {
        newPasswordState("Password required");
      }
      else {
        newPasswordState("");
      }
      if (setConfirm == "") {
        newConfirmState("Password required");
      }
      else {
        newConfirmState("");
      }
    }
    else if (setPassword !== setConfirm) {
      newConfirmState("Password and confirm password must match");
    }
    else {
      newPasswordState("");
      newEmailState("");
      newEmailState("");
      newPhoneState("");
      newConfirmState("");
      newAddressState("");
      return <View />
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.logo}>Sign Up</Text>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Name..."
            placeholderTextColor="#003f5c"
            onChangeText={text => nextName(text)} />
        </View>

        <View style={{ width: '75%' }}>
          <Text style={styles.validation}>{nameState}</Text>
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

        <View style={{ width: '75%' }}>
          <Text style={styles.validation}>{phoneState}</Text>
        </View>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Email ID..."
            placeholderTextColor="#003f5c"
            onChangeText={text => newEmail(text)} />
        </View>

        <View style={{ width: '75%' }}>
          <Text style={styles.validation}>{emailState}</Text>
        </View>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Address..."
            placeholderTextColor="#003f5c"
            multiline
            onChangeText={text => nextAddress(text)} />
        </View>

        <View style={{ width: '75%' }}>
          <Text style={styles.validation}>{addressState}</Text>
        </View>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            secureTextEntry
            onChangeText={text => nextPassword(text)} />
        </View>

        <View style={{ width: '75%' }}>
          <Text style={styles.validation}>{passwordState}</Text>
        </View>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Confirm password..."
            placeholderTextColor="#003f5c"
            secureTextEntry
            onChangeText={text => nextConfirmPassword(text)} />
        </View>

        <View style={{ width: '75%' }}>
          <Text style={styles.validation}>{confirmState}</Text>
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={validate}>
          <Text style={styles.loginText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    marginBottom: 40,
    marginTop: '15%',
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 13,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    fontSize: 20,
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
    marginTop: 20,
    marginBottom: 10
  },
  validation: {
    color: "crimson",
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: "left",
    marginBottom: 13
  }
});
