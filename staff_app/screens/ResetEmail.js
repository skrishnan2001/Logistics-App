import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Image,
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { AuthContext } from "../navigation/AuthProvider";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import { windowHeight } from "../utils/Dimensions";
import * as firebase from "firebase";

export default function UpdateUserDetails({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const [currentPassword, setcurrentPassword] = useState(null);
  const [newEmail, setnewEmail] = useState(null);

  const reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };
  const changeEmail = (currentPassword, newEmail) => {
    reauthenticate(currentPassword)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updateEmail(newEmail)
          .then(() => {
            Alert.alert("Your Email has been updated!");
            logout();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    changeEmail(currentPassword, newEmail);
    navigation.navigate("Profile");
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View>
        <View style={styles.header}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
            }}
          />
        </View>
        <View style={{ marginTop: 65, marginHorizontal: 20 }}>
          <FormInput
            onChangeText={(text) => setcurrentPassword(text)}
            placeholderText="Enter Current Password..."
            autoCorrect={false}
            iconType="lock"
            secureTextEntry={true}
          />

          <FormInput
            onChangeText={(text) => setnewEmail(text)}
            placeholderText="Enter New Email..."
            iconType="user"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <FormButton
            buttonTitle="Update"
            style={styles.buttonContainer}
            onPress={handleSubmit}
          />
          <FormButton
            buttonTitle="Back to Profile"
            onPress={() => navigation.navigate("Profile")}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    padding: 20,
  },
  header: {
    backgroundColor: "#00BFFF",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
  },
  buttonContainer: {
    marginTop: 50,
    width: "100%",
    height: windowHeight / 15,
    backgroundColor: "crimson",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
});
