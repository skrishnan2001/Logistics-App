import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import NotifyCard from '../components/NotifyCard';
import FormButton from "../components/FormButton";
import Firebase from "../firebaseConfig";


const Notifications = () => {

const [isLoading,setIsLoading] = React.useState(false);
const [required,setRequired] = React.useState([]);


const renderRow = ({ item }) => {
  return (

                <NotifyCard
                  itemData={item}
               />
  )
}


const getData = () => {

    setIsLoading(true);

    const user = Firebase.auth().currentUser;

    let dbRef = Firebase.database().ref(`/staff/ProfileDetails/${user.uid}/notifications`);
          if (dbRef) {
            dbRef.on('value', (data) => {

              // console.log(data.val());
              if (data.val()) {
                var temp = data.val();
                var keys = Object.keys(temp);
                var x = [];
                for (var index = 0; index < keys.length; index++) {
                  var key = keys[index];
				  var obj = {};
				  obj["id"] =  new Date().getTime().toString() +
          Math.floor(
            Math.random() * Math.floor(new Date().getTime())
          ).toString(),
                  //x.push(temp[key]);
                  // x[index]['propID'] = key;
				  obj = {...obj,...temp[key]};
				  x.push(obj);
                  console.log(x[index]);
                }


                setRequired(x);
                setIsLoading(false);
              }
              else {
                setRequired(x);
                setIsLoading(false);
              }
            });
          }


  }

var count = 0;

  if(required!=null && required.length!=0)
  {
    return (
      <View style={{
          flex: 1,
          width: '90%',
          alignSelf: 'center'
        }}>
        <FlatList
          data={required}
          renderItem={renderRow}
          refreshing={isLoading}
          onRefresh={getData}
          keyExtractor = {(item)=> item.id}
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
             }}>No Notifications</Text>

             <View style={{padding:16}}>
                       <FormButton
                        buttonTitle="REFRESH"
                        onPress={getData}
                       />
                       </View>
           </View>
         );
  }
}

export default Notifications;
