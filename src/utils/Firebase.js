import firebaseApp from '../firebase.js';

const FirebaseApp = {};

FirebaseApp.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        firebaseApp.auth().onAuthStateChanged((user) => {
        	if (user) {
        	    resolve(user);
        	} else {
        	    reject('User not logged.');
        	}
        });
    });

};

export default FirebaseApp;