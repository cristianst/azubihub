import React, { Component } from 'react';
import * as firebase from 'firebase';
import UserMain from './UserMain.js';
import Login from './Login.js';
import 'firebase/firestore';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            user: null
        };
    }
    componentWillMount(){
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
			    const { displayName, email, photoURL } = user;
				this.setState({
				    loading: false,
                    user: {
                        _id: user.uid,
                        displayName,
                        email,
                        photoURL,
                    },
                });
			} else {
                this.setState({
                    loading: false,
                });
            }
		});

	}
    loginWithFacebook(){
	    const provider = new firebase.auth.FacebookAuthProvider();

	    firebase.auth().signInWithPopup(provider).then(function(result) {
            const user = result.user;
            const { displayName, email, photoURL } = user;

            // Store user into collection.
            firebase.firestore().collection('users').doc(user.uid).set({
                displayName,
                email,
                photoURL
            });
        }).catch(function(error) {
            // Handle Errors here
            console.log(error);
        });
    }
    renderMainContent = () => {
        const { user } = this.state;
        if(!user){
            return <Login loginAction={this.loginWithFacebook}/>;
        }
        return <UserMain user={user}/>;
    }
    render(){
        const { loading } = this.state;
        if(loading) return null;
        return this.renderMainContent();
    }
}

export default Main;