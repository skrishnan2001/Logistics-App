import React, { useState } from "react";
import * as firebase from "firebase";
import Cards from "../components/Cards";
import { View, FlatList, TextInput } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import FormInput from "../components/FormInput";

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
    //console.log(users);
  });
  const [user_id, setuserid] = useState();
  const [order_id, setorderid] = useState();
  const [arrHolder, setarrHolder] = useState(users);
  const [data_history, setdata_history] = useState(users);
  const Check = (user_id, order_id, item) => {
    setuserid(user_id);
    setorderid(order_id);
    navigation.navigate("Invoice", { user_id: user_id, order_id: order_id });
  };

  const filter_func = (text) => {
    const newData = data_history.filter((items) => {
      var order = items.orderid;
      //console.log(order.includes(text));
      return order.includes(text);
    });
    setarrHolder(newData);
  };
  // console.log(data_history);
  return (
    <View
      style={{
        backgroundColor: "#f8f4f4",
        padding: 20,
        paddingTop: 50,
        flex: 1
      }}
    >

      <FormInput
        onChangeText={(text) => filter_func(text)}
        placeholderText="Search..."
        iconType="search1"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FlatList
        style={{ marginTop: 10 }}
        data={arrHolder}
        keyExtractor={(user) => user.id}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={Check.bind(this, item.userid, item.orderid)}
          >
            <Cards userId={item.userid} orderId={item.orderid} />
          </TouchableWithoutFeedback>
        )}
      />
    </View>
  );
};

export default Orders;