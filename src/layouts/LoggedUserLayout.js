import React from 'react';
import { withRouter } from 'react-router';
import NavBar from '../components/common/NavBar';

const LoggedUserLayout = ({ children }) => (
  <div className="loggedUserLayout">
    <NavBar />
    { children }
  </div>
);

export default withRouter(LoggedUserLayout);