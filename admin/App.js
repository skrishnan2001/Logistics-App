import { LogBox } from 'react-native';
import _ from 'lodash';

LogBox.ignoreLogs(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

import React, { useState } from "react";
import Providers from "./navigation";
import Sort from "./screens/Sort";
import * as firebase from "firebase";
import FilterScreen from "./screens/FilterScreen";


export default function App() {
  return <Providers />;
}