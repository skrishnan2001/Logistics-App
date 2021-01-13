import React from 'react';

import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import Firebase from '../firebaseConfig';
import StaffCard from '../components/StaffCard';
import FormButton from '../components/FormButton';
import TrackStaff from './TrackStaff';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";



export default class AllStaffs extends React.Component {
  state = {
    allstaffs: [],
    isLoading: false
  }

  renderRow = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={()=> this.props.navigation.navigate('TrackStaff', {user: item})}
      >
                  <StaffCard
                     itemData={item}

                 />

                 </TouchableOpacity>
    )
  }

  componentDidMount(){
    // this.getData();
  }

  getData = () => {


    this.setState({isLoading:true});

    var staffs = [];

    Firebase.database().ref('/staff/ProfileDetails').on('value', (data) => {

        if (data.val()) {
            var keys = Object.keys(data.val());
            var temp = data.val();

            for(var i=0;i<keys.length;i++)
            {
                temp[keys[i]]['uid'] = keys[i];
                staffs.push(temp[keys[i]]);
            }



        }


});

  this.setState({allstaffs:staffs,isLoading:false});




  }

  render() {





    console.log("state :: "+this.state.allstaffs);
    if(this.state.allstaffs!=null && this.state.allstaffs.length!=0)
    {
      return (
        <View style={{
            flex: 1,
            width: '90%',
            alignSelf: 'center',
            marginTop:20
          }}>
          <FlatList
            data={this.state.allstaffs}
            renderItem={this.renderRow}
            refreshing={this.state.isLoading}
            onRefresh={this.getData}
            keyExtractor={item => item.uid.toString()}
          />
        </View>
      )
    }
    else {



      return (
             <View style={{
               backgroundColor: '#f9fafd',
               flex: 1,
               justifyContent: 'center',
               alignItems: 'center',
               padding: 20
             }}>
               <Text style={{
                 fontSize: 20,
                 color: '#333333'
               }}>Kindly refresh to see the contents</Text>
                <View style={{padding:16}}>
                          <FormButton
                           buttonTitle="REFRESH"
                           onPress={() => {this.getData()}}
                          />
                          </View>
             </View>
           );
    }
  }
}
