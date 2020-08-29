import React, { Fragment, useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import AuthApi from './services/Auth';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/Signup';
import Dashboard from './pages/dashboard/Dashboard';


const Routes = () => {
  const Auth = useContext(AuthApi)

  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedLoged exact path="/login" auth={Auth.auth} component={Login} />
        <ProtectedLoged exact path="/signup" component={SignUp} />
        <ProtectedDashboard exact path="/dashboard" auth={Auth.auth} component={Dashboard} />
      </Switch>
    </Fragment>
  );
};

const ProtectedDashboard = ({auth ,component:Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render = {() => auth ? (
        <Component />
      ) : ( <Redirect to="/login" />)}
    />
  );
}

const ProtectedLoged = ({auth ,component:Component, ...rest}) => {
  return (
    <Route
      {...rest}
      render = {() => !auth ? (
        <Component />
      ) : ( <Redirect to="/dashboard" />)}
    />
  );
}

export default Routes;