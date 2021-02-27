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
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import * as firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

const BookingScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const [street1, setstreet1] = useState("");
  const [pickup, setpickup] = useState("");
  const [pickup2, setpickup2] = useState("");
  const [pickup3, setpickup3] = useState("");
  const [land1, setland1] = useState("");

  const [street2, setstreet2] = useState("");
  const [delivery, setdelivery] = useState("");
  const [delivery2, setdelivery2] = useState("");
  const [delivery3, setdelivery3] = useState("");
  const [land2, setland2] = useState("");

  const [phone, setphone] = useState("");
  const [PickerSelectedVal, setPickerSelectedVal] = useState("Break-Bulk");

  const [dimension, setdimension] = useState("");
  const [dimension2, setdimension2] = useState("");
  const [dimension3, setdimension3] = useState("");

  const [weight, setweight] = useState("");
  const [type, settype] = useState("");
  const [vehicle, setvehicle] = useState("two-wheeler");
  const [order, setorder] = useState("");
  const [check, setcheck] = useState(false);
  const [Priority, setPriority] = useState(false);
  //----States for handling errors -----
  const [pickuperr, setpickuperr] = useState("");
  const [pickup2err, setpickup2err] = useState("");
  const [pickup3err, setpickup3err] = useState("");
  const [street1err, setstreet1err] = useState("");
  const [land1err, setland1err] = useState("");

  const [deliveryerr, setdeliveryerr] = useState("");
  const [deliveryerr2, setdeliveryerr2] = useState("");
  const [deliveryerr3, setdeliveryerr3] = useState("");
  const [street2err, setstreet2err] = useState("");
  const [land2err, setland2err] = useState("");

  const [phoneerr, setphoneerr] = useState("");
  const [PickerSelectedValerr, setPickerSelectedValerr] = useState("");

  const [dimensionerr, setdimensionerr] = useState("");
  const [dimensionerr2, setdimensionerr2] = useState("");
  const [dimensionerr3, setdimensionerr3] = useState("");

  const [weighterr, setweighterr] = useState("");
  const [typeerr, settypeerr] = useState("");
  const [ordererr, setordererr] = useState("");
  const [vehicleerr, setvehicleerr] = useState("");

  const [insurancedetail, setinsurancedetail] = useState("");

  const yourDate = new Date()
  const NewDate = moment(yourDate, 'DD-MM-YYYY')
  const [fromdate, setfromdate] = useState(NewDate);
  const [shift, setshift] = useState("Shift 1");

  //const [condition, setcondition] = useState(1);

  var vehicle_type = "";
  var zone = "";

  const clearInput = () => {
    setpickup("");
    setpickup2("");
    setpickup3("");
    setstreet1("");
    setland1("");
    setdelivery("");
    setdelivery2("");
    setdelivery3("");
    setstreet2("");
    setland2("");
    setphone("");
    setPickerSelectedVal("Bulk");
    setfromdate(NewDate);
    setdimension("");
    setdimension2("");
    setdimension3("");
    setweight("");
    settype("");
    setorder("");
    setcheck(false);
    setPriority(false);
    setinsurancedetail("");
  };

  var str = pickup2.split(",");
  var str1 = delivery2.split(",");
  const addItems = (d) => {
    db.ref(`/users/booking/${user.uid}`).push({
      street_pickup: street1,
      landmark_pickup: land1,
      residence_locality_pickup: pickup,
      city_pickup: str[0],
      state_pickup: str[1],
      pincode_pickup: pickup3,
      street_delivery: street2,
      landmark_delivery: land2,
      residence_locality_delivery: delivery,
      city_delivery: str1[0],
      state_delivery: str1[1],
      pincode_delivery: delivery3,
      phone: phone,
      pickupdate: fromdate,
      pickup_shift: shift,
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
  console.log(vehicle_type);
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
    //VehiclePicker();
    //zone_Allotment();
    var d = new Date();
    addItems(d.toString());
    alert("Order Placed Successfully");
    navigation.navigate("Invoice-admin");
  };

  const insurance = () => {
    if (insurancedetail == "") {
      setinsurancedetail("Terms and Condition \n1.\n2.\n3.")
    }
    else {
      setinsurancedetail("");
    }
  };

  {/*var vehicle1 = [
    { label: 'two-wheeler' },
    { label: 'four-wheeler' },
    { label: 'mini-van' },
    { label: 'truck' },
  ];*/}

  /*if(PickerSelectedVal=="Break-Bulk"){
          setcondition(0);
    }
  if(PickerSelectedVal=="Break"){
          setcondition(1);
  }*/


  const validate = () => {
    VehiclePicker();
    if (
      pickup == "" ||
      pickup2 == "" ||
      pickup2.includes(",") == false ||
      pickup3 == "" ||
      street1 == "" ||
      land1 == "" ||
      delivery == "" ||
      delivery2 == "" ||
      delivery2.includes(",") == false ||
      delivery3 == "" ||
      street2 == "" ||
      land2 == "" ||
      phone == "" ||

      PickerSelectedVal == "" ||
      (PickerSelectedVal == "Bulk" && (dimension != "" || dimension2 != "" || dimension3 != "" || weight != "" || weight != ""
        || type != "" || order != "")) ||
      (PickerSelectedVal == "Break-Bulk" && ((vehicle_type == "four-wheeler" && vehicle == "two-wheeler") ||
        (vehicle_type == "mini-van" && (vehicle == "four-wheeler" || vehicle == "two-wheeler")) ||
        (vehicle_type == "truck" && (vehicle == "mini-van" || vehicle == "four-wheeler" || vehicle == "two-wheeler"))
        ||
        (dimension == "" || dimension2 == "" || dimension3 == "" || weight == "" || weight > 1500 ||
          weight <= 0 || type == "" || order == ""))
      )) {
      if (vehicle_type == "four-wheeler") {
        setvehicleerr("Can select either Four-wheeler/Mini-van/Truck");
      }
      if (vehicle_type == "mini-van") {
        setvehicleerr("Can select either Mini-van/Truck");
      }
      if (vehicle_type == "truck") {
        setvehicleerr("Can select only Truck");
      }
      if (pickup == "") {
        setpickuperr("Pickup address locality required");
      } else {
        setpickuperr("");
      }
      if (pickup2 == "") {
        setpickup2err("Pickup address city, state required");
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
      if (street1 == "") {
        setstreet1err("Pickup address door number required");
      } else {
        setstreet1err("");
      }
      if (land1 == "") {
        setland1err("Pickup address landmark required");
      } else {
        setland1err("");
      }
      if (delivery == "") {
        setdeliveryerr("Delivery address locality required");
      } else {
        setdeliveryerr("");
      }
      if (delivery2 == "") {
        setdeliveryerr2("Delivery address city, state required");
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
      if (street2 == "") {
        setstreet2err("Delivery address door number required");
      } else {
        setstreet2err("");
      }
      if (land2 == "") {
        setland2err("Delivery address landmark required");
      } else {
        setland2err("");
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
      setstreet1err("");
      setland1err("");
      setdeliveryerr("");
      setdeliveryerr2("");
      setdeliveryerr3("");
      setstreet2err("");
      setland2err("");
      setphoneerr("");
      setPickerSelectedValerr("");
      setdimensionerr("");
      setdimensionerr2("");
      setdimensionerr3("");
      setweighterr("");
      settypeerr("");
      setordererr("");
      setvehicleerr("");
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
          <View style={[styles.container, { paddingHorizontal: 10, marginTop: -30 }]}>
            <View
              style={{ flexDirection: "column", marginTop: 10, padding: 10 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 5,
                  marginLeft: -15,
                  //borderColor: "white",
                }}
              >
                <CheckBox value={Priority} onValueChange={setPriority} />
                <Text
                  style={[styles.text, { fontSize: 20, fontWeight: "normal", color: "green" }]}
                >
                  {""}
                Priority Booking
              </Text>
              </View>
            </View>
            <Text style={styles.text}>Pickup Address</Text>
            <FormInput
              labelValue={street1}
              multiline={true}
              onChangeText={(text) => setstreet1(text)}
              iconType="enviromento"
              placeholderText="Door number,Appartment name,..."
              autoCorrect={false}
            />
            <View>
              <Text style={styles.validation}>{street1err}</Text>
            </View>
            <FormInput
              labelValue={pickup}
              multiline={true}
              onChangeText={(text) => setpickup(text)}
              iconType="enviromento"
              placeholderText="Residence,locality..."
              autoCorrect={false}
            />
            <View>
              <Text style={styles.validation}>{pickuperr}</Text>
            </View>

            <FormInput
              labelValue={land1}
              onChangeText={(text) => setland1(text)}
              iconType="enviromento"
              placeholderText="Nearby Landmark..."
              autoCorrect={false}
            />
            <View>
              <Text style={styles.validation}>{land1err}</Text>
            </View>

            <FormInput
              labelValue={pickup2}
              onChangeText={(text) => setpickup2(text)}
              placeholderText="City,State..."
              iconType="enviromento"
              autoCorrect={false}
            />
            <View>
              <Text style={styles.validation}>{pickup2err}</Text>
            </View>

            <FormInput
              labelValue={pickup3}
              onChangeText={(text) => setpickup3(text)}
              placeholderText="Pincode..."
              iconType="enviromento"
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
              labelValue={street2}
              multiline={true}
              onChangeText={(text) => setstreet2(text)}
              placeholderText="Door number,Appartment name,..."
              iconType="enviroment"
              autoCorrect={false}
            />
            <View>
              <Text style={styles.validation}>{street2err}</Text>
            </View>
            <FormInput
              labelValue={delivery}
              multiline={true}
              onChangeText={(text) => setdelivery(text)}
              placeholderText="Residence,locality..."
              iconType="enviroment"
              autoCorrect={false}
            />
            <View>
              <Text style={styles.validation}>{deliveryerr}</Text>
            </View>
            <FormInput
              labelValue={land2}
              onChangeText={(text) => setland2(text)}
              placeholderText="Nearby Landmark..."
              iconType="enviroment"
              autoCorrect={false}
            />
            <View>
              <Text style={styles.validation}>{land2err}</Text>
            </View>

            <FormInput
              labelValue={delivery2}
              onChangeText={(text) => setdelivery2(text)}
              placeholderText="City,State..."
              iconType="enviroment"
              autoCorrect={false}
            />
            <View>
              <Text style={styles.validation}>{deliveryerr2}</Text>
            </View>

            <FormInput
              labelValue={delivery3}
              onChangeText={(text) => setdelivery3(text)}
              placeholderText="Pincode..."
              iconType="enviroment"
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
              iconType="mobile1"
              keyboardType="number-pad"
              maxLength={10}
            />
            <View>
              <Text style={styles.validation}>{phoneerr}</Text>
            </View>

            <Text style={[styles.text, { marginTop: 20 }]}>Choose Pickup Date</Text>
            <DatePicker
              style={styles.datePickerStyle}
              date={fromdate} // Initial date from state
              mode="date" // The enum of date, datetime and time
              placeholder="select date"
              format="DD-MM-YYYY"
              minDate={new Date(Date.now())}
              maxDate={new Date(Date.now() + (24 * 60 * 60 * 1000 * 7 * 4 * 3))}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  //display: 'none',
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                  borderWidth: 0
                },
              }}
              onDateChange={(date) => {
                setfromdate(date);
              }}
            />
            <Text style={[styles.text, { marginTop: 30 }]}>Select Pickup Time</Text>
            <Picker
              selectedValue={shift}
              style={[styles.inputsingle]}
              onValueChange={(itemValue, itemIndex) =>
                setshift(itemValue)

              }
            >
              <Picker.Item label="8:00 A.M to 12:00 P.M" value="Shift 1" />
              <Picker.Item label="12:00 P.M to 4:00 P.M" value="Shift 2" />
              <Picker.Item label="4:00 P.M to 8:00 P.M" value="Shift 3" />
            </Picker>

            <Text style={[styles.text, { marginTop: 20 }]}>
              Select Category
            </Text>

            <Picker
              selectedValue={PickerSelectedVal}
              style={[styles.inputsingle]}
              onValueChange={(itemValue, itemIndex) =>
                setPickerSelectedVal(itemValue)

              }
            >
              <Picker.Item label="Break-Bulk" value="Break-Bulk" />
              <Picker.Item label="Bulk" value="Bulk" />
            </Picker>


            <View style={{ width: "75%" }}>
              <Text style={styles.validation}>{PickerSelectedValerr}</Text>
            </View>

            <View>
              {PickerSelectedVal == "Break-Bulk" ? <View><Text style={[styles.text, { textDecorationLine: "underline" }]}>{ }
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
                  iconType="arrowsalt"
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
                  iconType="arrowsalt"
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
                  iconType="arrowsalt"
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
                  iconType="codepen-circle"
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
                  iconType="form"
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
                  iconType="tagso"
                  autoCorrect={false}
                />

                <View>
                  <Text style={styles.validation}>{ordererr}</Text>
                </View>
                <Text style={[styles.text, { marginTop: 20 }]}>Select Vehicle type</Text>
                <Picker
                  selectedValue={vehicle}
                  style={[styles.inputsingle]}
                  onValueChange={(itemValue, itemIndex) =>
                    setvehicle(itemValue)

                  }
                >
                  <Picker.Item label="Two-wheeler" value="two-wheeler" />
                  <Picker.Item label="Four-wheeler" value="four-wheeler" />
                  <Picker.Item label="Mini-van" value="mini-van" />
                  <Picker.Item label="Truck" value="truck" />
                </Picker>
                <View>
                  <Text style={styles.validation}>{vehicleerr}</Text>
                </View>
              </View> : <View>
                  <Text style={[styles.text, { marginTop: 20 }]}>Select Vehicle type</Text>
                  <Picker
                    selectedValue={vehicle}
                    style={[styles.inputsingle]}
                    onValueChange={(itemValue, itemIndex) =>
                      setvehicle(itemValue)
                    }
                  >
                    <Picker.Item label="Two-wheeler" value="two-wheeler" />
                    <Picker.Item label="Four-wheeler" value="four-wheeler" />
                    <Picker.Item label="Mini-van" value="mini-van" />
                    <Picker.Item label="Truck" value="truck" />
                  </Picker>
                  <View>
                    <Text style={styles.validation}>{vehicleerr}</Text>
                  </View>
                </View>}
            </View>

            <View
              style={{ flexDirection: "column", marginTop: 10, padding: 10 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginTop: -5,
                  marginLeft: -10,
                  borderColor: "white",
                }}
              >
                <CheckBox value={check} onValueChange={setcheck} />
                <Text
                  style={[styles.text, { fontSize: 17, fontWeight: "bold", marginTop: 5 }]}
                >
                  {""}Check here to indicate that you have read and agreed to the terms of the

                </Text>
              </View>
              <Text
                style={[styles.text, { fontSize: 17, fontWeight: "bold", marginTop: 0, color: "crimson", marginLeft: 20 }]} onPress={insurance}
              >
                Insurance Agreement
                </Text>
              <View>
                <Text style={styles.insurance}>{insurancedetail}</Text>
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
    marginBottom: 10,
    marginTop: -5
  },
  insurance: {
    color: "black",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: -10,
    marginTop: 1,
    marginLeft: 18
  },
  buttonStyle: {
    marginHorizontal: "2%",
    marginVertical: 10,
    width: "30%",
  },
  datePickerStyle: {
    width: '100%',
    marginTop: 10,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 0,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5
  },
});