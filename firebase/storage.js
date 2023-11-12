import firebase from "./firebase";
import { getStorage } from "firebase/storage";

const storage = getStorage(firebase.firebaseApp);

export default storage;
