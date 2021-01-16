import React from "react";
import "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BookingScreen from "./Booking";
import HomeScreen from "./HomeScreen";
import Orders from "./Orders";
import FilterScreen from "./FilterScreen";
import Sort from "./Sort";
import ScheduledOrders from "./ScheduledOrders";
import Unverified from "./Unverified";
import Verified from "./Verified";
import InvoiceOrders from "./InvoiceOrders";
import InvoiceScreen from "./InvoiceScreen";
import InvoiceAdmin from "./InvoiceAdmin";
import InvoiceVerified from "./InvoiceVerified";
import ResetPassword from "./ResetPassword";
import AllStaffs from "./AllStaffs";
import TrackStaff from "./TrackStaff";
import StaffProfile from "./StaffProfiles";
import StaffProfileTable from "./StaffProfileTable";
import InvoicePDF from "./InvoicePDF";

const HomeStack = createStackNavigator();
const BookingStack = createStackNavigator();
const OrderStack = createStackNavigator();
const SortStack = createStackNavigator();
const ScheduledOrdersStack = createStackNavigator();
const SignInStack = createStackNavigator();
const UnverifiedStack = createStackNavigator();
const VerifiedStack = createStackNavigator();
const AllStaffsStack = createStackNavigator();
const StaffProfileStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
    </HomeStack.Navigator>
  );
};

