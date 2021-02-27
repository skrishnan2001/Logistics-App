import React, { useState, useContext, Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import ImageSliderz from "react-native-image-slideshow";
import * as firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button } from "react-native";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countns: 0,
      countud: 0,
      countd: 0,
      position: 1,
      interval: null,
      dataSource: [
        {
          url: 'https://i.pinimg.com/originals/a8/2a/d6/a82ad67f7e6e555f5bdad9dae5071e3e.jpg',
        },
        {
          url: 'https://cdn.vox-cdn.com/thumbor/dXnH-ySPU85VXbzb9YOQE3Ac9sw=/0x0:4243x3079/1400x933/filters:focal(1783x1201:2461x1879):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/65022936/TuSimple_Self_Drving_Truck_4_copy.0.jpg',
        }, {
          url: 'https://assets.newatlas.com/dims4/default/53aa086/2147483647/strip/true/crop/3318x2212+427+187/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2F3d%2F98%2Ff8a71d50446582ac0b00e35a0153%2F764152-191108vw08-0064.jpg',
        }, {
          url: 'https://d3o1t8vp7n8wsg.cloudfront.net/assets/website_revamp/large_vehicles/2_wheeler-947e3c6aac74dcdd11fdd4059e4ee72132b276200dff063d6dff2c445f7aab5b.png',
        },
      ],
    };

  }

  componentDidMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === (this.state.dataSource.length - 1) ? 0 : this.state.position + 1
        });
      }, 4000)
    });
    var dbRef = firebase.database().ref(`/users/booking/`);
    var countUnscheduled = 0;
    var countUndelivered = 0;
    var countDeliverd = 0;
    dbRef.once("value", function (snapshot) {
      const data = snapshot.val();
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var val = data[key];
          for (var key1 in val) {
            if (data.hasOwnProperty(key)) {
              var val1 = val[key1];
              console.log(val1);
              if (val1["isScheduled"] == "Not Yet Scheduled") {
                //this.setState({countns: this.state.countns+=1});
                //console.log(this.state.countns);
                countUnscheduled += 1;
                console.log(countUnscheduled);
              }
              if (val1["isScheduled"] == "Undelivered") {
                //this.setState({countud: this.state.countud+1});
                countUndelivered += 1;
              }
              if (val1["isScheduled"] == "Delivered") {
                //this.setState({countd: this.state.countd+1});
                countDeliverd += 1;
              }
            }
            console.log(countUnscheduled);
            //this.setState({ countns:countUnscheduled});
          }
        }
      }
    })
    console.log(countUnscheduled);
    this.setState({ countns: countUnscheduled });
    this.setState({ countud: countUndelivered });
    this.setState({ countd: countDeliverd });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return (
      <View>
        <ImageSliderz
          dataSource={this.state.dataSource}
          position={this.state.position}
          height={250}
          onPositionChanged={position => this.setState({ position })}
        />
        <View style={styles.detailsContainer}>
          <TouchableOpacity style={[styles.card, { marginTop: 30 }]} onPress={() => { }}>
            <View style={styles.detailsContainer1}>
              <Text style={styles.text}>Unscheduled orders  {"\t"} {this.state.countns}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card, { marginTop: 30 }]} onPress={() => { }}>
            <View style={styles.detailsContainer1}>
              <Text style={styles.text}>Undelivered orders  {"\t\t"}{this.state.countud}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card, { marginTop: 30 }]} onPress={() => { }}>
            <View style={styles.detailsContainer1}>
              <Text style={styles.text}>Delivered orders  {"\t\t"}{this.state.countd}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#051d5f",
    fontSize: 20,
    fontWeight: "bold",
  },
  detailsContainer: {
    marginTop: 5,
    padding: 10,
    marginHorizontal: 20,
    justifyContent: 'flex-start',
    //flexDirection: 'row',
  },
  card: {
    borderRadius: 10,
    backgroundColor: '#d1d1d1',
    marginVertical: 0,
    overflow: "hidden",
    marginHorizontal: 0,
    height: 75,
    justifyContent: 'center',
    textAlign: 'center',
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  detailsContainer1: {
    //marginTop: 5,
    padding: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});