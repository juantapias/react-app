import React, { Fragment, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import AuthApi from '../../services/Auth';


const Dashboard = () => {
  const Auth = useContext(AuthApi);
  //Current user data
  const { firstname, lastname, email } = Auth.userLogin;

  const handleOnClick = () => {
    Auth.setAuth(false);
    Cookies.remove('user_token');
    Cookies.remove('user_data');
  }

  return (
    <Fragment>
      <h1>Dashboard</h1>
      <h2>Hello {firstname} {lastname}</h2>
      <button onClick={handleOnClick}>Log Out</button>
    </Fragment>
  );

};


export default Dashboard;