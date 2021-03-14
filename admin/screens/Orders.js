import React, { useState } from "react";
import * as firebase from "firebase";
import Cards from "../components/Cards";
import { View, FlatList, Picker, StyleSheet, Text, Button } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import moment from "moment";
import DatePicker from "react-native-datepicker";

const Orders = ({ navigation }) => {
  const yourDate = new Date();
  //const NewDate = moment(yourDate, 'DD-MM-YYYY')
  const shorttime =
    yourDate.getDate() +
    "-" +
    (yourDate.getMonth() + 1) +
    "-" +
    yourDate.getFullYear();
  const [selectdate, setdate] = useState(shorttime);
  //console.log(selectdate);

  var users = [];
  var dbRef = firebase.database().ref("/users/booking/");
  dbRef.on("value", function (snapshot) {
    const data = snapshot.val();
    //var i = 0;
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var val = data[key];
        for (var key_2 in val) {
          if (val.hasOwnProperty(key_2)) {
            var val_2 = val[key_2];
            var checktime = new Date(val_2["Time"]);
            var check_time =
              checktime.getDate() +
              "-" +
              (checktime.getMonth() + 1) +
              "-" +
              checktime.getFullYear();
            if (check_time == selectdate) {
              let user = {
                id:
                  new Date().getTime().toString() +
                  Math.floor(
                    Math.random() * Math.floor(new Date().getTime())
                  ).toString(),
                userid: key,
                orderid: key_2,
                type: val_2["type"],
                category: val_2["PickerSelectedVal"],
                pc_del: val_2["pincode_delivery"],
                pc_pick: val_2["pincode_pickup"],
                prior_booking: val_2["Priority_Booking"],
                insurance: val_2["insurance"],
                time: val_2["Time"],
              };
              users.push(user);
            }
            //i++;
          }
        }
      }
    }
    //console.log(users);
  });
  const [user_id, setuserid] = useState();
  const [order_id, setorderid] = useState();
  const [arrHolder, setarrHolder] = useState(users);
  // const [data_history, setdata_history] = useState(users);
  var data_history = users;
  const [PickerSelectedVal, setPickerSelectedVal] = useState("orderid");
  const [PickerSelectedVal1, setPickerSelectedVal1] = useState("ascending");
  const Check = (user_id, order_id, item) => {
    setuserid(user_id);
    setorderid(order_id);
    navigation.navigate("Invoice", {
      user_id: user_id,
      order_id: order_id,
      screen: "Orders",
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
      return order.includes(text);
    });
    if (PickerSelectedVal1 == "ascending") {
      newData.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a["time"]) - new Date(b["time"]);
      });
      console.log(newData);
    }
    if (PickerSelectedVal1 == "descending") {
      newData.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b["time"]) - new Date(a["time"]);
      });
      console.log(newData);
    }
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
      <View>
        <Text style={[styles.text, { marginTop: 20, flexDirection: "row" }]}>
          Select Date
        </Text>

        <DatePicker
          style={styles.datePickerStyle}
          date={selectdate} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="D-M-YYYY"
          minDate={new Date(Date.now() - 24 * 60 * 60 * 1000 * 7 * 4 * 12)}
          maxDate={new Date(Date.now() + 24 * 60 * 60 * 1000 * 7 * 4 * 12)}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
              borderWidth: 0,
            },
          }}
          onDateChange={(date) => {
            setdate(date);
            setarrHolder([]);
          }}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.buttonStyle}>
          <Text style={[styles.text, { marginTop: 20, flexDirection: "row" }]}>
            Filter By
          </Text>

          <Picker
            selectedValue={PickerSelectedVal}
            style={[styles.inputsingle, { height: 50, width: 155 }]}
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
        </View>
        <View style={styles.buttonStyle}>
          <Text style={[styles.text, { marginTop: 20, flexDirection: "row" }]}>
            {" "}
            Filter by time
          </Text>

          <Picker
            selectedValue={PickerSelectedVal1}
            style={[styles.inputsingle, { height: 50, width: 200 }]}
            onValueChange={(itemValue, itemIndex) =>
              setPickerSelectedVal1(itemValue)
            }
          >
            <Picker.Item
              label="Ascending"
              value="ascending"
              style={styles.labelPicker}
            />
            <Picker.Item
              label="Descending"
              value="descending"
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

      {/*<FormButton buttonTitle="Find Orders" onPress={findorders} />*/}

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

export default Orders;

const styles = StyleSheet.create({
  inputsingle: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 1,
    marginTop: -5,
    borderRadius: 125,
    marginBottom: 5,
    width: 50,
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
  datePickerStyle: {
    width: "100%",
    marginTop: 10,
    borderColor: "#ccc",
    borderRadius: 3,
    borderWidth: 0,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 5,
  },
});
