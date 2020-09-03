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

const createYearDocument = async (userAuth, year, ...additionalData) => {
  if(!userAuth) return;
  console.log('createYear function called')
  const yearDocInit = firestore.collection('users').doc(userAuth.id).collection('year').doc();
  const yearDocSnapShot = await yearDocInit.get();
  const yearDocId = yearDocSnapShot.id;
  const yearRef = firestore.doc(`users/${userAuth.id}/year/${yearDocId}`);
  // const yearSnapShot = await yearRef.get();

  const createdAt = new Date();

  try {
    await yearRef.set({
      year,
      createdAt,
      ...additionalData
    });
    console.log(yearRef);
  } catch (error) {
      console.log('Error creating Year document: ', error.message)
  } 
  return yearRef;
};

const createMonthDocument = async (yearRefPath, month, year) => {

  const monthDocInit = firestore.doc(`${yearRefPath}/months/`);
  const monthDocSnapShot = await monthDocInit.get();
  const monthDocId = monthDocSnapShot.id;
  const monthRef = firestore.doc(`${yearRefPath}/months/${monthDocId}`);

  const createdAt = new Date();

  try {
    await monthRef.set({
      year,
      month,
      createdAt
    });
    console.log(monthRef)
  } catch (error) {
      console.log('Error creating month document: ', error.message);
  }
  return monthRef;
}

export const createDataEntryDocument = async (userAuth, year, month, dataEntry) => {
  if(!userAuth) return;
  const { type } = dataEntry 
  const monthCollRef = firestore.collection(`users/${userAuth.id}/year/${year}`)
  let monthDocRef = firestore.doc(`users/${userAuth.id}/${year}/months/${month}`);
  const monthDocSnap = await monthDocRef.get();
  const newDataDoc = firestore.doc(`users/${userAuth.id}/${year}/${month}/`);

  if (!monthDocSnap.exists) {
    console.log('createMonth if statement accessed');
    monthDocRef = await createMonthDocument(userAuth, year, month);
  }

  if ( type === 'income') {
    const incomeDocInit = firestore.doc(`${monthDocRef}/incomes/${newDataDoc}`);
    const incomeDocSnapShot = await incomeDocInit.get();
    const incomeDocId = incomeDocSnapShot.id;
    const incomeRef = firestore.doc(`${monthDocRef}/incomes/${incomeDocId}`);
    const incomeSnapShot = await incomeRef.get();

    try {
      incomeSnapShot.set({
        ...dataEntry
      });
      console.log(incomeDocSnapShot);
    } catch (error) {
      console.log('Error creating income document: ', error.message);
    }

    return incomeRef;
  }

  if ( type === 'expense') {
    const expenseDocInit = firestore.doc(`${monthDocRef}/expenses/${newDataDoc}`);
    const expenseDocSnapShot= await expenseDocInit.get();
    const expenseDocId = expenseDocSnapShot.id;
    const expenseRef = firestore.doc(`${monthDocRef}/expenses/${expenseDocId}`);
    const expenseSnapShot = await expenseRef.get();

    try {
      expenseSnapShot.set({
        ...dataEntry
      });
      console.log(expenseSnapShot);
    } catch (error) {
      console.log('Error creating expenses document: ', error.message);
    }

    return expenseRef;
  }

}

const queryYearSubcollection = async (userAuth, year) => {
  const yearCollRef = firestore.collection(`users/${userAuth.id}/year/`);
  const yearQuery = yearCollRef.where('year', '==', `${year}`);
  const yearDocSnap = await yearQuery.get();
  let yearDocRef;
  if (!yearDocSnap.empty) {
    yearDocSnap.forEach(async doc => {
      yearDocRef = await doc.get();
    })
  } else {
    yearDocRef = await createYearDocument(userAuth, year);
  }
  return yearDocRef;
}

const queryMonthSubcollection = async (userAuth, year, month) => {
  const getYearRef = await queryYearSubcollection(userAuth, year);
  const monthCollRef = firestore.collection(`${getYearRef.path}/months/`);
  const monthQuery = monthCollRef.where('month', '==', `${month}`);
  const monthDocSnap = await monthQuery.get();
  let monthDocRef;
  if (!monthDocSnap.empty) {
    monthDocSnap.forEach(async doc => {
      monthDocRef = await doc.get();
    })
  } else {
    monthDocRef = await createMonthDocument(getYearRef.path, month, year);
  }
  return monthDocRef;
}



export default firebase;