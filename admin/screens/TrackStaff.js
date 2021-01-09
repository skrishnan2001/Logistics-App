import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as TaskManager from "expo-task-manager";
import * as firebase from "firebase";

const LOCATION_TASK_NAME = "background-location-task";

export default class TrackMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      error: '',
      user : null,
    };
  }

  _getLocationAsync = async () => {

    const y = this.props.route.params.user;
    this.setState({user:y});

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      enableHighAccuracy: true,
      distanceInterval: 1,
      timeInterval: 5000
    });
    // watchPositionAsync Return Lat & Long on Position Change
    this.location = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        distanceInterval: 1,
        timeInterval: 10000
      },
      newLocation => {
        let { coords } = newLocation;

        var x = null;

        firebase.database().ref("/staff/ProfileDetails/"+this.state.user.uid+"/location").on('value', (data) => {

            if (data.val()) {

              coords = data.val();


            }


    });




        console.log(coords);
        let region = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.045,
          longitudeDelta: 0.045
        };
        this.setState({ region: region });



      },
      error => console.log(error)
    );
    return this.location;
  };

  async componentDidMount() {
    // Asking for device location permission
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === "granted") {
      this._getLocationAsync();
    } else {
      this.setState({ error: "Locations services needed" });
    }
    // userId = (await AsyncStorage.getItem("userId")) || "none";
    // userName = (await AsyncStorage.getItem("userName")) || "none";
  }

  render() {



    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.region}
          showsCompass={true}
          showsUserLocation={true}
          rotateEnabled={true}
          ref={map => {
            this.map = map;
          }}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}



TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.log(error);
    return;
  }
  if (data) {
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;
    // userId = (await AsyncStorage.getItem("userId")) || "none";
    //
    // // Storing Received Lat & Long to DB by logged In User Id
    // axios({
    //   method: "POST",
    //   url: "http://000.000.0.000/phpServer/ajax.php",
    //   data: {
    //     action: "saveLocation",
    //     userId: userId,
    //     lat,
    //     long
    //   }
    // });

      // firebase.database().ref("/staff/ProfileDetails/"+user.uid+"/location").set(locations[0].coords);
     // console.log("Received new locations for user = ", locations);
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
