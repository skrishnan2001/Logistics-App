import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Picker,
  CheckBox,
  TouchableOpacity,
  ScrollView,
  onValueChange,
} from "react-native";

const BookingScreen = () => {
  const [pickup, setpickup] = useState("");
  const [delivery, setdelivery] = useState("");
  const [phone, setphone] = useState("");
  const [PickerSelectedVal, setPickerSelectedVal] = useState("Bulk");
  const [dimension, setdimension] = useState("");
  const [weight, setweight] = useState("");
  const [type, settype] = useState("");
  const [order, setorder] = useState("");
  const [check, setcheck] = useState(false);

  const [pickuperr, setpickuperr] = useState("");
  const [deliveryerr, setdeliveryerr] = useState("");
  const [phoneerr, setphoneerr] = useState("");
  const [PickerSelectedValerr, setPickerSelectedValerr] = useState("");
  const [dimensionerr, setdimensionerr] = useState("");
  const [weighterr, setweighterr] = useState("");
  const [typeerr, settypeerr] = useState("");
  const [ordererr, setordererr] = useState("");
  const [checkerr, setcheckerr] = useState("");

  const validate = () => {
    if (
      pickup == "" ||
      delivery == "" ||
      phone == "" ||
      PickerSelectedVal == "" ||
      dimension == "" ||
      weight == "" ||
      weight > 1500 ||
      type == "" ||
      order == "" ||
      check == false
    ) {
      if (pickup == "") {
        setpickuperr("Pickup address required");
      } else {
        setpickuperr("");
      }
      if (delivery == "") {
        setdeliveryerr("Delivery address required");
      } else {
        setdeliveryerr("");
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
        setdimensionerr("Dimension required");
      } else {
        setdimensionerr("");
      }
      if (weight == "") {
        setweighterr("Weight required");
      } else if (weight > 1500) {
        setweighterr("Enter weight below 1500");
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
      if (check == false) {
        setcheckerr("Please include the insurance");
      } else {
        setcheckerr("");
      }
    } else {
      setpickuperr("");
      setdeliveryerr("");
      setphoneerr("");
      setPickerSelectedValerr("");
      setdimensionerr("");
      setweighterr("");
      settypeerr("");
      setordererr("");
      setcheckerr("");
      return <View />;
    }
  };
  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.total}>
          <View>
            <Text style={styles.container}>Booking</Text>
          </View>

          <View>
            <Text style={styles.text}>Pickup Address</Text>
            <TextInput
              multiline={true}
              style={styles.input}
              onChangeText={(text) => setpickup(text)}
            />
            <View style={{ width: "75%" }}>
              <Text style={styles.validation}>{pickuperr}</Text>
            </View>

            <Text style={styles.text}>Delivery Address</Text>
            <TextInput
              multiline={true}
              style={styles.input}
              onChangeText={(text) => setdelivery(text)}
            />
            <View style={{ width: "75%" }}>
              <Text style={styles.validation}>{deliveryerr}</Text>
            </View>

            <Text style={styles.text}>Phone number</Text>
            <TextInput
              style={styles.inputsingle}
              keyboardType="number-pad"
              maxLength={10}
              onChangeText={(text) => setphone(text)}
            />
            <View style={{ width: "75%" }}>
              <Text style={styles.validation}>{phoneerr}</Text>
            </View>

            <Text style={styles.text}>Category</Text>
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

            <Text style={styles.text2}>Consignment details :</Text>
            <Text style={styles.text}>1. Dimension</Text>
            <TextInput
              style={styles.inputsingle}
              placeholder="length × breadth × height"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => setdimension(text)}
            />
            <View style={{ width: "75%" }}>
              <Text style={styles.validation}>{dimensionerr}</Text>
            </View>

            <Text style={styles.text}>2. Weight</Text>
            <TextInput
              style={styles.inputsingle}
              keyboardType="number-pad"
              placeholder="In kg"
              placeholderTextColor="#003f5c"
              onChangeText={(text) => setweight(text)}
            />
            <View style={{ width: "75%" }}>
              <Text style={styles.validation}>{weighterr}</Text>
            </View>

            <Text style={styles.text}>3. Type</Text>
            <TextInput
              style={styles.inputsingle}
              placeholder="electronic etc.."
              placeholderTextColor="#003f5c"
              onChangeText={(text) => settype(text)}
            />
            <View style={{ width: "75%" }}>
              <Text style={styles.validation}>{typeerr}</Text>
            </View>

            <Text style={styles.text2}>Declaration :</Text>
            <Text style={styles.text}>Order Value</Text>
            <TextInput
              style={styles.inputsingle}
              keyboardType="number-pad"
              onChangeText={(text) => setorder(text)}
            />
            <View style={{ width: "75%" }}>
              <Text style={styles.validation}>{ordererr}</Text>
            </View>

            <View style={{ flexDirection: "column" }}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 1,
                  borderColor: "white",
                }}
              >
                <CheckBox value={check} onValueChange={setcheck} />
                <Text style={styles.text2}> Insurance</Text>
              </View>
            </View>
            <View style={{ width: "75%" }}>
              <Text style={styles.validation}>{checkerr}</Text>
            </View>

            <TouchableOpacity style={styles.loginBtn}>
              <Text style={styles.loginText} onPress={validate}>
                Confirm Booking
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};
export default BookingScreen;
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginLeft: 10,
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 10,
    marginTop: -20,
    marginLeft: 140,
    marginBottom: 5,
    borderRadius: 30,
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
    marginTop: -20,
    borderRadius: 125,
    marginLeft: 140,
    marginBottom: 5,
    width: 250,
    height: 30,
    color: "white",
    backgroundColor: "#465881",
  },
  checkbox: {
    alignSelf: "center",
  },
  total: {
    backgroundColor: "#003f5c",
    alignItems: "center",
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
    color: "#ccc",
    fontSize: 16,
  },
  text2: {
    color: "#ccc",
    fontSize: 18,
  },
  validation: {
    color: "crimson",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 1,
  },
});
