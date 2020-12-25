import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { AuthContext } from "../navigation/AuthProvider";
import Icon from "react-native-vector-icons/Ionicons";

const RequestsScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}><Image
          style={styles.avatar}
          source={{ uri: "https://image.freepik.com/free-vector/documents-with-office-briefcase-vector-illustration-flat-cartoon-style_101884-104.jpg" }}
        /></View>
        
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{user.uid}</Text>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.navigate("Leave")}
            >
              <Text style={styles.textStyle}>Leave</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                {};
              }}
            >
              <Text style={styles.textStyle}>Appraisal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {}}
            >
              <Text style={styles.textStyle}>Reschedule</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RequestsScreen;
const styles = StyleSheet.create({
  header: {
    height: 230,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  name: {
    fontSize: 25,
    color: "#696969",
    fontWeight: "600",
  },

  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  avatar: {
    width: '100%',
    height: 250,
    borderWidth: 4,
    alignSelf: "center",
    position: "absolute",
  },
  textStyle:{
      fontWeight:'bold',
      color: "white",
  }
});
