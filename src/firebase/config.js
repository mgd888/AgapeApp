import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAojoPxPQLa9aUm794-gL0SLUvgngUmnfc',
	authDomain: 'agapedb-ddf34.firebaseapp.com',
	databaseURL: 'https://agapedb-ddf34-default-rtdb.firebaseio.com',
	projectId: 'agapedb-ddf34',
	storageBucket: 'agapedb-ddf34.appspot.com',
	messagingSenderId: '539600118777',
	appId: '1:539600118777:web:79a0326a5eb2e69b055328',
	measurementId: 'G-SJC8XNT54X',
};

let app;

if (firebase.apps.length === 0) {
	app = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
