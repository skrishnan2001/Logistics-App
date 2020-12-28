import React, { useState } from "react";
import { View, StyleSheet, Text, Image, Picker } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import * as firebase from "firebase";
import FormButton from "../components/FormButton";
import { windowWidth } from "../utils/Dimensions";
import { db } from "../firebaseConfig";

function CardSchedule({ userId, orderId, genInvoice }) {
  var staff_ids = [];
  var dbRef = firebase.database().ref("/staff/ProfileDetails/");
  dbRef.on("value", function (snapshot) {
    const data = snapshot.val();
    for (var key in data) {
      staff_ids.push(key);
    }
  });

  const [staff_picker, setstaff_picker] = useState(staff_ids[0]);
  const schedule = () => {
    db.ref(`staff/PickUp/${staff_picker}/`).push({
      userId: userId,
      orderId: orderId,
    });
    alert("Scheduled Staff successfully for Order No:" + orderId);
  };
  return (
    <View style={styles.card}>
      <View style={styles.detailsContainer}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#051d5f" }}>
          USER ID
        </Text>
        <Text style={{ fontSize: 15, color: "#2f4f4f" }}>{userId}</Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#051d5f",
            marginTop: 10,
          }}
        >
          ORDER ID
        </Text>
        <Text style={{ fontSize: 15, color: "#2f4f4f" }}>{orderId}</Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#051d5f",
            marginTop: 10,
          }}
        >
          Select Delivery Boy
        </Text>
        <Picker
          selectedValue={staff_picker}
          style={[styles.inputsingle, { height: 50, width: 200 }]}
          onValueChange={(itemValue, itemIndex) => setstaff_picker(itemValue)}
        >
          <Picker.Item
            label="Staff 1"
            value={staff_ids[0]}
            style={styles.labelPicker}
          />
          <Picker.Item
            label="Staff 2"
            value={staff_ids[1]}
            style={styles.labelPicker}
          />
          <Picker.Item
            label="Staff 3"
            value={staff_ids[2]}
            style={styles.labelPicker}
          />
          <Picker.Item
            label="Staff 4"
            value={staff_ids[3]}
            style={styles.labelPicker}
          />
        </Picker>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View style={styles.buttonStyle}>
          <FormButton buttonTitle="Invoice" onPress={genInvoice} />
        </View>
        <View style={styles.buttonStyle}>
          <FormButton
            buttonTitle="Schedule"
            onPress={() => {
              schedule();
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: "#fff",
    marginBottom: 20,
    overflow: "hidden",
    padding: 20,
  },
  detailsContainer: {
    marginTop: 5,
  },
  image: {
    width: "100%",
    height: 200,
  },
  buttonStyle: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
});

export default CardSchedule;
