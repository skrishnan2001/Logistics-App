import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  CheckBox,
  Button,
  Alert,
} from "react-native";
import { AuthContext } from "../navigation/AuthProvider";
import FormButton from "../components/FormButton";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
import * as firebase from "firebase";
import { db } from "../firebaseConfig";
// import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { windowHeight, windowWidth } from "../utils/Dimensions";
import { BarCodeScanner } from "expo-barcode-scanner";
import Icon from "react-native-vector-icons/FontAwesome";

const InvoiceScreen = ({ route, navigation }) => {
  const [image, setImage] = useState(null);
  const { user } = useContext(AuthContext);
  const [scanned, setScanned] = useState(false);

  const staff_id = user.uid;
  var pdf_obj;
  var phone,
    pickup,
    pickup2, //City,state and pincode for pickup address
    delivery,
    delivery2, //City,state and pincode for delivery address
    category,
    length,
    breadth,
    height,
    weight,
    typee,
    order_val,
    vehicle_type,
    insurance,
    dimension,
    priority,
    shorttime,
    barcode;
  const { user_id, order_id } = route.params;
  var bookingRef = firebase
    .database()
    .ref(`/users/booking/${user_id}/${order_id}`);
  bookingRef.on("value", function (data) {
    var newBooking = data.val();
    phone = newBooking.phone;
    console.log("-" + newBooking.phone);
    console.log("--" + phone);
    pickup =
      newBooking.street_pickup + ", " + newBooking.residence_locality_pickup;
    pickup2 =
      newBooking.city_pickup +
      ", " +
      newBooking.state_pickup +
      ", " +
      newBooking.pincode_pickup;
    delivery =
      newBooking.street_delivery +
      ", " +
      newBooking.residence_locality_delivery;
    delivery2 =
      newBooking.city_delivery +
      "," +
      newBooking.state_delivery +
      "," +
      newBooking.pincode_delivery;
    category = newBooking.PickerSelectedVal;
    length = newBooking.length;
    breadth = newBooking.breadth;
    height = newBooking.height;
    dimension = length + " * " + breadth + " * " + height;
    weight = newBooking.weight;
    typee = newBooking.type;
    order_val = newBooking.order;
    vehicle_type = newBooking.vehicle;
    time = new Date(newBooking.Time);
    shorttime =
      time.getDate() +
      "/" +
      (time.getMonth() + 1) +
      "/" +
      time.getFullYear() +
      " , " +
      time.getHours() +
      ":" +
      time.getMinutes();
    barcode = newBooking.isBarcodeScanned;
    if (newBooking.insurance == true) insurance = "Yes";
    else insurance = "No";

    if (newBooking.Priority_Booking == true) priority = "Yes";
    else priority = "No";
    if (category == "Bulk") {
      dimension = "Not Applicable";
      weight = "Not Applicable";
      typee = "Not Applicable";
      order_val = "Not Applicable";
    }
  });
  console.log("---" + phone);
  const [curr, next] = useState({
    tableHead: ["", "Details"],
    tableTitle: [
      "Pickup-Add1",
      "Pickup-Add2",
      "Delivery-Add1",
      "Delivery-Add2",
      "Phone no.",
      "Category",
      "Dimension",
      "Weight",
      "Type",
      "Order Value",
      "Vehicle",
      "Insurance",
      "Prior-Booking",
      "Booking-Time",
    ],
    tableData: [
      [`${pickup}`],
      [`${pickup2}`],
      [`${delivery}`],
      [`${delivery2}`],
      [`${phone}`],
      [`${category}`],
      [`${dimension}`],
      [`${weight}`],
      [`${typee}`],
      [`${order_val}`],
      [`${vehicle_type}`],
      [`${insurance}`],
      [`${priority}`],
      [`${shorttime}`],
    ],
  });
  const pdf_gen = () => {
    pdf_obj = {
      pickup: pickup,
      pickup2: pickup2,
      delivery: delivery,
      delivery2: delivery2,
      phone: phone,
      category: category,
      volume: `${length}${breadth}${height}`,
      weight: weight,
      type: typee,
      order_val: order_val,
      vehicle_type: vehicle_type,
      insurance: insurance,
      priority: priority,
      time: shorttime,
    };
    console.log(pdf_obj);
  };
  const state = curr;

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
      base64: true,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.base64);
    }
  };

  const clickImage = () => {
    checkPerm();
    pickImage();
  };
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    db.ref(`/users/booking/${user_id}/${order_id}`).update({
      barcodeNumber: data,
      isBarcodeScanned: true,
    });
    Alert.alert(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    navigation.goBack();
  };
  const conf_del = () => {
    db.ref(`staff/Delivered/${staff_id}`).push({
      staffId: staff_id,
      orderId: order_id,
      userId: user_id,
      base64: image,
    });
    db.ref(`admin/Unverified`).push({
      staffId: staff_id,
      orderId: order_id,
      userId: user_id,
      base64: image,
    });
    db.ref(`/users/booking/${user_id}/${order_id}`).update({
      isScheduled: "Delivered",
    });
    var bkref = db.ref(`/users/booking/${user_id}/${order_id}`);
    bkref.on("value", function (snapshot) {
      const data = snapshot.val();
      console.log(data);
      if (!data["isAdmin"]) {
        db.ref(`/users/booking/${user_id}/notifications`).push({
          title: "ORDER DELIVERED",
          body: `Order ${order_id} has been delivered`,
        });
      }
    });
    db.ref(`/admin/notifications`).push({
      title: "ORDER DELIVERED",
      body: `Order ${order_id} has been delivered`,
    });
    var node;
    var dbRef = firebase.database().ref(`staff/Undelivered/${staff_id}/`);
    dbRef.on("value", function (snapshot) {
      const data = snapshot.val();
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var val = data[key];
          if (val["userId"] == user_id && val["orderId"] == order_id) {
            node = key;
          }
        }
      }
    });
    console.log(node);
    db.ref(`staff/Undelivered/${staff_id}/${node}`).remove();

    Alert.alert("The order has been delivered");
    navigation.goBack();
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.top}>Order Details</Text>
        <Table borderStyle={{ borderWidth: 2 }}>
          <Row
            data={state.tableHead}
            flexArr={[0, 2.02, 0, 0]}
            style={styles.head}
            textStyle={styles.text}
          />
          <TableWrapper style={styles.wrapper}>
            <Col
              data={state.tableTitle}
              style={styles.title}
              heightArr={[60, 60, 60]}
              textStyle={styles.text}
            />
            <Rows
              data={state.tableData}
              flexArr={[0, 0, 2]}
              style={styles.row}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
        {/* <FormButton buttonTitle="Back" onPress={() => navigation.goBack()} /> */}
        {barcode == false ? (
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
        ) : (
          <View>
            {/* <FormButton
              buttonTitle="Capture consignment"
              onPress={clickImage}
            /> */}

            <View style={[styles.bodyContent, { marginBottom: 0 }]}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={clickImage}
              >
                <Icon
                  size={45}
                  color="black"
                  name="camera"
                  style={{ marginHorizontal: 20, fontWeight: "bold" }}
                />
                <Text style={styles.name}>Capture</Text>
              </TouchableOpacity>
            </View>

            {/* <Text>{"\n\nConsignment Image:"}</Text> */}
            {image && (
              <Image
                source={{ uri: `data:image/jpeg;base64,${image}` }}
                style={{
                  marginTop: 10,
                  width: windowWidth / 1.11,
                  height: windowHeight / 2,
                }}
              />
            )}
            {/* <Text>{"\n"}</Text> */}
            <View style={[styles.bodyContent, { marginBottom: 0 }]}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                  pdf_gen();
                  navigation.navigate("Invoice-PDF", { pdf_det: pdf_obj });
                }}
              >
                <Icon
                  size={45}
                  color="black"
                  name="file-pdf-o"
                  style={{ marginHorizontal: 20, fontWeight: "bold" }}
                />
                <Text style={styles.name}>Invoice PDF</Text>
              </TouchableOpacity>
            </View>
            {/* <FormButton
              buttonTitle="Print Invoice as PDF"
              onPress={() => {
                pdf_gen();
                navigation.navigate("Invoice-PDF", { pdf_det: pdf_obj });
              }}
            /> */}
            <FormButton
              buttonTitle="Confirm delivery"
              onPress={() => conf_del()}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default InvoiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: "#fff",
  },

  head: { height: 40, backgroundColor: "#f1f8ff" },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#f6f8fa" },
  row: { height: 60 },
  text: { textAlign: "center" },
  top: {
    textAlign: "center",
    fontSize: 20,
    paddingBottom: 20,
    color: "#051d5f",
  },
  barcodeScanner: {
    marginTop: 20,
    flex: 1,
    width: windowWidth / 1.11,
    height: windowHeight / 1.9,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    //padding: 30,
    marginVertical: 20,
  },
  name: {
    fontSize: 28,
    color: "white",
    fontWeight: "600",
  },
  buttonContainer: {
    //marginTop: 10,
    height: 55,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#00BFFF",
  },
});
