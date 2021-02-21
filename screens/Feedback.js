import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Button,Image
} from "react-native";
import Stars from "react-native-stars";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import { db } from "../firebaseConfig";

const Feedback = ({ route, navigation }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const { order_id } = route.params;
  const push_review = () => {
    db.ref(`/admin/Feedback/${order_id}`).set({
      rating: rating,
      feedback: feedback,
    });
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View>
        <View style={styles.header}>
          <Image
            style={styles.avatar}
            source={{ uri: "https://freerangestock.com/sample/119296/receive-feedback-.jpg" }}
          />
        </View>
        <View style={{ marginTop: 30, marginHorizontal: 20 }}>
          <Text style={styles.title}></Text>
          {/* <Text style={styles.preInput}>Enter Feedback:</Text> */}
          {/* <TextInput
          style={styles.textInput}
          multiline={true}
          onChangeText={(text) => setFeedback(text)}
        /> */}
          <FormInput
            labelValue={feedback}
            onChangeText={(text) => setFeedback(text)}
            placeholderText="Your feedback.."
            iconType="form"
            autoCorrect={false}
          />
          {/* <Text style={styles.preInput}>Rating:</Text> */}
          <View style={{ alignItems: "center", margin: 20 }}>
            <Stars
              half={true}
              default={2.5}
              update={(rating) => {
                setRating(rating);
              }}
              spacing={4}
              starSize={40}
              count={5}
              fullStar={require("../assets/starFilled.png")}
              emptyStar={require("../assets/starEmpty.png")}
              halfStar={require("../assets/starHalf.png")}
            />
            <Text
              style={{
                color: "#ba1e18",
                fontSize: 15,
                fontWeight: "bold",
                padding: 15,
              }}
            >
              Your Rating : {rating}
              {/* {"\n\n\n\n\n\n"} */}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <FormButton
              buttonTitle="Submit Review"
              onPress={() => {
                push_review();
                alert("Review Submitted,Thank You!!");
                navigation.navigate("History");
              }}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    padding: 20,
  },
  header: {
    //backgroundColor: "#00BFFF",
    height: 200,
  },
  title: {
    color: "#1422b8",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    margin: 30,
  },
  // preInput: {
  //   //padding: 40,
  //   margin: 20,
  //   textAlign: "center",
  //   fontSize: 17,
  //   color: "#31a34c",
  // },
  textInput: {
    height: 55,
    borderColor: "#2f3da3",
    borderWidth: 1.5,
    borderRadius: 8,
  },
  avatar: {
    width: '100%',
    height: 250,
    borderWidth: 4,
    alignSelf: "center",
    position: "absolute",
},
});
export default Feedback;