const AllStaffsStackScreen = ({ navigation }) => {
  return (
    <AllStaffsStack.Navigator>
      <AllStaffsStack.Screen
        name="AllStaffs"
        component={AllStaffs}
        options={{
          headerShown: false,
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />

      <AllStaffsStack.Screen
        name="TrackStaff"
        component={TrackStaff}
        options={{
          headerShown: false,
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
    </AllStaffsStack.Navigator>
  );
};

const StaffProfileStackScreen = ({ navigation }) => {
  return (
    <StaffProfileStack.Navigator>
      <StaffProfileStack.Screen
        name="StaffProfile"
        component={StaffProfile}
        options={{
          headerShown: false,
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      <StaffProfileStack.Screen
        name="StaffProfileTable"
        component={StaffProfileTable}
        options={{
          headerShown: false,
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
    </StaffProfileStack.Navigator>
  );
};

const BookingStackScreen = ({ navigation }) => {
  return (
    <BookingStack.Navigator>
      <BookingStack.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      <BookingStack.Screen
        name="Invoice-admin"
        component={InvoiceAdmin}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      <BookingStack.Screen
        name="Invoice-PDF"
        component={InvoicePDF}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
    </BookingStack.Navigator>
  );
};

const OrderStackScreen = ({ navigation }) => {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name="Orders"
        component={Orders}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      {/* <OrderStack.Screen
        name="Reset-Password"
        component={ResetPassword}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      /> */}
      <OrderStack.Screen
        name="Invoice"
        component={InvoiceOrders}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      <OrderStack.Screen
        name="Invoice-PDF"
        component={InvoicePDF}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
    </OrderStack.Navigator>
  );
};

const UnverifiedStackScreen = ({ navigation }) => {
  return (
    <UnverifiedStack.Navigator>
      <UnverifiedStack.Screen
        name="Unverified"
        component={Unverified}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      <UnverifiedStack.Screen
        name="Invoice-Unverified"
        component={InvoiceScreen}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      <UnverifiedStack.Screen
        name="Invoice-PDF"
        component={InvoicePDF}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
    </UnverifiedStack.Navigator>
  );
};

const VerifiedStackScreen = ({ navigation }) => {
  return (
    <VerifiedStack.Navigator>
      <VerifiedStack.Screen
        name="Verified"
        component={Verified}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      <VerifiedStack.Screen
        name="VerifiedOrder"
        component={InvoiceVerified}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      <VerifiedStack.Screen
        name="Invoice-PDF"
        component={InvoicePDF}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
    </VerifiedStack.Navigator>
  );
};

const SortStackScreen = ({ navigation }) => {
  return (
    <SortStack.Navigator>
      <SortStack.Screen
        name="Filter"
        component={FilterScreen}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      <SortStack.Screen
        name="Sort"
        component={Sort}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      <SortStack.Screen
        name="Invoice"
        component={InvoiceOrders}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      <SortStack.Screen
        name="Invoice-PDF"
        component={InvoicePDF}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
    </SortStack.Navigator>
  );
};

const ScheduledOrdersStackScreen = ({ navigation }) => {
  return (
    <ScheduledOrdersStack.Navigator>
      <ScheduledOrdersStack.Screen
        name="ScheduledOrders"
        component={ScheduledOrders}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      <ScheduledOrdersStack.Screen
        name="Invoice"
        component={InvoiceOrders}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
    </ScheduledOrdersStack.Navigator>
  );
};

// const SignInStackScreen = ({ navigation }) => {
//   return (
//     <SignInStack.Navigator>
//       <SignInStack.Screen
//         name="SignIn"
//         component={SignupScreen}
//         options={{
//           headerLeft: () => (
//             <Icon.Button
//               name="ios-menu"
//               size={25}
//               backgroundColor="#88c7eb"
//               onPress={() => navigation.openDrawer()}
//             ></Icon.Button>
//           ),
//           headerStyle: {
//             backgroundColor: "#88c7eb",
//           },
//           headerTintColor: "#35126e",
//         }}
//       />
//     </SignInStack.Navigator>
//   );
// };
// const  StaffProfileLocation=({navigation}) =>{
//   return (
//     <StaffProfileLocation.Navigator>
//       <StaffProfileLocation.Screen name="StaffLocation" component={AddGeoLocation} />
//     </StaffProfileLocation.Navigator>
//   );
// }

const Tab = createMaterialBottomTabNavigator();

const bottomTabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#1094e0"
      inactiveColor="#cf808a"
      barStyle={{ backgroundColor: "#88c7eb" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarColor: "#34ebc0",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Booking"
        component={BookingStackScreen}
        options={{
          tabBarLabel: "Book",
          tabBarColor: "#34ebc0",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-pricetags" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderStackScreen}
        options={{
          tabBarLabel: "Orders",
          tabBarColor: "#34ebc0",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const TopTab = createMaterialTopTabNavigator();
const TopNav = () => {
  return (
    <TopTab.Navigator
      tabBarOptions={{
        activeTintColor: "grey",
        labelStyle: {
          textTransform: "uppercase",
          fontWeight: "bold",
        },
        inactiveTintColor: "white",
        indicatorStyle: {
          height: null,
          top: "10%",
          bottom: "10%",
          width: "45%",
          left: "2.5%",
          marginVertical: 0,
          borderRadius: 10,
          backgroundColor: "orange",
        },
        style: {
          width: "100%",
          borderColor: "blue",
          backgroundColor: "dodgerblue",
          elevation: 5, // shadow on Android
          shadowOpacity: 0.1, // shadow on iOS,
          shadowRadius: 4, // shadow blur on
          marginTop: "10%",
          height: "9%",
          justifyContent: "center",
        },
      }}
      swipeEnabled={true}
    >
      <TopTab.Screen
        name="Staff Location"
        component={AllStaffsStackScreen}
        options={{}}
      />
      <TopTab.Screen name="Profile" component={StaffProfileStackScreen} />
    </TopTab.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerStyle={{
        backgroundColor: "#88c7eb",
        width: 270,
      }}
      drawerContentOptions={{
        activeTintColor: "#362dad",
        inactiveTintColor: "#4054c7",
      }}
    >
      <Drawer.Screen name="Home" component={bottomTabNav} />
      <Drawer.Screen name="Booking" component={BookingStackScreen} />
      <Drawer.Screen name="Orders" component={OrderStackScreen} />
      <Drawer.Screen name="Sort" component={SortStackScreen} />
      <Drawer.Screen
        name="ScheduledOrders"
        component={ScheduledOrdersStackScreen}
      />
      <Drawer.Screen name="Unverified" component={UnverifiedStackScreen} />
      <Drawer.Screen name="Verified" component={VerifiedStackScreen} />

      <Drawer.Screen name="AllStaffs" component={TopNav} />
    </Drawer.Navigator>
  );
};

const MainTabScreen = () => {
  return <DrawerNav />;
};
export default MainTabScreen;
