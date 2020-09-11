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

// Creates a document in the subcollection "years" based off of the year given.

const createYearDocument = async (userAuth, year, ...additionalData) => {
  if(!userAuth) return;
  console.log('createYear function called')
  const yearDocInit = firestore.collection('users').doc(userAuth.id).collection('years').doc();
  const yearDocSnapShot = await yearDocInit.get();
  const yearDocId = yearDocSnapShot.id;
  const yearRef = firestore.doc(`users/${userAuth.id}/years/${yearDocId}`);

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

// Searches Years subcollection for a document with value of the year given. If none is found, createYearDocument is called.
const queryYearSubcollection = async (userAuth, year) => {
  const yearCollRef = firestore.collection(`users/${userAuth.id}/years/`);
  const yearQuery = yearCollRef.where('year', '==', year);
  const yearDocSnap = await yearQuery.get();
  let yearDocRef;
  if (!yearDocSnap.empty) {
    yearDocSnap.forEach(async doc => {
      yearDocRef = doc.ref;
    })
  } else {
    yearDocRef = await createYearDocument(userAuth, year);
  }
  return yearDocRef;
}

// Creates a month document from the subcollection months within the relevant year document given the year and month.

const createMonthDocument = async (yearRef, month, year) => {
  const monthDocInit = firestore.collection(`${yearRef.path}/months/`).doc();
  const monthDocSnapShot = await monthDocInit.get();
  const monthDocId = monthDocSnapShot.id;
  const monthRef = firestore.doc(`${yearRef.path}/months/${monthDocId}`);

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

// Searches for a month document given the year and month, if no year is found, one is create, if no month is found one is created.
const queryMonthSubcollection = async (userAuth, year, month) => {
  const getYearRef = await queryYearSubcollection(userAuth, year);
  const monthCollRef = firestore.collection(`${getYearRef.path}/months/`);
  const monthQuery = monthCollRef.where('month', '==', `${month}`);
  const monthDocSnap = await monthQuery.get();
  let monthDocRef;
  if (!monthDocSnap.empty) {
    monthDocSnap.forEach(async doc => {
      monthDocRef = doc.ref;
    })
  } else {
    monthDocRef = await createMonthDocument(getYearRef, month, year);
  }
  return monthDocRef;
}

// Creates either an income document or expense document based upon type property within the appropriate month.
export const createDataEntryDocument = async (userAuth, year, month, dataEntry) => {
  if(!userAuth) return;
  const { type, id } = dataEntry;
  if (id === 0) return;
  console.log(dataEntry);
  const monthDocRef = await queryMonthSubcollection(userAuth, year, month);

  if ( type === 'income') {
    
    const incomeDocInit = firestore.collection(`${monthDocRef.path}/incomes/`).doc();
    const incomeDocSnapShot = await incomeDocInit.get();
    const incomeDocId = incomeDocSnapShot.id;
    const incomeRef = firestore.doc(`${monthDocRef.path}/incomes/${incomeDocId}`);

    try {
      incomeRef.set({
        type,
        ...dataEntry
      });
      console.log(incomeRef);
    } catch (error) {
      console.log('Error creating income document: ', error.message);
    }

    return incomeRef;
  }

  if ( type === 'expense') {
    const expenseDocInit = firestore.collection(`${monthDocRef.path}/expenses/`).doc();
    const expenseDocSnapShot= await expenseDocInit.get();
    const expenseDocId = expenseDocSnapShot.id;
    const expenseRef = firestore.doc(`${monthDocRef.path}/expenses/${expenseDocId}`);

    try {
      expenseRef.set({
        ...dataEntry
      });
      console.log(expenseRef);
    } catch (error) {
      console.log('Error creating expenses document: ', error.message);
    }

    return expenseRef;
  }

}

// Gathers the income and expense documents to be used for the application.
export const fetchDataEntries = async (currentUser, year, month, type) => {
  if (!currentUser) return;
  if (!currentUser.id) return;
  const fetchMonthRef = await queryMonthSubcollection(currentUser, year, month);

  if ( type === 'income') {
    const incomesCollRef = firestore.collection(`${fetchMonthRef.path}/incomes/`);
    return incomesCollRef;
  }

  if ( type === 'expense' ) {
    const expensesCollRef = firestore.collection(`${fetchMonthRef.path}/expenses/`);
    return expensesCollRef;
  }
}





export default firebase;