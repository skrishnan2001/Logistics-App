import React, { useState, useContext } from "react";
import * as firebase from "firebase";
//import Cards from "../components/Cards";
import CardSchedule from "../components/CardSchedule";
import { View, FlatList, Picker, StyleSheet, Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import FormInput from "../components/FormInput";
import { AuthContext } from "../navigation/AuthProvider";

const Track = ({ navigation }) => {
  var users = [];
  const { user } = useContext(AuthContext);
  var userId = user.uid;
  const [user_id, setuserid] = useState();
  const [staff_id, setstaffid] = useState();
  const [order_id, setorderid] = useState();
  const [arrHolder, setarrHolder] = useState(users);
  var dbRef = firebase.database().ref(`/users/booking`);
  dbRef.on("value", function (snapshot) {
    const data = snapshot.val();
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var val = data[key];
        for (var key1 in val) {
          if (val.hasOwnProperty(key1)) {
            var val1 = val[key1];
            if (val1["isScheduled"] == "Undelivered") {
          
          let user = {
            id:
              new Date().getTime().toString() +
              Math.floor(
                Math.random() * Math.floor(new Date().getTime())
              ).toString(),
            userid: key,
            orderid: key1,
            staffid:val1["StaffId"],
            type: val1["type"],
            category: val1["PickerSelectedVal"],
            pc_del: val1["pincode_delivery"],
            pc_pick: val1["pincode_pickup"],
            prior_booking: val1["Priority_Booking"],
            insurance: val1["insurance"],
            ord_status: val1["isScheduled"],
          };
          users.push(user);
        }
      }
    }
      }
    }
    console.log(users);
  });
  var data_history = users;
  const [PickerSelectedVal, setPickerSelectedVal] = useState("orderid");
  const Check = (user_id, order_id, staff_id ,item) => {
    setuserid(user_id);
    setorderid(order_id);   
    navigation.navigate("Track-Order", {
        user_id: user_id,
        order_id: order_id,
        staff_id: staff_id,
    });
  };

  const filter_func = (text) => {
    const newData = data_history.filter((items) => {
      var order = items[`${PickerSelectedVal}`];
      if (
        PickerSelectedVal == "prior_booking" ||
        PickerSelectedVal == "insurance"
      ) {
        if (items[`${PickerSelectedVal}`]) order = "Yes";
        else order = "No";
      }
      console.log(items[`${PickerSelectedVal}`]);
      console.log(order.includes(text));
      return order.includes(text);
    });
    setarrHolder(newData);
  };
  console.log(data_history);
  return (
    <View
      style={{
        backgroundColor: "#f8f4f4",
        padding: 20,
        flex: 1,
      }}
    >
      <Text style={[styles.text, { marginTop: 20 }]}>Search Filter</Text>
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
        <Picker.Item
          label="Category"
          value="category"
          style={styles.labelPicker}
        />
        <Picker.Item label="Type" value="type" style={styles.labelPicker} />
        <Picker.Item
          label="Insurance"
          value="insurance"
          style={styles.labelPicker}
        />
        <Picker.Item
          label="Priority Booking"
          value="prior_booking"
          style={styles.labelPicker}
        />
        <Picker.Item
          label="Pincode(Delivery)"
          value="pc_del"
          style={styles.labelPicker}
        />
        <Picker.Item
          label="Pincode(Pickup)"
          value="pc_pick"
          style={styles.labelPicker}
        />
      </Picker>
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
            onPress={Check.bind(this, item.userid, item.orderid,item.staffid)}
          >
            <CardSchedule userId={item.userid} orderId={item.orderid} staffId={item.staffid} />
          </TouchableWithoutFeedback>
        )}
        style={{ marginTop: 10 }}
      />
    </View>
  );
};

export default Track;

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
