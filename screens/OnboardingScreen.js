import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
// import Onboarding from "react-native-onboarding-swiper";
const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Onboarding Screen</Text>
      <Button title="Click Here" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
