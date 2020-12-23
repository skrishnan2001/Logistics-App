import { LogBox } from 'react-native';
import _ from 'lodash';
import _uniqueId from 'lodash/uniqueId';

LogBox.ignoreLogs(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

import React, { useState } from "react";
import Orders from "./screens/Orders";

export default function App() {
  return <Orders />;
}
