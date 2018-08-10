import React from 'react';
import { withRouter } from 'react-router';
import '../styles/NavBar.css';
import FirebaseApp from '../../utils/Firebase';

const goHome = (history) => {
  history.replace({
    pathname: `/`,
  });
};

const logOut = (history) =>  {
  FirebaseApp.signOutUser().then(() => {
    goHome(history);
  }).catch(e => console.log(e));
}

const NavBar = ({ history }) => (
  <div className="mainNav">
    <div className="mainNavInfo" onClick={() => goHome(history)}>
      <img className="blobbyLogo" src="/blobby-logo.svg" />
      <h1 className="siteName">azubiHUB</h1>
    </div>  
    <div className="mainNavMenu" >
      <span className="mainNavMenuItem" onClick={()=> logOut(history)}>Log Out</span>
    </div>
  </div>
);

export default withRouter(NavBar);