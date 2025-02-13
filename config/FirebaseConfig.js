import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBlaMRoMAFltRXrbYTLJDQ7mpxCYk68gng",
  authDomain: "parkme2-db232.firebaseapp.com",
  databaseURL: "https://parkme2-db232-default-rtdb.firebaseio.com",
  projectId: "parkme2-db232",
  storageBucket: "parkme2-db232.appspot.com",
  messagingSenderId: "190661361687",
  appId: "1:190661361687:android:440f8920b56b0413a2dc52" 
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
