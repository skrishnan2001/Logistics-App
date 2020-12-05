import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
    SafeAreaView,
    AppRegistry,
    PanResponder,
} from "react-native";

import DatePicker from 'react-native-datepicker';

class Schedule extends React.Component {
    constructor() {
        super();
        this.state = {
            pickupdate: '',
            deliverydate: '',
            pickuptime: '',
            deliverytime: '',
            date: '',
            time: '20:00',
            datetime: '2016-05-05 20:00',
            datetime1: '2016-05-05 20:00'
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
                <Text style={styles.container}>Schedule</Text>
                <Text style={styles.text}>Pick-up date</Text>
                <TextInput style={styles.inputsingle} placeholder="dd-mm-yyyy" placeholderTextColor="#003f5c"
                    onChangeText={(text) => { this.setState({ pickupdate: text }) }}
                />



            <Text style={styles.text}>Pick-up Time</Text>
            <TextInput style={styles.inputsingle} placeholder="hh-mm AM/PM" placeholderTextColor="#003f5c"
                onChangeText={(text) => { this.setState({ pickuptime: text }) }}
            />

            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}>Confirm Schedule</Text>
            </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginLeft: 100,
        alignItems: 'center',
        fontWeight: "bold",
        fontSize: 50,
        color: "#fb5b5a",
    },
    inputsingle: {
        borderWidth: 1,
        borderColor: "#777",
        padding: 5,
        marginTop: -20,
        borderRadius: 125,
        marginLeft: 130,
        marginBottom: 10,
        width: 250,
        height: 30,
        color: "white",
        backgroundColor: "#465881",
    },
    loginBtn: {
        width: 200,
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 100,
    },
    loginText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    text: {
        color: "#ccc",
        fontSize: 16,
        marginLeft: 15,
    },
    total: {
        backgroundColor: '#003f5c',
    },
    container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
      },
      welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
      },
      instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
      }

});

AppRegistry.registerComponent('datepicker', () => datepicker);
export default Schedule;

/*
            <Text style={styles.text}>Delivery date</Text>
            <TextInput style={styles.inputsingle} placeholder="dd-mm-yyyy" placeholderTextColor="#003f5c"
                onChangeText={(text) => { this.setState({ deliverydate: text }) }}
            />
            <Text style={styles.text}>Delivery Time</Text>
            <TextInput style={styles.inputsingle} placeholder="hh-mm AM/PM" placeholderTextColor="#003f5c"
                onChangeText={(text) => { this.setState({ deliverytime: text }) }}
            />
            */