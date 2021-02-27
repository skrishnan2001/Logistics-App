import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Image,
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Text,
} from "react-native";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import { windowHeight } from "../utils/Dimensions";
import moment from "moment";
import DatePicker from "react-native-datepicker";
import { AuthContext } from "../navigation/AuthProvider";
import { db } from "../firebaseConfig";
import { ScrollView } from "react-native-gesture-handler";

export default function Reschedule({ navigation }) {
  const { user } = useContext(AuthContext);
  const yourDate = new Date();
  const NewDate = moment(yourDate, "DD-MM-YYYY");
  const [fromdate, setfromdate] = useState(NewDate);
  const [reason, setReason] = useState("");
  const [orderid, setorderid] = useState("");

  var addItems = () => {
    db.ref(`/staff/Requests/Reschedule/${user.uid}`).push({
      Reschedule_to: fromdate.toLocaleString(),
      Reason: reason,
      Orderid: orderid,
    });
    db.ref(`/admin/Reschedule`).push({
      staffId: user.uid,
      Reschedule_to: fromdate.toLocaleString(),
      Reason: reason,
      Orderid: orderid,
    });
  };

  const updateHandle = () => {
    addItems();
    Alert.alert("Your request for leave has been sent!");
    navigation.navigate("Requests");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View style={styles.header}>
            <Image
              style={styles.avatar}
              source={{
                uri:
                  "https://image.freepik.com/free-vector/documents-with-office-briefcase-vector-illustration-flat-cartoon-style_101884-104.jpg",
              }}
            />
          </View>
          <View style={{ marginTop: 65, marginHorizontal: 20 }}>
            <Text style={[styles.text, { marginTop: 20 }]}>Enter Order Id</Text>
            <FormInput
              labelValue={orderid}
              onChangeText={(text) => setorderid(text)}
              placeholderText="Order Id..."
              autoCorrect={false}
              multiline={true}
            />
            <Text style={[styles.text]}>Reschedule to</Text>

            <DatePicker
              style={styles.datePickerStyle}
              date={fromdate} // Initial date from state
              mode="date" // The enum of date, datetime and time
              placeholder="select date"
              format="DD-MM-YYYY"
              minDate={new Date(Date.now())}
              maxDate={new Date(Date.now() + 24 * 60 * 60 * 1000 * 7 * 4 * 3)}
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
                setfromdate(date);
              }}
            />
            <Text style={[styles.text, { marginTop: 20 }]}>Reason</Text>
            <FormInput
              labelValue={reason}
              onChangeText={(text) => setReason(text)}
              placeholderText="Reason for Reschedule..."
              autoCorrect={false}
              multiline={true}
            />
            <FormButton
              buttonTitle="Request"
              style={styles.buttonContainer}
              onPress={updateHandle}
            />
            <FormButton
              style={[
                styles.buttonContainer,
                { backgroundColor: "#2e64e5", marginTop: 20, marginBottom: 20 },
              ]}
              buttonTitle="Back"
              onPress={() => navigation.navigate("Requests")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    padding: 20,
  },
  header: {
    height: 200,
  },
  avatar: {
    width: "100%",
    height: 250,
    borderWidth: 4,
    alignSelf: "center",
    position: "absolute",
  },
  buttonContainer: {
    marginTop: 40,
    width: "100%",
    height: windowHeight / 15,
    backgroundColor: "crimson",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
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
  text: {
    color: "#051d5f",
    fontSize: 18,
    fontWeight: "bold",
  },
});
