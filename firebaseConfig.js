import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCJ3RbTJyYxF2WJNT1DTanRccS3_iX8HBM",
  authDomain: "logistics-b2982.firebaseapp.com",
  databaseURL: "https://logistics-b2982-default-rtdb.firebaseio.com",
  projectId: "logistics-b2982",
  storageBucket: "logistics-b2982.appspot.com",
  messagingSenderId: "800935389411",
  appId: "1:800935389411:web:e42115d0016acb708fbdd6",
  measurementId: "G-8NWCGW9M38",
};
// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);
export const db = Firebase.database();
export default Firebase;
