import firebase from 'firebase/app'
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyCkq10ahPDF8tpuXhsaVFgD36me8qxZ9HM",
    authDomain: "vue-shop-7a85f.firebaseapp.com",
    projectId: "vue-shop-7a85f",
    storageBucket: "vue-shop-7a85f.appspot.com",
    messagingSenderId: "463439975053",
    appId: "1:463439975053:web:14d44d6e7d9e120f6388c4",
    measurementId: "G-FTQN622TQ6"
  };

  // Initialize Firebase
 export const db =  firebase.initializeApp(firebaseConfig).firestore();
// const {TimeStamp, GeoPoint} = firebase.firestore
// export {TimeStamp, GeoPoint}
//firebase.analytics();