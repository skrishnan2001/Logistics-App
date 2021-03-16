import React, { useState, useContext, useEffect } from "react";
import * as firebase from "firebase";
import Cards from "../components/Cards";
import FormButton from "../components/FormButton";
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  Button,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import FormInput from "../components/FormInput";
import { db } from "../firebaseConfig";
import DropDownPicker from "react-native-dropdown-picker";
import { AuthContext } from "../navigation/AuthProvider";
import { windowHeight, windowWidth } from "../utils/Dimensions";
import { BarCodeScanner } from "expo-barcode-scanner";
import Schedule from "../app/components/Schedule";

const BookingScreen_2 = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  const [barcode, setbarcode] = useState("");
  const [staff_picker, setstaff_picker] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [Shift, setshift_picker] = useState("");
  //var global_bar_code;
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  var staffs = [];
  var dbRef = firebase.database().ref("/staff/ProfileDetails/");
  dbRef.on("value", function (snapshot) {
    const data = snapshot.val();
    for (var key in data) {
      var val = data[key];
      if (val["Vehicle_Type"] === route.params.vehicle) {
        let staff = {
          staff_id: key,
          label: val["Name"],
        };
        staffs.push(staff);
      }
    }
  });
  var shifts = [
    { label: "Shift 1" },
    { label: "Shift 2" },
    { label: "Shift 3" },
  ];

  var booking = route.params.booking_data;
  const onSubmit = () => {
    console.log(booking);
    console.log(staffs);
    booking.barcodeNumber = barcode;
    booking.isBarcodeScanned = true;
    booking["StaffId"] = staff_picker;
    db.ref(`/users/booking/${user.uid}`).push(booking);
    Schedule_order();
    navigation.navigate("Invoice-admin");
  };
  const Schedule_order = () => {
    var orderId;
    var bookingRef = firebase.database().ref(`/users/booking/${user.uid}`);
    bookingRef.on("value", function (snapshot) {
      const data = snapshot.val();
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var val = data[key];
          if (val["barcodeNumber"] == booking.barcodeNumber) {
            console.log("-----" + key);
            orderId = key;
            break;
          }
        }
      }
      //orderId = data.key;
      console.log(orderId);
    });

    db.ref(`staff/Undelivered/${staff_picker}/`).push({
      userId: user.uid,
      orderId: orderId,
      Shift: Shift,
    });
    db.ref(`admin/ScheduledOrders/${Shift}/`).push({
      StaffId: staff_picker,
      userId: user.uid,
      orderId: orderId,
    });
    db.ref(`staff/ProfileDetails/${staff_picker}/notifications`).push({
      title: "Order Scheduled",
      body: `Order ${orderId} has been scheduled`,
    });
    db.ref(`users/booking/${user.uid}/notifications`).push({
      title: "Order Scheduled",
      body: `Order ${orderId} has been scheduled`,
    });
  };
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setbarcode(data);
    Alert.alert(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "column", marginTop: 10, padding: 10 }}>
        <View style={styles.buttonStyle}>
          <FormButton buttonTitle="Back" onPress={() => navigation.goBack()} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.buttonStyle}>
            <DropDownPicker
              items={staffs}
              placeholder="Select Staff"
              onChangeItem={(item) => setstaff_picker(item.staff_id)}
              containerStyle={{ marginTop: 10, height: 50, width: 100 }}
              labelStyle={{ color: "#2e64e5" }}
            />
          </View>
          <View style={styles.buttonStyle}>
            <DropDownPicker
              items={shifts}
              placeholder="Select Shift"
              onChangeItem={(item) => setshift_picker(item.label)}
              containerStyle={{ marginTop: 10, height: 50, width: 100 }}
              labelStyle={{ color: "#2e64e5" }}
              itemStyle={{ borderColor: "black", borderWidth: 1 }}
            />
          </View>
        </View>
      </View>
      <View style={styles.barcodeScanner}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </View>
      <FormButton buttonTitle="Confirm Booking" onPress={onSubmit} />
    </View>
  );
};

export default BookingScreen_2;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 10,
    marginTop: -20,
    marginLeft: 140,
    marginBottom: 5,
    borderRadius: 5,
    width: 250,
    height: 80,
    color: "white",
    backgroundColor: "#465881",
    textAlignVertical: "top",
  },
  inputsingle: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 5,
    marginTop: 10,
    borderRadius: 125,
    marginBottom: 5,
    width: 250,
    height: 30,
    color: "#2e64e5",
    backgroundColor: "#465881",
  },
  checkbox: {
    alignSelf: "center",
  },
  barcodeScanner: {
    marginTop: 20,
    flex: 1,
    width: windowWidth / 1.11,
    height: windowHeight / 1.9,
  },
  loginBtn: {
    width: 200,
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    marginLeft: 80,
  },
  loginText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  text: {
    color: "#051d5f",
    fontSize: 20,
    fontWeight: "bold",
  },
  text2: {
    color: "#ccc",
    fontSize: 18,
  },
  validation: {
    color: "crimson",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 10,
    marginTop: -5,
  },
  insurance: {
    color: "black",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: -10,
    marginTop: 1,
    marginLeft: 18,
  },
  buttonStyle: {
    marginHorizontal: "2%",
    marginVertical: 10,
    width: "30%",
  },
  datePickerStyle: {
    width: "100%",
    marginTop: 10,
    borderColor: "#ccc",
    borderRadius: 3,
    borderWidth: 0,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 5,
  },
});
