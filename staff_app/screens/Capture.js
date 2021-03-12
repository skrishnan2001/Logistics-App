// import React, { useContext, useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   ScrollView,
//   CheckBox,
//   Button,
//   Alert,
// } from "react-native";
// import { AuthContext } from "../navigation/AuthProvider";
// import FormButton from "../components/FormButton";

// import * as firebase from "firebase";
// import { db } from "../firebaseConfig";
// import Icon from "react-native-vector-icons/Ionicons";
// import { Camera } from "expo-camera";
// import { windowHeight, windowWidth } from "../utils/Dimensions";

// const Capture = ({ route, navigation }) => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);
//   const [ratio, setRatio] = useState("4:3");
//   const [camera, setcamera] = useState(null);
//   const [path, setpath] = useState("");
//   const { user } = useContext(AuthContext);
//   const [check, setcheck] = useState(false);
//   const staff_id = user.uid;
//   const { user_id, order_id } = route.params;
//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);
//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   const takePicture = () => {
//     if (camera) {
//       camera.takePictureAsync({
//         onPictureSaved: onPictureSaved,
//         skipProcessing: true,
//         base64: true,
//       });
//     }
//   };

//   const onPictureSaved = (photo) => {
//     console.log("Clickeddd");
//     console.log(photo["height"]);
//     console.log(photo["uri"]);
//     console.log(photo["width"]);
//     setpath(photo["base64"]);
//   };

//   const conf_del = () => {
//     db.ref(`staff/Delivered/${staff_id}`).push({
//       staffId: staff_id,
//       orderId: order_id,
//       userId: user_id,
//       base64: path,
//     });
//     db.ref(`admin/Unverified`).push({
//       staffId: staff_id,
//       orderId: order_id,
//       userId: user_id,
//       base64: path,
//     });
//     db.ref(`/users/booking/${user_id}/${order_id}`).update({
//       isScheduled: "Delivered",
//     });
//     db.ref(`/users/booking/${user_id}/notifications`).push({
//       title: "ORDER DELIVERED",
//       body: `Order ${order_id} has been delivered`,
//     });
//     db.ref(`/admin/notifications`).push({
//       title: "ORDER DELIVERED",
//       body: `Order ${order_id} has been delivered`,
//     });
//     var node;
//     var dbRef = firebase.database().ref(`staff/Undelivered/${staff_id}/`);
//     dbRef.on("value", function (snapshot) {
//       const data = snapshot.val();
//       for (var key in data) {
//         if (data.hasOwnProperty(key)) {
//           var val = data[key];
//           if (val["userId"] == user_id && val["orderId"] == order_id) {
//             node = key;
//           }
//         }
//       }
//     });
//     console.log(node);
//     db.ref(`staff/Undelivered/${staff_id}/${node}`).remove();

//     Alert.alert("The order has been delivered");
//     navigation.goBack();
//   };

//   return (
//     <View>
//       <View style={{ flexDirection: "column", marginTop: 10, padding: 10 }}>
//         <View
//           style={{
//             flexDirection: "row",
//             marginTop: 1,
//             borderColor: "white",
//           }}
//         >
//           <CheckBox value={check} onValueChange={setcheck} />
//           <Text style={[styles.text, { fontSize: 20, fontWeight: "normal" }]}>
//             {" "}
//             Delivered
//           </Text>
//         </View>
//       </View>
//       <View style={{ marginRight: 10 }}>
//         <Text style={styles.imageHead}>
//           {"Capture the Consignment Delivered:"}
//         </Text>
//         <Camera
//           style={styles.camera}
//           type={type}
//           ratio={ratio}
//           autofocus={Camera.Constants.AutoFocus.on}
//           ref={(ref) => {
//             setcamera(ref);
//           }}
//         >
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.button} onPress={takePicture}>
//               <Icon
//                 name="ios-aperture"
//                 size={50}
//                 color="#FFFFFF"
//                 style={styles.cameraview}
//               />
//             </TouchableOpacity>
//           </View>
//         </Camera>
//       </View>
//       <View>
//         <Text style={styles.imageHead}>{"Consignment Image:"}</Text>
//         <Image
//           source={{
//             uri: `data:image/jpeg;base64,${path}`,
//           }}
//           style={styles.image}
//         />
//       </View>
//       <FormButton buttonTitle="Confirm delivery" onPress={() => conf_del()} />
//     </View>
//   );
// };

// export default Capture;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingVertical: 50,
//     backgroundColor: "#fff",
//   },

//   //   camera: {
//   //     flex: 1,
//   //     width: windowWidth / 1.5,
//   //     height: windowHeight / 1.9,
//   //   },

//   button: {
//     alignItems: "center",
//   },
//   cameraview: {
//     marginTop: "80%",
//   },
//   imageHead: {
//     marginBottom: "5%",
//     marginTop: "5%",
//     textAlign: "center",
//     color: "#c43d10",
//     fontSize: 20,
//     fontFamily: "serif",
//   },
//   //   image: {
//   //     flex: 1,
//   //     width: windowWidth / 1.11,
//   //     height: windowHeight / 1.9,
//   //   },
// });
import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
export default function Capture() {
  const [image, setImage] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS !== "web") {
  //       const {
  //         status,
  //       } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       if (status !== "granted") {
  //         alert("Sorry, we need camera roll permissions to make this work!");
  //       }
  //     }
  //   })();
  // }, []);
  const checkPerm = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.getAsync(Permissions.CAMERA);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const clickImage = () => {
    checkPerm();
    pickImage();
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={clickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}
