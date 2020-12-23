import React, { useContext, useState, Component } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { AuthContext } from "../navigation/AuthProvider";
import FormButton from "../components/FormButton";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols
} from "react-native-table-component";
import * as firebase from "firebase";

const InvoiceScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  var phone,
    pickup,
    pickup2,//City,state and pincode for pickup address
    delivery,
    delivery2,//City,state and pincode for delivery address
    category,
    length,
    breadth,
    height,
    weight,
    type,
    order_val,
    insurance,
    priority;
  var bookingRef = firebase.database().ref(`/admin/booking`);
  bookingRef.limitToLast(1).on("child_added", function (data) {
    var newBooking = data.val();
    // console.log("Pick-up: " + newBooking.residence_locality_pickup);
    // console.log("Drop: " + newBooking.residence_locality_delivery);
    // console.log("Phone number: " + newBooking.phone);
    phone = newBooking.phone;
    pickup = newBooking.residence_locality_pickup;
    pickup2 = newBooking.city_state_pickup + ", " + newBooking.pincode_pickup;
    delivery = newBooking.residence_locality_delivery;
    delivery2 = newBooking.city_state_delivery2 + ", " + newBooking.pincode_delivery;
    category = newBooking.PickerSelectedVal;
    length = newBooking.length;
    breadth = newBooking.breadth;
    height = newBooking.height;
    weight = newBooking.weight;
    type = newBooking.type;
    order_val = newBooking.order;
    if (newBooking.insurance == true)
      insurance = "Yes";
    else
      insurance = "No";

    if (newBooking.Priority_Booking == true)
      priority = "Yes";
    else
      priority = "No";
  });


  var dbRef = firebase.database().ref("/users/booking/");
    dbRef.on("value", function (snapshot) {
      const data = snapshot.val();
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var val = data[key];
          console.log("User ID:" + key + "-");
          for (var key_2 in val) {
            if (val.hasOwnProperty(key_2)) {
              var val_2 = val[key_2];
              console.log("Order ID:" + key_2 + "-");
              console.log(val_2);
            }
          }
          console.log("----------------------");
        }
      }
    });


  const [curr, next] = useState({
    tableHead: ["", "Details"],
    tableTitle: [
      "Pickup-Add1",
      "Pickup-Add2",
      "Delivery-Add1",
      "Delivery-Add2",
      "Phone number",
      "Category",
      "Dimension",
      "Weight",
      "Type",
      "Order Value",
      "Insurance",
      "Priority Booking",
    ],
    tableData: [
      [`${pickup}`],
      [`${pickup2}`],
      [`${delivery}`],
      [`${delivery2}`],
      [`${phone}`],
      [`${category}`],
      [`${length}x${breadth}x${height}`],
      [`${weight}`],
      [`${type}`],
      [`${order_val}`],
      [`${insurance}`],
      [`${priority}`]
    ],
  });

  const state = curr;
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.top}>Booking Details</Text>
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
          buttonTitle="Redirect to Fresh-Booking"
          onPress={() => navigation.navigate("Booking")}
        />
      </View>
    </ScrollView>
  );
};

export default InvoiceScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingVertical: 50, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#f6f8fa" },
  row: { height: 60 },
  text: { textAlign: "center" },
  top: { textAlign: "center", fontSize: 30, paddingBottom: 20,color: '#051d5f' },
});
