import React from "react";
import "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./Profile";
import UpdateUserDetails from "./UpdateUserDetails";
import ResetPassword from "./ResetPassword";
import ResetEmail from "./ResetEmail";
import RequestsScreen from "./Requests";
import Leave from "./Leave";
import MyOrders from "./MyOrders";
import InvoiceScreen from "./InvoiceScreen";
import InvoiceDelivered from "./InvoiceDelivered";
import TrackMe from "./TrackMe";
import InvoicePDF from "./InvoicePDF";
import Appraisal from "./Appraisal";
import Notifications from "./Notifications";
import { DrawerContent } from "./DrawerContent";

const HomeStack = createStackNavigator();
const TrackMeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const RequestStack = createStackNavigator();
const NotificationsStack = createStackNavigator();

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
          headerRight: () => (
            <Icon.Button
              name="ios-notifications"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.navigate("Notifications")}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      <HomeStack.Screen
        name="MyOrders"
        component={MyOrders}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () => (
            <Icon.Button
              name="ios-notifications"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.navigate("Notifications")}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />

      <HomeStack.Screen
        name="Invoice"
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
          headerRight: () => (
            <Icon.Button
              name="ios-notifications"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.navigate("Notifications")}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      <HomeStack.Screen
        name="Invoice-Delivered"
        component={InvoiceDelivered}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () => (
            <Icon.Button
              name="ios-notifications"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.navigate("Notifications")}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />



      <HomeStack.Screen
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
          headerRight: () => (
            <Icon.Button
              name="ios-notifications"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.navigate("Notifications")}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />


      {/* <HomeStack.Screen
        name="Notifications"
        component={Notifications}
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
    </HomeStack.Navigator>
  );
};

const TrackMeStackScreen = ({ navigation }) => {
  return (
    <TrackMeStack.Navigator>
      <TrackMeStack.Screen
        name="TrackMe"
        component={TrackMe}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () => (
            <Icon.Button
              name="ios-notifications"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.navigate("Notifications")}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
    </TrackMeStack.Navigator>
  );
};

const NotificationsStackScreen = ({ navigation }) => {
  return (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen
        name="Notifications"
        component={Notifications}
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
    </NotificationsStack.Navigator>
  );
};

const RequestsStackScreen = ({ navigation }) => {
  return (
    <RequestStack.Navigator>
      <RequestStack.Screen
        name="Requests"
        component={RequestsScreen}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () => (
            <Icon.Button
              name="ios-notifications"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.navigate("Notifications")}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      <RequestStack.Screen
        name="Leave"
        component={Leave}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () => (
            <Icon.Button
              name="ios-notifications"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.navigate("Notifications")}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      <RequestStack.Screen
        name="Appraisal"
        component={Appraisal}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () => (
            <Icon.Button
              name="ios-notifications"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.navigate("Notifications")}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
    </RequestStack.Navigator>
  );
};

const ProfileStackScreen = ({ navigation }) => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () => (
            <Icon.Button
              name="ios-notifications"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.navigate("Notifications")}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      <ProfileStack.Screen
        name="MyOrders"
        component={MyOrders}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () => (
            <Icon.Button
              name="ios-notifications"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.navigate("Notifications")}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      <ProfileStack.Screen
        name="Invoice"
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
          headerRight: () => (
            <Icon.Button
              name="ios-notifications"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.navigate("Notifications")}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      <ProfileStack.Screen
        name="Invoice-Delivered"
        component={InvoiceDelivered}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () => (
            <Icon.Button
              name="ios-notifications"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.navigate("Notifications")}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      <ProfileStack.Screen
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
          headerRight: () => (
            <Icon.Button
              name="ios-notifications"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.navigate("Notifications")}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      <ProfileStack.Screen
        name="UpdateUserDetails"
        component={UpdateUserDetails}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () => (
            <Icon.Button
              name="ios-notifications"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.navigate("Notifications")}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      <ProfileStack.Screen
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
          headerRight: () => (
            <Icon.Button
              name="ios-notifications"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.navigate("Notifications")}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      <ProfileStack.Screen
        name="Reset-Email"
        component={ResetEmail}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () => (
            <Icon.Button
              name="ios-notifications"
              size={25}
              backgroundColor="#88c7eb"
              onPress={() => navigation.navigate("Notifications")}
            ></Icon.Button>
          ),
          headerStyle: {
            backgroundColor: "#88c7eb",
          },
          headerTintColor: "#35126e",
        }}
      />
      
    </ProfileStack.Navigator>
  );
};

// const SignInStackScreen = ({ navigation }) => {
//   return (
//     <SignInStack.Navigator>
//       <SignInStack.Screen
//         name="SignIn"
//         component={Screen}
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
        name="Request"
        component={RequestsStackScreen}
        options={{
          tabBarLabel: "Request",
          tabBarColor: "#34ebc0",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-briefcase" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarColor: "#34ebc0",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
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
      <Drawer.Screen name="Requests" component={RequestsStackScreen} />
      <Drawer.Screen name="Profile" component={ProfileStackScreen} />
      <Drawer.Screen name="TrackMe" component={TrackMeStackScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsStackScreen} />
    </Drawer.Navigator>
  );
};

const MainTabScreen = () => {
  return <DrawerNav />;
};
export default MainTabScreen;
