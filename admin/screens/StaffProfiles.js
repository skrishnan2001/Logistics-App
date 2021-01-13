import React, { useState } from "react";
import * as firebase from "firebase";
import StaffCard2 from "../components/StaffCard2";
import { View, FlatList, Picker, StyleSheet, Text, Button } from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import FormInput from "../components/FormInput";

const StaffProfile = ({ navigation }) => {
  var users = [];
  var dbRef = firebase.database().ref("/staff/ProfileDetails/");
  dbRef.on("value", function (snapshot) {
    const data = snapshot.val();
    //var i = 0;
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var val = data[key];
        
            let user = {
              id: new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString(),
              staffid: key,
              name: val["Name"],
              PhoneNum: val["Phone_number"],
              VehicleNum: val["VehicleNum"],
              VehicleType: val["Vehicle_Type"],
              aadharNo: val["aadharNo"],
            };
            //i++;
            users.push(user);
      }
    }
  });
  const [user_id, setuserid] = useState();
  const [arrHolder, setarrHolder] = useState(users);
  // const [data_history, setdata_history] = useState(users);
  var data_history = users;
  const [PickerSelectedVal, setPickerSelectedVal] = useState("staffid");
  const Check = (staffid, item) => {
    setuserid(user_id);
    navigation.navigate("StaffProfileTable", {
      user_id: staffid,
      screen: "StaffProfiles",
    });
  };

  const filter_func = (text) => {
    const newData = data_history.filter((items) => {
      var order = items[`${PickerSelectedVal}`];
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
      <View style={{ flexDirection: "row" }}>
        <View style={styles.buttonStyle}>
          <Text style={[styles.text, { marginTop: 20, flexDirection: "row" }]}>Filter By</Text>

          <Picker
            selectedValue={PickerSelectedVal}
            style={[styles.inputsingle, { height: 50, width: 155 }]}
            onValueChange={(itemValue, itemIndex) =>
              setPickerSelectedVal(itemValue)
            }
          >
            <Picker.Item
              label="Staff ID"
              value="staffid"
              style={styles.labelPicker}
            />
            <Picker.Item
              label="Staff Name"
              value="name"
              style={styles.labelPicker}
            />
            <Picker.Item
              label="Staff Phone Number"
              value="PhoneNum"
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
          <TouchableOpacity
            onPress={Check.bind(this, item.staffid)}
          >
            <StaffCard2 staffName={item.name} staffNum={item.PhoneNum} staffId={item.staffid}/>
          </TouchableOpacity>
        )}
        style={{ marginTop: 10 }}
      />
    </View>
  );
};

export default StaffProfile;

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
