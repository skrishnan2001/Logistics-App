import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Button,
} from "react-native";
import Stars from "react-native-stars";

const Form = (props) => {
  const [rating, setRating] = useState(0);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View>
        <Text style={styles.title}>Feedback and Report</Text>
        <Text style={styles.preInput}>Enter Feedback:</Text>
        <TextInput style={styles.textInput} multiline={true} />
        <Text style={styles.preInput}>Rating:</Text>
        <View style={{ alignItems: "center", margin: -30 }}>
          <Stars
            half={true}
            default={2.5}
            update={(rating) => {
              setRating(rating);
            }}
            spacing={4}
            starSize={40}
            count={5}
            fullStar={require("../images/starFilled.png")}
            emptyStar={require("../images/starEmpty.png")}
            halfStar={require("../images/starHalf.png")}
          />
          <Text
            style={{
              color: "#ba1e18",
              fontSize: 15,
              fontWeight: "bold",
              padding: 15,
            }}
          >
            Entered Rating:{rating}
            {"\n\n\n\n\n\n"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Button
            style={styles.buttonContainer}
            title="Submit Review"
            color="#c95924"
            onPress={() => {
              alert("Works");
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#1422b8",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    margin: 30,
  },
  preInput: {
    padding: 40,
    margin: 20,
    textAlign: "center",
    fontSize: 17,
    color: "#31a34c",
  },
  textInput: {
    height: 55,
    borderColor: "#2f3da3",
    borderWidth: 1.5,
    borderRadius: 15,
  },
});
export default Form;
