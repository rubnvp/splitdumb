// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnYK4wwuKBKYVp_MpZIACTqktQrF2imAY",
  authDomain: "splitdumb.firebaseapp.com",
  projectId: "splitdumb",
  storageBucket: "splitdumb.appspot.com",
  messagingSenderId: "778009550602",
  appId: "1:778009550602:web:e6af0bae039af73804a4f3",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

// Custom methods
export const subscribeToRoom = (roomName, callback) => {
  const roomRef = doc(db, "rooms", roomName);
  onSnapshot(roomRef, (doc) => {
    const docData = doc.data();
    if (!docData) return;
    const { participantsText } = docData;
    callback(JSON.parse(participantsText));
  });
};

export const updateParticipants = async (roomName, participants) => {
  const roomRef = doc(db, "rooms", roomName);
  // avoid unnecessary updates
  const roomSnap = await getDoc(roomRef);
  if (roomSnap.exists()) {
    const { participantsText } = roomSnap.data();
    if (participantsText === JSON.stringify(participants)) return;
  }
  await setDoc(roomRef, {
    participantsText: JSON.stringify(participants)
  });
};
