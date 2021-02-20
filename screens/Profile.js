import React, { useState, useContext, useEffect } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Platform,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { AuthContext } from "../navigation/AuthProvider";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { db } from "../firebaseConfig";
const ProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState(
    "https://bootdey.com/img/Content/avatar/avatar6.png"
  );
  const { user, logout } = useContext(AuthContext);
  const fetch_img = () => {
    var key;
    var ref = db.ref(`/users/ProfileDetails/${user.uid}`);
    ref.once("value").then(function (snapshot) {
      ref.limitToLast(1).on("child_added", function (snapshot) {
        key = snapshot.key;
      });
      const data = snapshot.val()[key];
      setImage(data["Img_uri"]);
    });
  };
  fetch_img();
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
    var key;
    var ref = db.ref(`/users/ProfileDetails/${user.uid}`);
    ref.once("value").then(function (snapshot) {
      ref.limitToLast(1).on("child_added", function (snapshot) {
        key = snapshot.key;
      });
      ref.child(`${key}`).update({
        Img_uri: result.uri,
      });
    });
  };

  const handleSubmit2 = () => {
    setVisible2(false);
    changePassword(currentPassword, newPassword);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
        <View style={[styles.bodyContent,{marginBottom:0}]}>
        <TouchableOpacity
          style={styles.buttonContainer1}
          onPress={() => {
            pickImage();
          }}
        >
          <Icon size={24} color="black" name="camera" />
        </TouchableOpacity> 
        </View>
        </View>
        <Image style={styles.avatar} source={{ uri: image }} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{user.uid}</Text>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.navigate("UpdateUserDetails")}
            >
              <Text style={{color:"white",fontWeight:"bold"}}>Update / Set Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.navigate("History")}
            >
              <Text style={{color:"white",fontWeight:"bold"}}>Booking History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                navigation.navigate("Reset-Email");
              }}
            >
              <Text style={{color:"white",fontWeight:"bold"}}>Reset Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.navigate("Reset-Password")}
            >
              <Text style={{color:"white",fontWeight:"bold"}}>Reset Password</Text>
            </TouchableOpacity>
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
    height: 180,
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
    marginTop: 120,
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
  buttonContainer1: {
    marginTop: 37,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    //marginBottom: 20,
    width: 50,
    borderRadius: 100,
    backgroundColor: "white",
  },
});
