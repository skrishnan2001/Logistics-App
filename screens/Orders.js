import React from 'react';
import * as firebase from "firebase";
import Card from "../app/components/Card";
import { View, FlatList } from 'react-native';



function Orders(props) {
    var users = [];
    var dbRef = firebase.database().ref("/users/booking/");
    dbRef.on("value", function (snapshot) {
        const data = snapshot.val();
        var i=0;
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
  });
  
  return (
    <View style={{
        backgroundColor: '#f8f4f4',
        padding: 20,
        paddingTop: 100
        }} 
    >
        <FlatList 
            data={users}
            keyExtractor={user => user.id}
            renderItem={({ item }) =>
                <Card
                    userId={item.userid}
                    orderId={item.orderid}
                    type={item.type}
                    weight={item.weight}
                />      
            }
        />
    </View>
  );
}

export default Orders;
