import React, { useState } from 'react';
import {
    StyleSheet, Text, View,
    TextInput, TouchableOpacity,
    Image
} from 'react-native';

export default function SignIn({navigation}) {

    const [currUserID, newUserID] = useState("");
    const [currPassword, newPassword] = useState("");

    const pressHandler = () =>{
        navigation.navigate('SignUp');
    }
    return (
        <View style={styles.container}>

            <Text style={styles.logo}>Sign In</Text>
            <Image style={styles.ImageStyle} source={require('./Images/ProfileAvatar.jpg')} />
            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="Username..."
                    placeholderTextColor="#003f5c"
                    onChangeText={text => newUserID(text)} />
            </View>

            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="Password..."
                    placeholderTextColor="#003f5c"
                    secureTextEntry
                    onChangeText={text => newPassword(text)} />
            </View>

            <TouchableOpacity>
                <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={pressHandler}>
                <Text style={styles.loginText}>Signup</Text>
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
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
    inputText: {
        height: 50,
        fontSize: 18,
        color: "white",
        
    },
    forgot: {
        color: "#ccc",
        fontSize: 16
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
        marginTop: 40,
        marginBottom: 10
    },
});
