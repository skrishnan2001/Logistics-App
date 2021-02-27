import React, { useState, useContext } from "react";
import * as firebase from "firebase";
import CardReq from "../components/CardReq";
import { View, FlatList, Picker, StyleSheet, Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import FormInput from "../components/FormInput";
import { AuthContext } from "../navigation/AuthProvider";

const Request = ({ navigation }) => {
    var users = [];
    const { user } = useContext(AuthContext);
    var userId = user.uid;
    const [arrHolder, setarrHolder] = useState(users);
    const [PickerSelectedVal, setPickerSelectedVal] = useState("Appraisal");
    
    var dbRef = firebase.database().ref(`/staff/Requests/${PickerSelectedVal}`);
    dbRef.on("value", function (snapshot) {
      const data = snapshot.val();
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var val = data[key];
          for (var key1 in val) {
            if (data.hasOwnProperty(key)) {
              var val1 = val[key1];
              //console.log(key);
              //console.log(val1.Reason);
              let user = {
                id:
                  new Date().getTime().toString() +
                  Math.floor(
                    Math.random() * Math.floor(new Date().getTime())
                  ).toString(),
                staffid: key,
                request: val1.Reason,
              };
              users.push(user);
              }
           }
        }
      }
  });
  console.log(users);
    return (
      <View
        style={{
          backgroundColor: "#f8f4f4",
          padding: 20,
          flex: 1,
        }}
      >
        <Text style={[styles.text, { marginTop: 20 }]}>Select Request type</Text>
        <Picker
          selectedValue={PickerSelectedVal}
          style={[styles.inputsingle, { height: 50, width: 200 }]}
          onValueChange={(itemValue, itemIndex) =>
            setPickerSelectedVal(itemValue)
          }
        >
          <Picker.Item
            label="Appraisal"
            value="Appraisal"
            style={styles.labelPicker}
          />
          <Picker.Item
            label="Reschedule"
            value="Reschedule"
            style={styles.labelPicker}
          />
          
        </Picker> 
        <FlatList
          data={users}
          keyExtractor={(user) => user.id}
          renderItem={({ item }) => (
              <CardReq staffId={item.staffid} Reason={item.request} />
            
          )}
          style={{ marginTop: 10 }}
        />
      </View>
    );
  };
  
  export default Request;
  
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
  