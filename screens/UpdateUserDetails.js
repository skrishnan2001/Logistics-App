import React, { useState, useContext } from "react";
import { StyleSheet, Image, View, Alert } from "react-native";
import { AuthContext } from "../navigation/AuthProvider";
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { windowHeight } from '../utils/Dimensions';
import { db } from "../firebaseConfig";

export default function UpdateUserDetails({ navigation }) {

    const { user } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const addItems = () => {
        db.ref(`/users/ProfileDetails/${user.uid}`).push({
          Name: name,
          Phone_number: phone,
        });
      };

      const updateHandle = () =>{
          addItems();
          Alert.alert("Your details have been updated");
          navigation.navigate("Profile");
      }

    return (
        <View>
            <View style={styles.header}>
                <Image
                    style={styles.avatar}
                    source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }}
                />
            </View>
            <View style={{marginTop:65,marginHorizontal:20}}>
            <FormInput
                labelValue={name}
                onChangeText={(text) => setName(text)}
                placeholderText="Name..."
                autoCorrect={false}
            />
            
            <FormInput
                labelValue={phone}
                onChangeText={(text) => setPhone(text)}
                placeholderText="Mobile number"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={10}
            />

            <FormButton
                buttonTitle="Update"
                style={styles.buttonContainer}
                onPress={updateHandle}
            />
            <FormButton
                buttonTitle="Back to Profile"
                onPress={() => navigation.navigate("Profile")}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        padding: 20,
    },
    header: {
        backgroundColor: "#00BFFF",
        height: 200,
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: "center",
        position: "absolute",
        marginTop: 130,
      },
    buttonContainer: {
        marginTop: 50,
        width: '100%',
        height: windowHeight / 15,
        backgroundColor: 'crimson',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
}
)