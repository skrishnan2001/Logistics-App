import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import Firebase from "../firebaseConfig";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,

        login: async (email, password) => {
          try {
            Firebase.auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
            Alert.alert(
              "Login Authentication Error",
              { e },
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
          }
        },

        logout: async () => {
          try {
            Firebase.auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
