import React, { useState } from "react";
import * as firebase from "firebase";
import Card from "../components/Card";
import { View, FlatList } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import InvoiceScreen from "./InvoiceScreen";

const Orders = ({ navigation }) => {
  var users = [];
  var dbRef = firebase.database().ref("/users/booking/");
  dbRef.on("value", function (snapshot) {
    const data = snapshot.val();
    var i = 0;
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var val = data[key];
        for (var key_2 in val) {
          if (val.hasOwnProperty(key_2)) {
            var val_2 = val[key_2];
            let user = {
              id: i.toString(),
              userid: key,
              orderid: key_2,
              type: val_2["type"],
              weight: val_2["weight"],
            };
            i++;
            users.push(user);
          }
        }
      }
    }
    console.log(users);
  });
  const [user_id, setuserid] = useState();
  const [order_id, setorderid] = useState();

  const Check = (user_id, order_id, item) => {
    setuserid(user_id);
    setorderid(order_id);
    console.log(user_id);
    console.log(order_id);
    navigation.navigate("Invoice", { user_id: user_id, order_id: order_id });
  };

  return (
    <View
      style={{
        backgroundColor: "#f8f4f4",
        padding: 20,
        paddingTop: 50,
      }}
    >
      <FlatList
        data={users}
        keyExtractor={(user) => user.id}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={Check.bind(this, item.userid, item.orderid)}
          >
            <Card
              userId={item.userid}
              orderId={item.orderid}
              type={item.type}
              weight={item.weight}
            />
          </TouchableWithoutFeedback>
        )}
      />
    </View>
  );
};

export default Orders;
