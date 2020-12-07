import React, { useState } from 'react';
import {
    StyleSheet, Text, View,
    TextInput, TouchableOpacity,
    Image
} from 'react-native';

export default function SignIn({ navigation }) {

    const [currUserID, newUserID] = useState("");
    const [currPassword, newPassword] = useState("");
    const [passState, newPassState] = useState("");
    const [userState, newUserState] = useState("");

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const passNotEmpty = () => {
        if (currPassword == "" || currUserID == "" || reg.test(currUserID) == false) {
            if (currUserID == "") {
                newUserState("Username required");
            }
            else if (reg.test(currUserID) == false) {
                newUserState("Invalid Email Format");
            }
            else {
                newUserState("");
            }
            if (currPassword == "") {
                newPassState("Password required");
            }
            else {
                newPassState("");
            }
        }
        else {
            newUserState("");
            newPassState("");
            return <View />
        }
    }

    return (
        <View style={styles.container}>

            <Text style={styles.logo}>Sign In</Text>
            <Image style={styles.ImageStyle} source={require('./Images/ProfileAvatar.jpg')} />
            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="Email..."
                    placeholderTextColor="#003f5c"
                    onChangeText={text => newUserID(text)} />
            </View>

            <View style={{ width: '75%' }}>
                <Text style={styles.validation}>{userState}</Text>
            </View>

            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="Password..."
                    placeholderTextColor="#003f5c"
                    secureTextEntry
                    onChangeText={text => newPassword(text)} />
            </View>
            <View style={{ width: '75%' }}>
                <Text style={styles.validation}>{passState}
                </Text>
            </View>


            <TouchableOpacity style={styles.loginBtn} onPress={passNotEmpty}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.loginText}>Signup</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#fb5b5a",
        marginBottom: 40,
        marginTop: 35
    },
    inputView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 13,
        justifyContent: "center",
        padding: 20,
    },
    inputText: {
        height: 50,
        fontSize: 20,
        color: "white",

    },
    forgot: {
        color: "#ccc",
        fontSize: 16,
        marginTop: 10
    },
    loginText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },
    ImageStyle: {
        width: 110,
        height: 110,
        marginBottom: 20,
        borderRadius: 75
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 13,
        marginBottom: 15
    },
    validation: {
        color: "crimson",
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: "left",
        marginBottom: 13
    }
});
