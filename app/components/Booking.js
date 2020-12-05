import React from 'react';
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
  onValueChange,
} from "react-native";


class Booking extends React.Component {
  constructor() {
    super();
    this.state = {
      pickup: '',
      delivery: '',
      phone: 0,
      PickerSelectedVal: '',
      checked: '',
      order: '',
    }
  }
  render() {
    return (
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
            <TextInput multiline={true} style={styles.input}
              onChangeText={(text) => { this.setState({ pickup: text }) }}
            />
            <Text style={styles.text}>Delivery Address</Text>
            <TextInput multiline={true} style={styles.input}
              onChangeText={(text) => { this.setState({ delivery: text }) }}
            />
            <Text style={styles.text}>Phone number</Text>
            <TextInput style={styles.inputsingle} keyboardType="number-pad"
              onChangeText={(text) => { this.setState({ phone: text }) }}
            />
            <Text style={styles.text}>Category</Text>
            <Picker selectedValue={this.state.PickerSelectedVal} style={[styles.inputsingle ]}
              onValueChange={(itemValue, itemIndex) => this.setState({ PickerSelectedVal: itemValue })}>
              <Picker.Item label="Bulk" value="Bulk" />
              <Picker.Item label="Break Bulk" value="Break Bulk" />
            </Picker>
            <Text style={styles.text2}>Consignment details :</Text>
            <Text style={styles.text}>1. Dimension</Text>
            <TextInput style={styles.inputsingle} placeholder="l*b*h" placeholderTextColor="#003f5c"
              onChangeText={(text) => { this.setState({ phone: text }) }}
            />
            <Text style={styles.text}>2. Weight</Text>
            <TextInput style={styles.inputsingle} placeholder="In kg" placeholderTextColor="#003f5c"
              onChangeText={(text) => { this.setState({ phone: text }) }}
            />
            <Text style={styles.text}>3. Type</Text>
            <TextInput style={styles.inputsingle} placeholder="electronic etc.." placeholderTextColor="#003f5c"
              onChangeText={(text) => { this.setState({ phone: text }) }}
            />
            <Text style={styles.text2}>Declaration :</Text>
            <Text style={styles.text}>Order Value</Text>
            <TextInput style={styles.inputsingle} keyboardType="number-pad"
              onChangeText={(text) => { this.setState({ order: text }) }}
            />
            <View style={{ flexDirection: 'column'}}>
              <View style={{ flexDirection: 'row', marginTop:10, borderColor: 'white'}}>
                <CheckBox 
                  value={true || false}
                  onValueChange={() => this.setState({ checked: !this.state.checked })}
                />
                <Text style={styles.text2}>  Insurance</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}>Confirm Booking</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginLeft: 10,
    alignItems: 'center',
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 10,
    marginTop: -20,
    marginLeft: 120,
    marginBottom: 10,
    borderRadius: 30,
    width: 250,
    height: 80,
    color: "white",
    backgroundColor: "#465881",
  },
  inputsingle: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 5,
    marginTop: -20,
    borderRadius: 125,
    marginLeft: 120,
    marginBottom: 10,
    width: 250,
    height: 30,
    color: "white",
    backgroundColor: "#465881",
  },
  checkbox: {
    alignSelf: "center",
  },
  total: {
    backgroundColor: '#003f5c',
    alignItems: 'center',
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
});

export default Booking;