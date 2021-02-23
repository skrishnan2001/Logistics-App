import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import FormButton from "./FormButton";
import { db } from "../firebaseConfig";

const LeaveCard = ({ itemData }) => {
  console.log(itemData);
  const req_finalise = (status) => {
    var ref = db.ref(`/staff/ProfileDetails/${itemData.staffId}/notifications`);
    ref.push({
      title: "Leave " + status,
      body: "Leave Request for the period " + itemData.period + " " + status,
    });
    var dbref = db.ref(`/admin/Leaves/`);
    dbref.child(`${itemData.key}`).remove();
  };
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.card}>
        <View style={styles.detailsContainer}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#051d5f" }}>
            {itemData.staffId}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#051d5f",
              marginTop: 10,
            }}
          >
            {itemData.Reason.toUpperCase()}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#051d5f",
              marginTop: 10,
            }}
          >
            {itemData.period}
          </Text>
          <FormButton
            buttonTitle="ACCEPT"
            onPress={req_finalise.bind(this, "Accepted")}
          />
          <FormButton
            buttonTitle="REJECT"
            onPress={req_finalise.bind(this, "Rejected")}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: "#fff",
    marginVertical: 20,
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
});

export default LeaveCard;
