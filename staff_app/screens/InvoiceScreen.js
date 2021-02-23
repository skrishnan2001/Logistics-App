import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  CheckBox,
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
  Cols,
} from "react-native-table-component";
import * as firebase from "firebase";
import { db } from "../firebaseConfig";
import Icon from "react-native-vector-icons/Ionicons";
import { Camera } from "expo-camera";
import { windowHeight, windowWidth } from "../utils/Dimensions";

const InvoiceScreen = ({ route, navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [ratio, setRatio] = useState("4:3");
  const [camera, setcamera] = useState(null);
  const [path, setpath] = useState("");
  const { user } = useContext(AuthContext);
  const [check, setcheck] = useState(false);
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
    shorttime;
  const { user_id, order_id } = route.params;
  var bookingRef = firebase
    .database()
    .ref(`/users/booking/${user_id}/${order_id}`);
  bookingRef.on("value", function (data) {
    var newBooking = data.val();
    phone = newBooking.phone;
    console.log("-" + newBooking.phone);
    console.log("--" + phone);
    pickup = newBooking.residence_locality_pickup;
    pickup2 =
      newBooking.city_pickup +
      ", " +
      newBooking.state_pickup +
      ", " +
      newBooking.pincode_pickup;
    delivery = newBooking.residence_locality_delivery;
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
    dimension=length+" * "+breadth+" * "+height;
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
      volume: `${length}*${breadth}*${height}`,
      weight: weight,
      type: type,
      order_val: order_val,
      vehicle_type: vehicle_type,
      insurance: insurance,
      priority: priority,
      time: shorttime,
    };
    console.log(pdf_obj);
  };
  const state = curr;
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = () => {
    if (camera) {
      camera.takePictureAsync({
        onPictureSaved: onPictureSaved,
        skipProcessing: true,
        base64: true,
      });
    }
  };

  const onPictureSaved = (photo) => {
    console.log(photo["height"]);
    console.log(photo["uri"]);
    setpath(photo["uri"]);
    console.log(photo["width"]);
    // console.log(photo["base64"]);
    setpath(photo["base64"]);
  };


  const conf_del = () => {
    db.ref(`staff/Delivered/${staff_id}`).push({
      staffId: staff_id,
      orderId: order_id,
      userId: user_id,
      base64: path,
    });
    db.ref(`admin/Unverified`).push({
      staffId: staff_id,
      orderId: order_id,
      userId: user_id,
      base64: path,
    });
    db.ref(`/users/booking/${user_id}/${order_id}`).update({
      isScheduled: "Delivered",
    });
    db.ref(`/users/booking/${user_id}/notifications`).push({
      title: "ORDER DELIVERED",
      body: `Order ${order_id} has been delivered`,
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
    navigation.navigate("MyOrders");
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
        <FormButton
          buttonTitle="Back to Orders"
          onPress={() => navigation.goBack()}
        />
        <View style={{ flexDirection: "column", marginTop: 10, padding: 10 }}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 1,
              borderColor: "white",
            }}
          >
            <CheckBox value={check} onValueChange={setcheck} />
            <Text style={[styles.text, { fontSize: 20, fontWeight: "normal" }]}>
              {" "}
              Delivered
            </Text>
          </View>
        </View>
        <View style={{ marginRight: 10 }}>
          <Text style={styles.imageHead}>
            {"Capture the Consignment Delivered:"}
          </Text>
          <Camera
            style={styles.camera}
            type={type}
            ratio={ratio}
            autofocus={Camera.Constants.AutoFocus.on}
            ref={(ref) => {
              setcamera(ref);
            }}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={takePicture}>
                <Icon
                  name="ios-aperture"
                  size={50}
                  color="#FFFFFF"
                  style={styles.cameraview}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
        <View>
          <Text style={styles.imageHead}>{"Consignment Image:"}</Text>
          <Image
            source={{
              uri: `data:image/jpeg;base64,${path}`,
            }}
            style={styles.image}
          />
        </View>
        <FormButton
          buttonTitle="Print Invoice as PDF"
          onPress={() => {
            pdf_gen();
            navigation.navigate("Invoice-PDF", { pdf_det: pdf_obj });
          }}
        />
        <FormButton buttonTitle="Confirm delivery" onPress={() => conf_del()} />
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
  camera: {
    flex: 1,
    width: windowWidth / 1.11,
    height: windowHeight / 1.9,
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
  button: {
    alignItems: "center",
  },
  cameraview: {
    marginTop: "80%",
  },
  imageHead: {
    marginBottom: "5%",
    marginTop: "5%",
    textAlign: "center",
    color: "#c43d10",
    fontSize: 20,
    fontFamily: "serif",
  },
  image: {
    flex: 1,
    width: windowWidth / 1.11,
    height: windowHeight / 1.9,
  },
});
