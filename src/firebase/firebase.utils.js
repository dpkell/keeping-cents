import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Config object for Firebase API

const config = {
    apiKey: "AIzaSyC21E8dDapL3IBrFWuCN2aFrgUUjetzr1s",
    authDomain: "keepingcents-b8df2.firebaseapp.com",
    databaseURL: "https://keepingcents-b8df2.firebaseio.com",
    projectId: "keepingcents-b8df2",
    storageBucket: "keepingcents-b8df2.appspot.com",
    messagingSenderId: "277889754878",
    appId: "1:277889754878:web:8ee1feaeb1370114e627af",
    measurementId: "G-6TSK2YQZ1R"
};

// Initialize the app to firebase.
firebase.initializeApp(config);

// Declaration and export of auth() and firestore() functions to variables to be used elsewhere within the application.
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Declaration of sign-in with Google authorization using a google account.
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});

// Export of previous sign-in declaration as a parameter for auth() function.
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

/* 
  Asynchronous function that checks the Firebase Database if a user already exists within the database using a snapshot, if there is no
  entry/document within the database, add the user to the database.
*/
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user: ', error.message);
    }
  }

  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth =>{
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};



export default firebase;