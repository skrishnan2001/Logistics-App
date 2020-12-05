import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignIn from "./Application/SignIn";
import SignUp from "./Application/SignUp";

export default function App() {
  return (
    <SignIn/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
