import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './Routes/homeStack';

export default function App() {
  return (
    <Navigator/>
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
