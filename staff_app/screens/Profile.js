import React, { useState, useContext,useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { AuthContext } from "../navigation/AuthProvider";
import * as ImagePicker from "expo-image-picker";
import { db } from "../firebaseConfig";
import Icon from "react-native-vector-icons/FontAwesome";

const ProfileScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(
    "https://bootdey.com/img/Content/avatar/avatar6.png"
  );

  const fetch_img = () => {
    var ref = db.ref(`/staff/ProfileDetails/${user.uid}`);
    ref.once("value").then(function (snapshot) {
      const data = snapshot.val();
      setImage(data["Img_uri"])
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
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.base64);
      console.log("-----");
    }
    var key;
    var ref = db.ref(`/staff/ProfileDetails/${user.uid}`);
    ref.once("value").then(function (snapshot) {
      // ref.limitToLast(1).on("child_added", function (snapshot) {
      //   key = snapshot.key;
      // });
      ref.update({
        Img_uri: result.base64,
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
        <View style={[styles.bodyContent, { marginBottom: 0 }]}>
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
        <Image
          style={styles.avatar}
          source={{ uri: `data:image/jpeg;base64,${image}` }}
        />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{user.uid}</Text>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.navigate("MyOrders")}
            >
              <Text style={styles.textStyle}>My Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.navigate("UpdateUserDetails")}
            >
              <Text style={styles.textStyle}>Update / Set Details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                navigation.navigate("Reset-Email");
              }}
            >
              <Text style={styles.textStyle}>Reset Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.navigate("Reset-Password")}
            >
              <Text style={styles.textStyle}>Reset Password</Text>
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
  textStyle:{
    fontWeight:'bold',
    color: "white",
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
