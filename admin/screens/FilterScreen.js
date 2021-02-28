import React, {useState, useEffect} from 'react';
import * as firebase from "firebase";
import FormButton from "../components/FormButton";
import { View, TextInput, StyleSheet, Text, } from "react-native";
import FormInput from "../components/FormInput";
import DropDownPicker from 'react-native-dropdown-picker';

function FilterScreen({ navigation }) {
  var vehicles = [
    { label: '2-Wheeler', value: "two-wheeler" },
    { label: '4-Wheeler', value: "four-wheeler" },
    { label: 'Mini-Van', value: "mini-van" },
    { label: 'Truck', value: "truck" },
  ];
  var orders = [
    { label: 'Break-Bulk', value: "Break-Bulk" },
    { label: 'Bulk', value: "Bulk" },
  ];
  var users=[];
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
  var searchtext="";
  var vehicle_type = "";
  var order_type = "";
  
  const userlist = () =>{
    users=[];
    var dbRef = firebase.database().ref("/users/booking/");
    dbRef.on("value", function (snapshot) {
      const data = snapshot.val();
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var val = data[key];
          for (var key_2 in val) {
            if (val.hasOwnProperty(key_2)) {
              var val_2 = val[key_2];
              if (val_2["isScheduled"] == "Not Yet Scheduled" 
                    && val_2["PickerSelectedVal"] == order_type 
                      && val_2["vehicle"] == vehicle_type) {
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
                  length: val_2["length"],
                  breadth: val_2["breadth"],
                  height: val_2["height"],
                  weight: val_2["weight"],
                  vehicle: val_2["vehicle"],
                };
                users.push(user);
              }
            }
          }
        }
      }
    });
  };
  
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
      arrHolder=newData;
  };
  
    const VehiclePicker = () => {
      
      console.log(vehicle_type);
      console.log(searchtext);
      userlist();
      filter_func(searchtext);
      console.log("users:", users);
      console.log("arrholder:",arrHolder);
      navigation.navigate("Sort", {vehicle_type: vehicle_type, arrHolder: arrHolder, order_type: order_type})
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
      
      <View>
        <View style={{ flexDirection: "row" }}>
        <View style={styles.buttonStyle}>
              <DropDownPicker
                items={orders}
                placeholder="Select order"
                onChangeItem={item => order_type=item.value}
                containerStyle={{ marginTop: 10, height: 50, width: 100 }}
                labelStyle={{ color: '#2e64e5' }}
              />
          </View>
          
          <View style={styles.buttonStyle}>
              <DropDownPicker
                items={vehicles}
                placeholder="Select Vehicle"
                onChangeItem={item => vehicle_type=item.value}
                containerStyle={{ marginTop: 10, height: 50, width: 100 }}
                labelStyle={{ color: '#2e64e5' }}
              />
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
      width: "40%",
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
