import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Picker,
  CheckBox,
  ScrollView,
} from "react-native";
import { db } from "../firebaseConfig";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";
import * as firebase from "firebase";

const BookingScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const [pickup, setpickup] = useState("");
  const [pickup2, setpickup2] = useState("");
  const [pickup3, setpickup3] = useState("");

  const [delivery, setdelivery] = useState("");
  const [delivery2, setdelivery2] = useState("");
  const [delivery3, setdelivery3] = useState("");

  const [phone, setphone] = useState("");
  const [PickerSelectedVal, setPickerSelectedVal] = useState("Bulk");

  const [dimension, setdimension] = useState("");
  const [dimension2, setdimension2] = useState("");
  const [dimension3, setdimension3] = useState("");

  const [weight, setweight] = useState("");
  const [type, settype] = useState("");
  //const [vehicle, setVehicle] = useState("");
  const [order, setorder] = useState("");
  const [check, setcheck] = useState(false);
  const [Priority, setPriority] = useState(false);
  //----States for handling errors -----
  const [pickuperr, setpickuperr] = useState("");
  const [pickup2err, setpickup2err] = useState("");
  const [pickup3err, setpickup3err] = useState("");

  const [deliveryerr, setdeliveryerr] = useState("");
  const [deliveryerr2, setdeliveryerr2] = useState("");
  const [deliveryerr3, setdeliveryerr3] = useState("");

  const [phoneerr, setphoneerr] = useState("");
  const [PickerSelectedValerr, setPickerSelectedValerr] = useState("");

  const [dimensionerr, setdimensionerr] = useState("");
  const [dimensionerr2, setdimensionerr2] = useState("");
  const [dimensionerr3, setdimensionerr3] = useState("");

  const [weighterr, setweighterr] = useState("");
  const [typeerr, settypeerr] = useState("");
  const [ordererr, setordererr] = useState("");

  var vehicle_type = "";
  var zone = "";

  const clearInput = () => {
    setpickup("");
    setpickup2("");
    setpickup3("");
    setdelivery("");
    setdelivery2("");
    setdelivery3("");
    setphone("");
    setPickerSelectedVal("Bulk");
    setdimension("");
    setdimension2("");
    setdimension3("");
    setweight("");
    settype("");
    setorder("");
    setcheck(false);
    setPriority(false);
  };
  var str = pickup2.split(",");
  var str1 = delivery2.split(",");
  const addItems = (d) => {
    db.ref(`/users/booking/${user.uid}`).push({
      residence_locality_pickup: pickup,
      city_pickup: str[0],
      state_pickup: str[1],
      pincode_pickup: pickup3,
      residence_locality_delivery: delivery,
      city_delivery: str1[0],
      state_delivery: str1[1],
      pincode_delivery: delivery3,
      phone: phone,
      PickerSelectedVal: PickerSelectedVal,
      length: dimension,
      breadth: dimension2,
      height: dimension3,
      weight: weight,
      vehicle: vehicle_type,
      type: type,
      order: order,
      insurance: check,
      Priority_Booking: Priority,
      Time: d,
      zone: zone,
      isScheduled: "Not Yet Scheduled",
    });

    //   var bookingRef = firebase.database().ref(`/users/booking/${user.uid}`);
    //   var OrderID;
    //   bookingRef.limitToLast(1).on("child_added", function (snapshot) {
    //     OrderID = snapshot.key;
    //   });

    //   var hashedID = user.uid;
    //   db.ref(`/admin/booking/${zone}/`).push({
    //     CustomerID: hashedID,
    //     Order_ID: OrderID,
    //     residence_locality_pickup: pickup,
    //     city_pickup: str[0],
    //     state_pickup: str[1],
    //     pincode_pickup: pickup3,
    //     residence_locality_delivery: delivery,
    //     city_delivery: str1[0],
    //     state_delivery: str1[1],
    //     pincode_delivery: delivery3,
    //     phone: phone,
    //     PickerSelectedVal: PickerSelectedVal,
    //     length: dimension,
    //     breadth: dimension2,
    //     height: dimension3,
    //     weight: weight,
    //     vehicle: vehicle_type,
    //     type: type,
    //     order: order,
    //     insurance: check,
    //     Priority_Booking: Priority,
    //     Time: d,
    //     zone: zone,
    //   });
  };

  const VehiclePicker = () => {
    var volume = dimension * dimension2 * dimension3;
    if (volume < 3 || weight < 5) {
      vehicle_type = "two-wheeler";
    } else if ((volume >= 3 && volume < 7) || (weight >= 5 && weight < 50)) {
      vehicle_type = "four-wheeler";
    } else if ((volume >= 7 && volume < 12) || (weight >= 50 && weight < 100)) {
      vehicle_type = "mini-van";
    } else {
      vehicle_type = "truck";
    }
  };
  // const zone_Allotment = () => {
  //   var north = ["600081", "600011", "600060", "601204", "600019"];
  //   var south = ["600020", "600016", "600004", "600042", "600087"];
  //   var central = ["600017", "600018", "600005", "600018", "600040"];
  //   if (north.includes(pickup3)) zone = "North";
  //   else if (south.includes(pickup3)) zone = "South";
  //   else if (central.includes(pickup3)) zone = "Central";
  //   else zone = "Others";
  // };
  const handleSubmit = () => {
    VehiclePicker();
    //zone_Allotment();
    var d = new Date();
    addItems(d.toString());
    alert("Order Placed Successfully");
    navigation.navigate("Invoice-Booking");
  };

  const validate = () => {
    if (
      pickup == "" ||
      pickup2 == "" ||
      pickup2.includes(",") == false ||
      pickup3 == "" ||
      delivery == "" ||
      delivery2 == "" ||
      delivery2.includes(",") == false ||
      delivery3 == "" ||
      phone == "" ||
      PickerSelectedVal == "" ||
      dimension == "" ||
      dimension2 == "" ||
      dimension3 == "" ||
      weight == "" ||
      weight > 1500 ||
      weight <= 0 ||
      type == "" ||
      order == ""
    ) {
      if (pickup == "") {
        setpickuperr("Pickup address field 1 required");
      } else {
        setpickuperr("");
      }
      if (pickup2 == "") {
        setpickup2err("Pickup address field 2 required");
      } else if (pickup2.includes(",") == false) {
        setpickup2err("Include comma(,) between city and state");
      } else {
        setpickup2err("");
      }
      if (pickup3 == "") {
        setpickup3err("Pickup address pincode required");
      } else {
        setpickup3err("");
      }
      if (delivery == "") {
        setdeliveryerr("Delivery address field 1 required");
      } else {
        setdeliveryerr("");
      }
      if (delivery2 == "") {
        setdeliveryerr2("Delivery address field 2 required");
      } else if (delivery2.includes(",") == false) {
        setdeliveryerr2("Include comma(,) between city and state");
      } else {
        setdeliveryerr2("");
      }
      if (delivery3 == "") {
        setdeliveryerr3("Delivery address pincode required");
      } else {
        setdeliveryerr3("");
      }
      if (phone == "") {
        setphoneerr("Phone number required");
      } else {
        setphoneerr("");
      }
      if (PickerSelectedVal == "") {
        setPickerSelectedValerr("Select either Bulk or Break-Bulk");
      } else {
        setPickerSelectedValerr("");
      }
      if (dimension == "") {
        setdimensionerr("Length required");
      } else {
        setdimensionerr("");
      }
      if (dimension2 == "") {
        setdimensionerr2("Breadth required");
      } else {
        setdimensionerr2("");
      }
      if (dimension3 == "") {
        setdimensionerr3("Height required");
      } else {
        setdimensionerr3("");
      }
      if (weight == "") {
        setweighterr("Weight required");
      } else if (weight > 1500 || weight <= 0) {
        setweighterr("Weight must be in the range (0-1500)Kgs");
      } else {
        setweighterr("");
      }
      if (type == "") {
        settypeerr("Type required");
      } else {
        settypeerr("");
      }
      if (order == "") {
        setordererr("Order Value required");
      } else {
        setordererr("");
      }
    } else {
      setpickuperr("");
      setpickup2err("");
      setpickup3err("");
      setdeliveryerr("");
      setdeliveryerr2("");
      setdeliveryerr3("");
      setphoneerr("");
      setPickerSelectedValerr("");
      setdimensionerr("");
      setdimensionerr2("");
      setdimensionerr3("");
      setweighterr("");
      settypeerr("");
      setordererr("");
      handleSubmit();
      clearInput();
      return <View />;
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={[styles.container, { paddingHorizontal: 10 }]}>
            <Text style={styles.text}>Pickup Address</Text>
            <FormInput
              labelValue={pickup}
              multiline={true}
              onChangeText={(text) => setpickup(text)}
              placeholderText="Residence,locality..."
              autoCorrect={false}
            />
            <View>
              <Text style={styles.validation}>{pickuperr}</Text>
            </View>

            <FormInput
              labelValue={pickup2}
              onChangeText={(text) => setpickup2(text)}
              placeholderText="City,State..."
              autoCorrect={false}
            />
            <View>
              <Text style={styles.validation}>{pickup2err}</Text>
            </View>

            <FormInput
              labelValue={pickup3}
              onChangeText={(text) => setpickup3(text)}
              placeholderText="Pincode..."
              keyboardType="number-pad"
              maxLength={6}
            />
            <View>
              <Text style={styles.validation}>{pickup3err}</Text>
            </View>

            <Text style={[styles.text, { marginTop: 20 }]}>
              Delivery Address
            </Text>
            <FormInput
              labelValue={delivery}
              multiline={true}
              onChangeText={(text) => setdelivery(text)}
              placeholderText="Residence,locality..."
              autoCorrect={false}
            />
            <View>
              <Text style={styles.validation}>{deliveryerr}</Text>
            </View>

            <FormInput
              labelValue={delivery2}
              onChangeText={(text) => setdelivery2(text)}
              placeholderText="City,State..."
              autoCorrect={false}
            />
            <View>
              <Text style={styles.validation}>{deliveryerr2}</Text>
            </View>

            <FormInput
              labelValue={delivery3}
              onChangeText={(text) => setdelivery3(text)}
              placeholderText="Pincode..."
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={6}
            />
            <View>
              <Text style={styles.validation}>{deliveryerr3}</Text>
            </View>

            <Text style={[styles.text, { marginTop: 20 }]}>Phone number</Text>
            <FormInput
              labelValue={phone}
              onChangeText={(text) => setphone(text)}
              placeholderText="+91-"
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={10}
            />
            <View>
              <Text style={styles.validation}>{phoneerr}</Text>
            </View>

            <Text style={[styles.text, { marginTop: 20 }]}>
              Category (Bulk/Break-Bulk)
            </Text>
            <Picker
              selectedValue={PickerSelectedVal}
              style={[styles.inputsingle]}
              onValueChange={(itemValue, itemIndex) =>
                setPickerSelectedVal(itemValue)
              }
            >
              <Picker.Item label="Bulk" value="Bulk" />
              <Picker.Item label="Break-Bulk" value="Break-Bulk" />
            </Picker>
            <View style={{ width: "75%" }}>
              <Text style={styles.validation}>{PickerSelectedValerr}</Text>
            </View>

            <Text style={[styles.text, { textDecorationLine: "underline" }]}>
              Consignment Details{" "}
            </Text>
            <Text
              style={[styles.text, { marginTop: 20, fontWeight: "normal" }]}
            >
              1. Dimensions
            </Text>

            <FormInput
              labelValue={dimension}
              onChangeText={(text) => setdimension(text)}
              placeholderText="Length (in metres)..."
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={5}
            />
            <View>
              <Text style={styles.validation}>{dimensionerr}</Text>
            </View>

            <FormInput
              labelValue={dimension2}
              onChangeText={(text) => setdimension2(text)}
              placeholderText="Breadth (in metres)..."
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={5}
            />
            <View>
              <Text style={styles.validation}>{dimensionerr2}</Text>
            </View>

            <FormInput
              labelValue={dimension3}
              onChangeText={(text) => setdimension3(text)}
              placeholderText="Height (in metres)..."
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={5}
            />
            <View>
              <Text style={styles.validation}>{dimensionerr3}</Text>
            </View>

            <Text
              style={[styles.text, { marginTop: 10, fontWeight: "normal" }]}
            >
              2. Weight
            </Text>

            <FormInput
              labelValue={weight}
              onChangeText={(text) => setweight(text)}
              placeholderText="Weight (in Kgs)..."
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={4}
            />
            <View>
              <Text style={styles.validation}>{weighterr}</Text>
            </View>

            <Text
              style={[styles.text, { marginTop: 10, fontWeight: "normal" }]}
            >
              3. Type
            </Text>

            <FormInput
              labelValue={type}
              onChangeText={(text) => settype(text)}
              placeholderText="Electronic etc.."
              autoCorrect={false}
            />
            <View>
              <Text style={styles.validation}>{typeerr}</Text>
            </View>

            <Text
              style={[styles.text, { marginTop: 10, fontWeight: "normal" }]}
            >
              Order Value
            </Text>

            <FormInput
              labelValue={order}
              onChangeText={(text) => setorder(text)}
              placeholderText="Qty..."
              keyboardType="number-pad"
              autoCorrect={false}
            />

            <View>
              <Text style={styles.validation}>{ordererr}</Text>
            </View>

            <View
              style={{ flexDirection: "column", marginTop: 10, padding: 10 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 1,
                  borderColor: "white",
                }}
              >
                <CheckBox value={check} onValueChange={setcheck} />
                <Text
                  style={[styles.text, { fontSize: 20, fontWeight: "normal" }]}
                >
                  {" "}
                  Insurance
                </Text>
              </View>
            </View>

            <View
              style={{ flexDirection: "column", marginTop: 10, padding: 10 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 1,
                  borderColor: "white",
                }}
              >
                <CheckBox value={Priority} onValueChange={setPriority} />
                <Text
                  style={[styles.text, { fontSize: 20, fontWeight: "normal" }]}
                >
                  {" "}
                  Priority Booking
                </Text>
              </View>
            </View>

            <FormButton buttonTitle="Confirm Booking" onPress={validate} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  );
};
export default BookingScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 10,
    marginTop: -20,
    marginLeft: 140,
    marginBottom: 5,
    borderRadius: 5,
    width: 250,
    height: 80,
    color: "white",
    backgroundColor: "#465881",
    textAlignVertical: "top",
  },
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
  checkbox: {
    alignSelf: "center",
  },

  loginBtn: {
    width: 200,
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    marginLeft: 80,
  },
  loginText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  text: {
    color: "#051d5f",
    fontSize: 20,
    fontWeight: "bold",
  },
  text2: {
    color: "#ccc",
    fontSize: 18,
  },
  validation: {
    color: "crimson",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 1,
  },
});
