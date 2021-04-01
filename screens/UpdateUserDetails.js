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
import { db } from "../firebaseConfig";

export default function UpdateUserDetails({ navigation }) {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setusername] = useState("");
  const [image, setImage] = useState(
    "https://bootdey.com/img/Content/avatar/avatar6.png"
  );
  const fetch_img = () => {
    var key;
    var ref = db.ref(`/users/ProfileDetails/${user.uid}`);
    ref.once("value").then(function (snapshot) {
      ref.limitToLast(1).on("child_added", function (snapshot) {
        key = snapshot.key;
      });
      const data = snapshot.val()[key];
      setImage(data["Img_uri"]);
      console.log("done");
    });
  };
  fetch_img();
  const addItems = () => {
    var ref = db.ref(`/users/ProfileDetails/`);
    ref.once("value").then(function (snapshot) {
      if (snapshot.child(`${user.uid}`).exists()) {
        var key;
        var dbref = db.ref(`/users/ProfileDetails/${user.uid}`);
        dbref.limitToLast(1).on("child_added", function (snapshot) {
          key = snapshot.key;
        });
        dbref.child(`${key}`).set({
          Name: name,
          Phone_number: phone,
          User_name: username,
        });
      } else {
        db.ref(`/users/ProfileDetails/${user.uid}`).push({
          Name: name,
          Phone_number: phone,
          User_name: username,
        });
      }
    });
  };

  const updateHandle = () => {
    addItems();
    Alert.alert("Your details have been updated");
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
            source={{ uri: `data:image/jpeg;base64,${image}` }}
          />
        </View>
        <View style={{ marginTop: 65, marginHorizontal: 20 }}>
          <FormInput
            labelValue={name}
            onChangeText={(text) => setName(text)}
            placeholderText="Name..."
            iconType="user"
            autoCorrect={false}
          />

          <FormInput
            labelValue={phone}
            onChangeText={(text) => setPhone(text)}
            placeholderText="Mobile number"
            autoCorrect={false}
            iconType="mobile1"
            keyboardType="number-pad"
            maxLength={10}
          />
          <FormInput
            labelValue={username}
            onChangeText={(text) => setusername(text)}
            placeholderText="User Name..."
            iconType="user"
            autoCorrect={false}
          />
          <FormButton
            buttonTitle="Update"
            style={styles.buttonContainer}
            onPress={updateHandle}
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
