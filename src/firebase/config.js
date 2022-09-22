import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1jXkfRRmV90JQ5hpmYP0dKpRg2sXfTIM",
  authDomain: "miniblog-16eb8.firebaseapp.com",
  projectId: "miniblog-16eb8",
  storageBucket: "miniblog-16eb8.appspot.com",
  messagingSenderId: "683203274414",
  appId: "1:683203274414:web:26f288c2b401915b4a6f3f",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
