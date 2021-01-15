import React, { useState, useContext } from "react";
import {
    StyleSheet,
    Image,
    View,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView,
    Text
} from "react-native";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import { windowHeight } from "../utils/Dimensions";
import { AuthContext } from "../navigation/AuthProvider";
import { db } from "../firebaseConfig";
import { ScrollView } from "react-native-gesture-handler";

export default function Appraisal({ navigation }) {
    const { user } = useContext(AuthContext);
    const [reason, setReason] = useState("");

    var addItems = () => {
        db.ref(`/staff/Requests/Appraisal/${user.uid}`).push({
            Reason: reason
        });
    };

    const updateHandle = () => {
        addItems();
        Alert.alert("Your request for appraisal has been sent!");
        navigation.navigate("Requests");
    };

    return (
        <SafeAreaView>
            <ScrollView>
            <View style={styles.header}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: "https://image.freepik.com/free-vector/documents-with-office-briefcase-vector-illustration-flat-cartoon-style_101884-104.jpg" }}
                        />
            </View>
            <View style={{ marginTop: 30, marginHorizontal: 30}}>              
                <Text style={[styles.text, { marginTop: 50 }]}>Reason</Text>
                <FormInput
                    labelValue={reason}
                    onChangeText={(text) => setReason(text)}
                    placeholderText="Appraisal..."
                    autoCorrect={false}
                    multiline={true}
                />
                <FormButton
                    buttonTitle="Seek Appraisal"
                    style={styles.buttonContainer}
                    onPress={updateHandle}
                />
                <FormButton
                    style={[styles.buttonContainer, { backgroundColor: '#2e64e5', marginTop: 20, marginBottom: 20 }]}
                    buttonTitle="Back to Requests"
                    onPress={() => navigation.navigate("Requests")}
                />
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
        width: '100%',
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
        width: '100%',
        marginTop: 10,
        borderColor: '#ccc',
        borderRadius: 3,
        borderWidth: 0,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 5
    },
    text: {
        color: '#051d5f',
        fontSize: 18,
        fontWeight: "bold",
    },
});