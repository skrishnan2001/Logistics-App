import React, { useContext, useState, Component } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { db } from "../firebaseConfig";
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

const InvoiceScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [curr, next] = useState({
    tableHead: ["", "Details"],
    tableTitle: [
      "Pickup Address",
      "Delivery Address",
      "Phone number",
      "Category",
      "Dimension",
      "Weight",
      "Type",
      "Order Value",
      "Insurance",
    ],
    tableData: [
      ["49 street"],
      ["67 Street"],
      ["123456789"],
      ["Bulk"],
      ["25*35*68"],
      ["45"],
      ["Elect"],
      ["100"],
      ["Yes"],
    ],
  });

  var ref = firebase.database().ref();
  ref.on(
    "value",
    function (snapshot) {
      console.log(snapshot.val());
    },
    function (error) {
      console.log("Error: " + error.code);
    }
  );

  var bookingRef = firebase.database().ref(`/users/booking/${user.uid}`);

  bookingRef.on("child_added", function (data, prevChildKey) {
    var newBooking = data.val();
    console.log("Pick-up: " + newBooking.residence_locality_pickup);
    console.log("Drop: " + newBooking.residence_locality_delivery);
    console.log("Phone number: " + newBooking.phone);
    console.log("Previous Player: " + prevChildKey);
  });

  const state = curr;
  return (
    <View style={styles.container}>
      <Text style={styles.top}>Invoice</Text>
      <Table borderStyle={{ borderWidth: 2 }}>
        <Row
          data={state.tableHead}
          flexArr={[1, 4.1, 1, 1]}
          style={styles.head}
          textStyle={styles.text}
        />
        <TableWrapper style={styles.wrapper}>
          <Col
            data={state.tableTitle}
            style={styles.title}
            textStyle={styles.text}
          />
          <Rows
            data={state.tableData}
            flexArr={[2, 1, 1]}
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
  );
}

export default InvoiceScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  wrapper: { flexDirection: "row" },
  title: { flex: 1, backgroundColor: "#f6f8fa", height: 400 },
  row: { height: 44.5 },
  text: { textAlign: "center" },
  top: { textAlign: "center", fontSize: 40, paddingBottom: 20 },
});
