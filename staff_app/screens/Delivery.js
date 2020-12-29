import React, { useContext } from "react";
import { View, Text, StyleSheet,Alert } from "react-native";
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";
import * as firebase from "firebase";

const Delivery = () => {
  const { user, logout } = useContext(AuthContext);
  Alert.alert("Update your profile to get your consignment");

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome {user.uid}</Text>
      <FormButton buttonTitle="Logout" onPress={() => logout()} />
    </View>
  );
};

export default Delivery;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: "#333333",
  },
});
