import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { AuthContext } from "../navigation/AuthProvider";
import Icon from "react-native-vector-icons/Ionicons";
import * as firebase from "firebase";
import Dialog from "react-native-dialog";

const ProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const [currentPassword, setcurrentPassword] = useState(null);
  const [newPassword, setnewPassword] = useState(null);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };
  const changePassword = (currentPassword, newPassword) => {
    reauthenticate(currentPassword)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updatePassword(newPassword)
          .then(() => {
            console.log("Password updated!");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const showDialog1 = () => {
    setVisible1(true);
  };

  const handleCancel = () => {
    setVisible1(false);
    setVisible2(false);
  };

  const handleSubmit1 = () => {
    setVisible1(false);
    setVisible2(true);
  };
  const handleSubmit2 = () => {
    setVisible2(false);
    changePassword(currentPassword, newPassword);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image
          style={styles.avatar}
          source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }}
        />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{user.uid}</Text>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
              <Text>Update / Set Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => alert("button worked")}
            >
              <Text>Booking History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
              <Text>Reset Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={showDialog1}
            >
              <Text>Reset Password</Text>
            </TouchableOpacity>
            <Dialog.Container visible={visible1}>
              <Dialog.Title>Reset Password</Dialog.Title>
              <Dialog.Description>Enter Current Password</Dialog.Description>
              <Dialog.Input
                onChangeText={(text) => setcurrentPassword(text)}
                placeholderText="Current Password"
                secureTextEntry={true}
              ></Dialog.Input>
              <Dialog.Button label="Cancel" onPress={handleCancel} />
              <Dialog.Button label="Submit" onPress={handleSubmit1} />
            </Dialog.Container>
            <Dialog.Container visible={visible2}>
              <Dialog.Title>Reset Password</Dialog.Title>
              <Dialog.Description>Enter New Password</Dialog.Description>
              <Dialog.Input
                onChangeText={(text) => setnewPassword(text)}
                placeholderText="New Password"
                secureTextEntry={true}
              ></Dialog.Input>
              <Dialog.Button label="Cancel" onPress={handleCancel} />
              <Dialog.Button label="Submit" onPress={handleSubmit2} />
            </Dialog.Container>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
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
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },

  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
});
