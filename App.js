import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignIn from "./app/screens/SignIn";
import SignUp from "./app/screens/SignUp";

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
