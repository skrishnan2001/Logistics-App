import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";
import * as firebase from "firebase";
import Cards from "../components/Cards";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";


const HomeScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  var deliveries = [];
  var dbRef = firebase.database().ref(`/staff/PickUp/${user.uid}/`);
  dbRef.on("value", function (snapshot) {
    const data = snapshot.val();
    var i = 0;
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var val = data[key];
        let delivery = {
          id: i.toString(),
          userid: val.userId,
          orderid: val.orderId,
        };
        i++;
        deliveries.push(delivery);
      }
    }
  });

  const [user_id, setuserid] = useState();
  const [order_id, setorderid] = useState();

  const Check = (user_id, order_id, item) => {
    setuserid(user_id);
    setorderid(order_id);
    navigation.navigate("Invoice", { user_id: user_id, order_id: order_id });
  };

  return (
    <>
      <FormButton buttonTitle="Logout" onPress={() => logout()} />
      <FlatList
        data={deliveries}
        keyExtractor={(delivery) => delivery.id}
        renderItem={({ item }) => (
          <View>
            <TouchableWithoutFeedback
            onPress={Check.bind(this, item.userid, item.orderid)}
            >
              <Cards
                userId={item.userid}
                orderId={item.orderid}
              />
            </TouchableWithoutFeedback>
          </View>
        )}
        style={{ marginTop: 10 }}
      />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: "#333333",
  },
});

{/*<Cards 
  userId="Eswar"
  orderId="1"
/>*/}