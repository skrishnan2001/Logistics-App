import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import tailwind from "tailwind-rn";

const NotifyCard = ({ itemData }) => {
  console.log("notifycard");
  console.log(itemData);

  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.card}>
        <View style={styles.detailsContainer}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#051d5f" }}>
            {itemData.title.toUpperCase()}
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#051d5f",
              marginTop: 10,
            }}
          >
            {itemData.body}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: "#fff",
    overflow: "hidden",
    padding: 20,
    marginTop: 20,
  },
  detailsContainer: {
    marginTop: 5,
  },
  image: {
    width: "100%",
    height: 200,
  },
});

export default NotifyCard;
