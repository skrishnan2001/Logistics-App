import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { AuthContext } from "../navigation/AuthProvider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

//import{ AuthContext } from '../components/context';

export function DrawerContent(props) {
  const paperTheme = useTheme();
  const { user, logout } = useContext(AuthContext);
  //const { signOut, toggleTheme } = React.useContext(AuthContext);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={require("../assets/profilepic.png")}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>Admin</Title>
                <Caption style={styles.caption}>@admin</Caption>
              </View>
            </View>

            {/* <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View>
                        </View> */}
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="calendar-account" color={color} size={size} />
              )}
              label="Leave Requests"
              onPress={() => {
                props.navigation.navigate("LeaveReq");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="bookmark-outline" color={color} size={size} />
              )}
              label="Booking"
              onPress={() => {
                props.navigation.navigate("Booking");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="clipboard-list" color={color} size={size} />
              )}
              label="Orders"
              onPress={() => {
                props.navigation.navigate("Orders");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="sort" color={color} size={size} />
              )}
              label="Sort/Schedule"
              onPress={() => {
                props.navigation.navigate("Sort");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="clipboard-list-outline" color={color} size={size} />
              )}
              label="Scheduled Orders"
              onPress={() => {
                props.navigation.navigate("ScheduledOrders");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="playlist-check" color={color} size={size} />
              )}
              label="Delivered Orders"
              onPress={() => {
                props.navigation.navigate("Delivered");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-cash" color={color} size={size} />
              )}
              label="Staff Requests"
              onPress={() => {
                props.navigation.navigate("Request");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="User Profiles"
              onPress={() => {
                props.navigation.navigate("AllStaffs");
              }}
            />
          </Drawer.Section>
          {/* <Drawer.Section title="Preferences">
                        <TouchableRipple /*onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section> */}
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => logout()}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    //borderColor: '#f4f4f4',
    //borderWidth: 0.3,
    backgroundColor: "#d1d1d1",
    borderRadius: 15,
    marginHorizontal: 10,
    justifyContent: "center",
    textAlign: "center",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
