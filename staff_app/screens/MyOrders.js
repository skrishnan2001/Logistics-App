import React, { useState, useContext } from "react";
import * as firebase from "firebase";
import Cards from "../components/Cards";
import { View, FlatList, Picker, StyleSheet, Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import FormInput from "../components/FormInput";
import { AuthContext } from "../navigation/AuthProvider";

const MyOrders = ({ navigation }) => {
  const [Shift, setshift_picker] = useState("Shift 1");
  var my_orders = [];
  var delivered = [];
  const { user } = useContext(AuthContext);
  var userId = user.uid;
  var dbRef = firebase.database().ref(`/staff/Undelivered/${userId}/`);
  var dbRef2 = firebase.database().ref(`/staff/Delivered/${userId}`);
  dbRef.on("value", function (snapshot) {
    const data = snapshot.val();

    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var val = data[key];
        if (val["Shift"] == Shift) {
          let user = {
            id:
              new Date().getTime().toString() +
              Math.floor(
                Math.random() * Math.floor(new Date().getTime())
              ).toString(),
            userid: val["userId"],
            orderid: val["orderId"],
            shift: val["Shift"],
          };
          my_orders.push(user);
        }
      }
    }
    console.log(my_orders);
  });
  dbRef2.on("value", function (snapshot) {
    const data = snapshot.val();

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
        };
        delivered.push(user);
      }
    }
  });
  const [user_id, setuserid] = useState();
  const [order_id, setorderid] = useState();
  const [arrHolder, setarrHolder] = useState(my_orders);
  const [delivery, setdelivery] = useState("Undelivered");
  var data_history = my_orders;
  const [PickerSelectedVal, setPickerSelectedVal] = useState("orderid");
  const Check = (user_id, order_id, item) => {
    setuserid(user_id);
    setorderid(order_id);
    if (delivery == "Undelivered") {
      navigation.navigate("Invoice", {
        user_id: user_id,
        order_id: order_id,
      });
    }
    if (delivery == "Delivered") {
      navigation.navigate("Invoice-Delivered", {
        user_id: user_id,
        order_id: order_id,
        staff_id: userId,
      });
    }
  };

  const filter_func = (text) => {
    if (delivery == "Undelivered") {
      const newData = data_history.filter((items) => {
        var order = items[`${PickerSelectedVal}`];
        return order.includes(text);
      });
      setarrHolder(newData);
    }
    if (delivery == "Delivered") {
      setarrHolder(delivered);
    }
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
        <View style={styles.buttonStyle}>
          <Picker
            selectedValue={delivery}
            style={[styles.inputsingle, { height: 50, width: 100 }]}
            onValueChange={(itemValue, itemIndex) => {
              setdelivery(itemValue);
              setarrHolder([]);
            }}
          >
            <Picker.Item
              label="Undelivered"
              value="Undelivered"
              style={styles.labelPicker}
            />
            <Picker.Item
              label="Delivered"
              value="Delivered"
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
            <Cards userId={item.userid} orderId={item.orderid} />
          </TouchableWithoutFeedback>
        )}
        style={{ marginTop: 10 }}
      />
    </View>
  );
};

export default MyOrders;

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
    marginHorizontal: "3.5%",
    marginVertical: 10,
    width: "20%",
  },
});
