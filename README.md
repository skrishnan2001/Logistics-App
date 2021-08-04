# Logistics-App
A cross-platform mobile application developed using Expo, React-Native and Firebase for the logistics industry catering to the requirements of different users such as customers, admin and delivery persons.

## Prominent features of the application developed
- Real-time location tracking
- QR and Bar code detection
- Generating Booking-Invoices as PDFs
- OTP Authentication
- Scheduling orders and leave requests to staff in a real-time scenario

## Installation guide

- `npm install --global expo-cli`
- `expo init Logistics-App`
- `cd Logistics-App` : Navigate to customer app files<br/>
- `cd Logistics-App/admin` : Navigate to admin app files<br/>
- `cd Logistics-App/staff` : Navigate to staff app files<br/>	
- `npm install` : To install the npm dependencies of the respective app
- `expo start`

One way to run react native apps on your android device is to use expo. <br/>
Install the expo client in your android device and scan the obtained QR code in the terminal screen.

## Expo client : (Deployment phase)

- Android: https://play.google.com/store/apps/details?id=host.exp.exponent 
- IOS: https://apps.apple.com/us/app/expo-client/id982107779 

## Final Build(APK)

`expo build:android` - To build a optimized version of the react-native app, which is ready for production.

