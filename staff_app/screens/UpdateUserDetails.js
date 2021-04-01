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
import { ScrollView } from "react-native-gesture-handler";

export default function UpdateUserDetails({ navigation }) {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [aadhar, setaadhar] = useState("");
  const [image, setImage] = useState(
    "https://bootdey.com/img/Content/avatar/avatar6.png"
  );

  const fetch_img = () => {
    var ref = db.ref(`/staff/ProfileDetails/${user.uid}`);
    ref.once("value").then(function (snapshot) {
      const data = snapshot.val();
      setImage(data["Img_uri"]);
    });
  };
  fetch_img();
  const addItems = () => {
    var ref = db.ref(`/staff/ProfileDetails/`);
    ref.once("value").then(function (snapshot) {
      if (snapshot.child(`${user.uid}`).exists()) {
        var key;
        var dbref = db.ref(`/staff/ProfileDetails/${user.uid}`);
        dbref.limitToLast(1).on("child_added", function (snapshot) {
          key = snapshot.key;
        });
        dbref.set({
          Name: name,
          Phone_number: phone,
          Vehicle_Type: vehicle,
          VehicleNum: vehicleNo,
          aadharNo: aadhar,
        });
      } else {
        db.ref(`/staff/ProfileDetails/${user.uid}`).set({
          Name: name,
          Phone_number: phone,
          Vehicle_Type: vehicle,
          VehicleNum: vehicleNo,
          aadharNo: aadhar,
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
      <ScrollView>
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
              placeholderText="Mobile number..."
              iconType="mobile1"
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={10}
            />

            <FormInput
              labelValue={vehicle}
              onChangeText={(text) => setVehicle(text)}
              placeholderText="Vehicle Type..."
              iconType="car"
              autoCorrect={false}
            />

            <FormInput
              labelValue={vehicleNo}
              onChangeText={(text) => setVehicleNo(text)}
              placeholderText="Vehicle number..."
              iconType="car"
              autoCorrect={false}
            />

            <FormInput
              labelValue={aadhar}
              onChangeText={(text) => setaadhar(text)}
              placeholderText="Aadhaar number..."
              autoCorrect={false}
              keyboardType="number-pad"
              iconType="idcard"
              maxLength={12}
            />

            <FormButton
              buttonTitle="Update"
              style={styles.buttonContainer}
              onPress={updateHandle}
            />
            <FormButton
              buttonTitle="Back to Profile"
              style={styles.buttonContainer1}
              onPress={() => navigation.navigate("Profile")}
            />
          </View>
        </View>
      </ScrollView>
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
    marginTop: 20,
    width: "100%",
    height: windowHeight / 15,
    backgroundColor: "crimson",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  buttonContainer1: {
    marginTop: 10,
    width: "100%",
    height: windowHeight / 15,
    backgroundColor: "#2e64e5",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    marginBottom: 20,
  },
});
