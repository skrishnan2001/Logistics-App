import React, { useState } from "react";
import * as firebase from "firebase";
import Cards from "../components/Cards";
import FormButton from "../components/FormButton";
import { View, FlatList, TextInput, StyleSheet, Text, Alert } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import FormInput from "../components/FormInput";
import { db } from "../firebaseConfig";
import DropDownPicker from 'react-native-dropdown-picker';


const Sort = ({ route, navigation }) => {
  let controller;
  const [staff_picker, setstaff_picker] = useState("");
  const [Shift, setshift_picker] = useState("");
  
  var staffs = [];
  var dbRef = firebase.database().ref("/staff/ProfileDetails/");
  dbRef.on("value", function (snapshot) {
    const data = snapshot.val();
    for (var key in data) {
      var val = data[key];
      if (val["Vehicle_Type"] === route.params.vehicle_type) {
        let staff = {
          staff_id: key,
          label: val["Name"]
        };
        staffs.push(staff);
      }
    }
  });

  var shifts = [
    { label: 'Shift 1' },
    { label: 'Shift 2' },
    { label: 'Shift 3' },
  ];

  const [arrHolder, setarrHolder] = useState(route.params.arrHolder);

  const test = () => {
    arrHolder.forEach((obj) => {
      var userId = obj["userid"];
      var orderId = obj["orderid"];
      db.ref(`/users/booking/${userId}/${orderId}`).update({
        isScheduled: "Undelivered",
        StaffId: staff_picker,
      });
      db.ref(`staff/Undelivered/${staff_picker}/`).push({
        userId: userId,
        orderId: orderId,
        Shift: Shift,
      });
      db.ref(`admin/ScheduledOrders/${Shift}/`).push({
        StaffId: staff_picker,
        userId: userId,
        orderId: orderId,
      });
      db.ref(`staff/ProfileDetails/${staff_picker}/notifications`).push({
        title: "Order Scheduled",
        body : `Order ${orderId} has been scheduled`
      });
      db.ref(`users/booking/${userId}/notifications`).push({
        title: "Order Scheduled",
        body : `Order ${orderId} has been scheduled`
      });
    });
    Alert.alert("The orders have been scheduled");
    setarrHolder([]);
    staffs=[];
    count = 0;
  };
  const [user_id, setuserid] = useState();
  const [order_id, setorderid] = useState();
  
  const Check = (user_id, order_id, item) => {
    setuserid(user_id);
    setorderid(order_id);
    navigation.navigate("Invoice", { user_id: user_id, order_id: order_id });
  };



  // const [state, setstate] = useState();
  // const [city, setcity] = useState();
  // const [pincode, setpincode] = useState();

  
  var count = 0;
  for (var j in arrHolder) {
    if (arrHolder.hasOwnProperty(j)) {
      count += 1;
    }
  };
  return (
    <View
      style={{
        backgroundColor: "#f8f4f4",
        padding: 20,
        flex: 1,
      }}
    >
      <View style={styles.buttonStyle}>
            <FormButton buttonTitle="Back" onPress={() => navigation.goBack()} />
      </View>
      <Text style={[styles.text, { marginTop: 20 }]}>Orders To Be Scheduled</Text>

       
      {/* <FormButton
        buttonTitle="Sort"
        onPress={filter_func.bind(this, state, city, pincode)}
      /> */}
      <View>
        
        <View style={{ flexDirection: "row" }}>
          <View style={styles.buttonStyle}>
            <DropDownPicker
              items={staffs}
              controller={instance => controller = instance}
              placeholder="Select Staff"
              onChangeItem={item => setstaff_picker(item.staff_id)}
              containerStyle={{ marginTop: 10, height: 50, width: 100 }}
              labelStyle={{ color: '#2e64e5' }}
            />
          </View>
          <View style={styles.buttonStyle}>
            <DropDownPicker
              items={shifts}
              placeholder="Select Shift"
              onChangeItem={item => setshift_picker(item.label)}
              containerStyle={{ marginTop: 10, height: 50, width: 100 }}
              labelStyle={{ color: '#2e64e5' }}
              itemStyle={{ borderColor: 'black', borderWidth: 1, }}
            />
          </View>
          <View style={styles.buttonStyle}>
            <FormButton buttonTitle="Schedule" onPress={test} />
          </View>
        </View>
      </View>

      <Text style={[styles.text, { marginTop: 20 }]}>
        Number of orders is {count}
      </Text>
      <FlatList
        data={arrHolder}
        keyExtractor={(user) => user.id}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={Check.bind(this, item.userid, item.orderid)}
          >
            <Cards userId={item.userid} orderId={item.orderid} />
          </TouchableWithoutFeedback>
        )}
        style={{ marginTop: 10 }}
      />
    </View>
  );
};

export default Sort;

const styles = StyleSheet.create({
  inputsingle: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 5,
    marginTop: 10,
    borderRadius: 125,
    marginBottom: 5,
    width: 250,
    height: 30,
    color: "#2e64e5",
    backgroundColor: "#465881",
  },
  labelPicker: {
    fontSize: 18,
  },
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
    marginTop: 5,
    marginBottom: 10,
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

    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
});