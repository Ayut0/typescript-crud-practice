import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import {firebaseConfig} from './firebaseConfig';
import { getFirestore } from "firebase/firestore";

const app =  initializeApp(firebaseConfig)
export default firebase;
export const db = getFirestore(app)
