import React, { useState } from "react";
import * as firebase from "firebase";
import Cards from "../components/Cards";
import FormButton from "../components/FormButton";
import {
  View,
  FlatList,
  Picker,
  StyleSheet,
  Text,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import FormInput from "../components/FormInput";

const Sort = ({ navigation }) => {
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
              city_pickup: val_2["city_pickup"],
              state_pickup: val_2["state_pickup"],
              city_delivery: val_2["city_delivery"],
              state_delivery: val_2["state_delivery"],
              pc_del: val_2["pincode_delivery"],
              pc_pick: val_2["pincode_pickup"],
            };
            i++;
            users.push(user);
          }
        }
      }
    }
  });
  const [user_id, setuserid] = useState();
  const [order_id, setorderid] = useState();
  const [arrHolder, setarrHolder] = useState(users);
  // const [data_history, setdata_history] = useState(users);
  var data_history = users;
  const Check = (user_id, order_id, item) => {
    setuserid(user_id);
    setorderid(order_id);
    navigation.navigate("Invoice", { user_id: user_id, order_id: order_id });
  };

  const [state, setstate] = useState();
  const [city, setcity] = useState();
  const [pincode, setpincode] = useState();

  const filter_func = (text1, text2, text3) => {
    const newData = data_history.filter((items) => {
      var order = items.state_pickup;
      var order1 = items.city_pickup;
      var order2 = items.pc_pick;
      //console.log(order.includes(text));
      return (order.includes(text1) && order1.includes(text2) && order2.includes(text3));
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
      

      <FormInput
        onChangeText={(text) => setstate(text)}
        placeholderText="State"
        iconType="search1"
        autoCapitalize="none"
        autoCorrect={false}
      />
     <FormInput
        onChangeText={(text) => setcity(text)}
        placeholderText="City"
        iconType="search1"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormInput
        onChangeText={(text) => setpincode(text)}
        placeholderText="Pincode"
        iconType="search1"
        autoCapitalize="none"
        autoCorrect={false}
     />

    <FormButton buttonTitle="Sort" onPress={filter_func.bind(this, state, city, pincode)} />

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
});