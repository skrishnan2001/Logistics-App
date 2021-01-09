import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import React, {Component  ,Fragment} from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View, ScrollView,Button,Image,TextInput
} from 'react-native'


import FormButton from '../components/FormButton';
import Firebase from '../firebaseConfig';

class AddGeoLocation extends Component {


  constructor(props)
  {
    super(props);




    this.state={

        latlng:{
          latitude:23.8989,
          longitude:90.4126,
        }

}



  }


getLocation = () => {

  const route = this.props.route;
      const {user } =  route.params;
      console.log("USER");
      console.log(user);

    Firebase.database().ref("/staff/ProfileDetails/"+user.uid+"/location").on('value', (data) => {

        if (data.val()) {

            var temp = data.val();

            this.setState({
              latlng:{
                latitude: temp.latitude,
                longitude : temp.longitude
              }
            });

        }


});

}


  render(){
const route = this.props.route;
    const {user } =  route.params;

console.log()

    // console.log("marked region..."+region.latitude);
    return (
      <View style={styles.container}>

      <Text style={{ color: '#000', fontSize: 17,alignSelf:'center' ,padding:10}}>
           Press any place in the map to mark the location
      </Text>



        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          region={{
            latitude: this.state.latlng.latitude,
            longitude: this.state.latlng.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}>


              <MapView.Marker  coordinate={this.state.latlng} />

        </MapView>


<View style={{padding:16,
}}>
<FormButton
  buttonTitle="Refresh"
  onPress={() => {
      this.getLocation();
}}
/>


  </View>
      </View>

    );
  }
}

export default AddGeoLocation;

const styles = StyleSheet.create({
  container: {

    flex: 1,

      },
  text: {
    fontSize: 20,
    color: '#333333'
  }
});
