import React from 'react';
import { withRouter } from 'react-router';
import NavBar from '../components/common/NavBar';
import '../components/styles/LoggedUserLayout.css';

const LoggedUserLayout = ({ children }) => (
  <div className="loggedUserLayout">
    <NavBar />
    <div className="mainContent">
      { children }
    </div>
  </div>
);

export default withRouter(LoggedUserLayout);