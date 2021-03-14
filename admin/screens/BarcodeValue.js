import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import FormButton from "../components/FormButton";
import Cards from "../components/Cards";

const BarcodeValue = ({ route, navigation }) => {
  const { user_id, order_id } = route.params;
  console.log(user_id);
  console.log(order_id);
  return (
    <View style={styles.container}>
      <Cards userId={user_id} orderId={order_id} />
      <FormButton
        buttonTitle="View Invoice"
        onPress={() => {
          navigation.navigate("Invoice", {
            user_id: user_id,
            order_id: order_id,
          });
        }}
      />
    </View>
  );
};
export default BarcodeValue;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
    justifyContent: "center",
  },
});
