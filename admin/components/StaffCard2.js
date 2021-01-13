import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

function StaffCard2({ staffName,staffNum,staffId }) {
  return (
    <View style={styles.card}>
      <View style={styles.detailsContainer}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#051d5f" }}>
          STAFF NAME
        </Text>
        <Text style={{ fontSize: 15, color: "#2f4f4f" }}>{staffName}</Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#051d5f",
            marginTop: 10,
          }}
        >
          STAFF PHONE NUMBER
        </Text>
        <Text style={{ fontSize: 15, color: "#2f4f4f" }}>{staffNum}</Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#051d5f",
            marginTop: 10,
          }}
        >
          STAFF ID
        </Text>
        <Text style={{ fontSize: 15, color: "#2f4f4f" }}>{staffId}</Text>
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
});

export default StaffCard2;
