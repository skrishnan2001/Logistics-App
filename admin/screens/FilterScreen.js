import React, {useState, useEffect} from 'react';
import * as firebase from "firebase";
import FormButton from "../components/FormButton";
import { View, TextInput, StyleSheet, Text, } from "react-native";
import FormInput from "../components/FormInput";

function FilterScreen({ navigation }) {
var users = [];

  var dbRef = firebase.database().ref("/users/booking/");
  dbRef.on("value", function (snapshot) {
    const data = snapshot.val();
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var val = data[key];
        for (var key_2 in val) {
          if (val.hasOwnProperty(key_2)) {
            var val_2 = val[key_2];
            if (val_2["isScheduled"] == "Not Yet Scheduled") {
              let user = {
                id:
                  new Date().getTime().toString() +
                  Math.floor(
                    Math.random() * Math.floor(new Date().getTime())
                  ).toString(),
                userid: key,
                orderid: key_2,
                city_pickup: val_2["city_pickup"],
                state_pickup: val_2["state_pickup"],
                city_delivery: val_2["city_delivery"],
                state_delivery: val_2["state_delivery"],
                pc_del: val_2["pincode_delivery"],
                pc_pick: val_2["pincode_pickup"],
                time: val_2["Time"],
              };
              users.push(user);
            }
          }
        }
      }
    }
  });




  var arrHolder = [];
  var volume="";
  var weight="";
  var searchtext="";
  var vehicle_type = "";

  const filter_func = (text1) => {
    const newData = users.filter((items) => {
      var order = items.state_pickup;
      var order1 = items.city_pickup;
      var order2 = items.pc_pick;
      return (
        order.includes(text1) ||
        order1.includes(text1) ||
        order2.includes(text1)
      );
    });
    arrHolder = newData;
  };

  const VehiclePicker = () => {
    if (volume < 3 || weight < 5) {
      vehicle_type = "two-wheeler";
    } else if ((volume >= 3 && volume < 7) || (weight >= 5 && weight < 50)) {
      vehicle_type = "four-wheeler";
    } else if ((volume >= 7 && volume < 12) || (weight >= 50 && weight < 100)) {
      vehicle_type = "mini-van";
    } else {
      vehicle_type = "truck";
    }
    console.log(vehicle_type);
    console.log(weight,volume,searchtext);
    filter_func(searchtext);
    console.log("users:", users);
    console.log("arrholder:",arrHolder);
    users=[];
    navigation.navigate("Sort", {vehicle_type: vehicle_type, arrHolder: arrHolder})
  };

  return (
    <View
      style={{
        backgroundColor: "#f8f4f4",
        padding: 20,
        flex: 1,
      }}
    >
      <Text style={[styles.text, { marginTop: 20 }]}>Search Filter</Text>

      <FormInput
        onChangeText={(text) => searchtext=text}
        placeholderText="State"
        iconType="search1"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        onChangeText={(text) => searchtext=text}
        placeholderText="City"
        iconType="search1"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        onChangeText={(text) => searchtext=text}
        placeholderText="Pincode"
        iconType="search1"
        autoCapitalize="none"
        keyboardType="number-pad"
        autoCorrect={false}
        maxLength={6}
      />

      {/* <FormButton
        buttonTitle="Sort"
        onPress={filter_func.bind(this, state, city, pincode)}
      /> */}
      <View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.buttonStyle}>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={(text) => volume=text}
                style={styles.input}
                placeholder="Volume"
                numberOfLines={1}
                placeholderTextColor="#666"
                autoCapitalize="none"
                keyboardType="number-pad"
                autoCorrect={false}
                maxLength={6}
              />
            </View>
          </View>
          <View style={styles.buttonStyle}>
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={(text) => weight=text}
                style={styles.input}
                placeholder="Weight"
                numberOfLines={1}
                placeholderTextColor="#666"
                autoCapitalize="none"
                keyboardType="number-pad"
                autoCorrect={false}
                maxLength={6}
              />
            </View>
          </View>
          <View style={styles.buttonStyle}>
            <FormButton buttonTitle="Filter" onPress={VehiclePicker} />
          </View>

        </View>  
      </View>
    </View>
  );
}

export default FilterScreen;

const styles = StyleSheet.create({
    
    
    text: {
      color: "#051d5f",
      fontSize: 20,
      fontWeight: "bold",
    },
    buttonStyle: {
      marginHorizontal: "2%",
      marginVertical: 10,
      width: "30%",
    },
    inputContainer: {
      marginTop: 12.5,
      //marginBottom: 10,
      borderColor: '#ccc',
      borderRadius: 3,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff'
    },
    input: {
      padding: 10,
      flex: 1,
      fontSize: 16,
    },
  });