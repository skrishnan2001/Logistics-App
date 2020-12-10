# Logistics-CustomerApp

## Installation guide

1.	npm install --global expo-cli
2.	expo init LogisticsCustomerApp
3.	expo start

One way to run react native apps on your android device is to use expo. 
Install the expo client in your android device and scan the obtained QR code in the terminal screen.

## Expo client : (Deployment phase)

Android :https://play.google.com/store/apps/details?id=host.exp.exponent 
Ios : https://apps.apple.com/us/app/expo-client/id982107779 

## Final Build(APK)

npm run eject - don't this immediately. Do it only when you finished the entire app

Android : react-native run-android

IOS : react-native run-ios

## For Stack navigation (version 5) Install (One by one)

npm install @react-navigation/native

expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

npm install @react-navigation/stack

npm install @react-navigation/bottom-tabs

## For User-Authentication(Using firebase)

npm install firebase --save

npm install @react-native-community/async-storage --save

## for using stars in rating(Form.js)

npm install react-native-stars --save 
