import React, { useEffect, useState, Fragment } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

//import apps components
import AuthApi from './services/Auth';
import Cookies from 'js-cookie';
import Routes from './Routes';

const App = () => {
  const [ auth, setAuth ] = useState(false);
  const [ userLogin, setUserLogin ] = useState({
    firstname: '',
    lastname: '',
    email: ''
  });

  const readCookie = () => {
    const userToken = Cookies.get('user_token');
    const userData = Cookies.get('user_data');
    if (userToken && userData) {
      let userDataJson = JSON.parse(userData);
      setAuth(true);
      setUserLogin({
        firstname: userDataJson.firstname,
        lastname: userDataJson.lastname,
        email: userDataJson.email
      });
    }
  }

  useEffect(() => {
    readCookie();
  }, [])

  return (
    <Fragment>
      <AuthApi.Provider value={{auth, setAuth, userLogin, setUserLogin}} >
        <Router>
          <Routes />
        </Router>
      </AuthApi.Provider>
    </Fragment>
  );
};

export default App;
