import React, { useState } from "react";
import * as firebase from "firebase";
import CardSchedule from "../components/CardSchedule";
import { View, FlatList, Picker, StyleSheet, Text, Button } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import FormInput from "../components/FormInput";

const ScheduledOrders = ({ navigation }) => {
  const [Shift, setshift_picker] = useState("Shift 1");
  var ordersSch = [];
  var dbRef = firebase.database().ref(`admin/ScheduledOrders/${Shift}`);
  dbRef.on("value", function (snapshot) {
    const data = snapshot.val();
    //var i = 0;
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var val = data[key];
        let user = {
          id:
            new Date().getTime().toString() +
            Math.floor(
              Math.random() * Math.floor(new Date().getTime())
            ).toString(),
          userid: val["userId"],
          orderid: val["orderId"],
          staffid: val["StaffId"],
        };
        //i++;
        ordersSch.push(user);
      }
    }
  });
  console.log(ordersSch);
  const [user_id, setuserid] = useState();
  const [order_id, setorderid] = useState();
  const [arrHolder, setarrHolder] = useState(ordersSch);
  var data_history = ordersSch;
  const [PickerSelectedVal, setPickerSelectedVal] = useState("orderid");
  const Check = (user_id, order_id, item) => {
    setuserid(user_id);
    setorderid(order_id);
    navigation.navigate("Invoice", {
      user_id: user_id,
      order_id: order_id,
    });
  };

  const filter_func = (text) => {
    const newData = data_history.filter((items) => {
      var order = items[`${PickerSelectedVal}`];
      // if (
      //     PickerSelectedVal == "prior_booking" ||
      //     PickerSelectedVal == "insurance"
      // ) {
      //     if (items[`${PickerSelectedVal}`]) order = "Yes";
      //     else order = "No";
      // }
      return order.includes(text);
    });

    setarrHolder(newData);
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
      <View style={{ flexDirection: "row" }}>
        <View style={styles.buttonStyle}>
          <Picker
            selectedValue={PickerSelectedVal}
            style={[styles.inputsingle, { height: 50, width: 200 }]}
            onValueChange={(itemValue, itemIndex) =>
              setPickerSelectedVal(itemValue)
            }
          >
            <Picker.Item
              label="Order ID"
              value="orderid"
              style={styles.labelPicker}
            />
            <Picker.Item
              label="User ID"
              value="userid"
              style={styles.labelPicker}
            />
            <Picker.Item
              label="Staff ID"
              value="staffid"
              style={styles.labelPicker}
            />
          </Picker>
        </View>
        <View style={styles.buttonStyle}>
          <Picker
            selectedValue={Shift}
            style={[styles.inputsingle, { height: 50, width: 100 }]}
            onValueChange={(itemValue, itemIndex) => {
              setshift_picker(itemValue);
              setarrHolder([]);
            }}
          >
            <Picker.Item
              label="Shift 1"
              value="Shift 1"
              style={styles.labelPicker}
            />
            <Picker.Item
              label="Shift 2"
              value="Shift 2"
              style={styles.labelPicker}
            />
            <Picker.Item
              label="Shift 3"
              value="Shift 3"
              style={styles.labelPicker}
            />
          </Picker>
        </View>
      </View>
      <FormInput
        onChangeText={(text) => filter_func(text)}
        placeholderText="Search..."
        iconType="search1"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FlatList
        data={arrHolder}
        keyExtractor={(user) => user.id}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={Check.bind(this, item.userid, item.orderid)}
          >
            <CardSchedule
              userId={item.userid}
              orderId={item.orderid}
              staffId={item.staffid}
            />
          </TouchableWithoutFeedback>
        )}
        style={{ marginTop: 10 }}
      />
    </View>
  );
};

export default ScheduledOrders;

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
});