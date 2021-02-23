import React, { useContext, Component } from "react";
import { View, Text, StyleSheet,Alert } from "react-native";
import ImageSliderz from "react-native-image-slideshow";
import { TouchableOpacity } from "react-native-gesture-handler";
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === (this.state.dataSource.length - 1) ? 0 : this.state.position + 1
        });
      }, 4000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    //Alert.alert("Update your profile to get your consignment");
    return (
      <View>

        <ImageSliderz
          dataSource={this.state.dataSource}
          position={this.state.position}
          height={250}
          onPositionChanged={position => this.setState({ position })} />

        <TouchableOpacity style={[styles.card, { marginTop: 60 }]} onPress={() => this.props.navigation.navigate("MyOrders")}>
          <View style={styles.detailsContainer}>
            <View style={styles.iconStyle}>
              <AntDesign name="tags" size={25} color="#666" />
            </View>
            <View style={styles.detailsContainer1}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: "#051d5f", textAlign: 'center' }}>My Orders</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate("Requests")} >
          <View style={styles.detailsContainer}>
            <View style={styles.iconStyle}>
              <AntDesign name="carryout" size={25} color="#666" />
            </View>
            <View style={styles.detailsContainer1}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: "#051d5f" }}>Request</Text>
            </View>
          </View>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    borderRadius: 10,
    backgroundColor: '#d1d1d1',
    marginVertical: 10,
    overflow: "hidden",
    marginHorizontal: 10,
    height: 70,
    justifyContent: 'center',
    textAlign: 'center',
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  detailsContainer: {
    marginTop: 5,
    padding: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  detailsContainer1: {
    //marginTop: 5,
    padding: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  text: {
    fontSize: 30,
    color: "#333333",
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
});