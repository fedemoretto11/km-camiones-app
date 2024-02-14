import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// const firebaseConfig = {
//   apiKey: process.env.apiKey,
//   authDomain: process.env.authDomain,
//   projectId: process.env.projectId,
//   storageBucket: process.env.storageBucket,
//   messagingSenderId: process.env.messagingSenderId,
//   appId: process.env.appId
// };
const firebaseConfig = {
  apiKey: "AIzaSyBJuLITMfdbUeJnMg-7xXTF_NG_bMysvX8",
  authDomain: "km-camiones-app.firebaseapp.com",
  projectId: "km-camiones-app",
  storageBucket: "km-camiones-app.appspot.com",
  messagingSenderId: "220366426787",
  appId: "1:220366426787:web:df177e9846baaf0469e516"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)