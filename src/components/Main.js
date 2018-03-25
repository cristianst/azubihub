import React, { Component } from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';

import UserMain from './UserMain.js';
import Login from './Login.js';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            userLoaded: false,
            user: {}
        };
    }
    componentWillMount(){
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
			    const { displayName, email, photoURL } = user;
				this.setState({
				    userLoaded: true,
                    user: {
                        ...this.state.user,
                        _id: user.uid,
                        displayName,
                        email,
                        photoURL,
                    },
                });
			}
		});

	}
    loginWithFacebook(){
	    const provider = new firebase.auth.FacebookAuthProvider();

	    firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            //const token = result.credential.accessToken;
            // The signed-in user info.
            const user = result.user;

            const { displayName, email, photoURL } = user;

            // Store user into collection.
            firebase.firestore().collection('users').doc(user.uid).set({
                displayName,
                email,
                photoURL
            });
        }).catch(function(error) {
            // Handle Errors here.
            console.log(error);
        });
	}
    render(){
        const { userLoaded, user } = this.state;
        if(!userLoaded){
            // Login
            return (
                <Login loginAction={this.loginWithFacebook}/>
            );
        }
        // User Logged
        return <UserMain user={user}/>;

    }
}

export default Main;