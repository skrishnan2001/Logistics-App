import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as firebase from "firebase";

const BarCodeScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    var dbRef = firebase.database().ref(`/users/booking/`);
    var flag = 0;
    var uid, oid;
    dbRef.on("value", function (snapshot) {
      const data1 = snapshot.val();
      for (var key in data1) {
        if (data1.hasOwnProperty(key)) {
          var val = data1[key];
          for (var key2 in val) {
            if (val.hasOwnProperty(key2)) {
              var val2 = val[key2];
              console.log(val2.barcodeNumber);
              console.log(data);
              if (
                val2.barcodeNumber == data &&
                val2.isScheduled == "Undelivered"
              ) {
                flag = 1;
                uid = key;
                oid = key2;
                //break;
              }
            }
          }
          // if (flag == 1) {
          //   break;
          //}
        }
      }
    });
    console.log(uid);
    console.log(oid);
    navigation.navigate("Retrieved-Order", {
      user_id: uid,
      order_id: oid,
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};
export default BarCodeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
