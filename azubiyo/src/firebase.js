//Firebase Config
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAPz6_EdaBTGHFPi24iaJO3rPbenWhg-2c",
    authDomain: "azubiyo-166eb.firebaseapp.com",
    databaseURL: "https://azubiyo-166eb.firebaseio.com",
    projectId: "azubiyo-166eb",
    storageBucket: "azubiyo-166eb.appspot.com",
    messagingSenderId: "636250878255",
	persistence: true,
    enableRedirectHandling: true
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();