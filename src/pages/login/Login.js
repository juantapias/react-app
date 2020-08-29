import React, { Fragment, useContext, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Url from '../../services/Config';
import AuthApi from '../../services/Auth';
import Cookies from 'js-cookie';

//Import components to this page
import './Login.css';
import Title from './components/title/Title';
import Label from './components/label/Label';
import Input from './components/input/Input';

const Login = () => {
  const Auth = useContext(AuthApi);
  const history = useHistory();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordError, setPasswordError ] = useState(false);
  const [ hasError, setHasError ] = useState(false);
  const [ isLogin, setIsLogin ] = useState(false);

  const handleOnChange = (name, value) => {
    if ( name === 'email' ) {
      setEmail(value);
    } else {
      if ( value.length < 8 ) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
        setPassword(value);
      }
      setPassword(value);
    }
  };

  const ifMatch = async (param) => {
    const { email, password } = param;
    if (email.length > 0 && password.length > 0) {
      let config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
      }
      await fetch(`${Url}/users/login`, config)
      .then((res) => {
          if ( res.status != 200 ) {
            setHasError(true);
          } else {
            res.text().then((data) => {
              let resJson = JSON.parse(data);
              let success = resJson['success']
              Auth.setAuth(true);
              Cookies.set('user_token', success, {expires: 1});
              getCurrentUser(success);
            });
          }
      });
    }
  }

  const getCurrentUser = async (param) => {
    if (param) {
      let config = {
        headers: {
          'user-token': param
        }
      }
      await fetch(`${Url}/users/loguser`, config)
        .then((res) => {
          res.text().then((data) => {
            let resJson = JSON.parse(data);
            let userData = {
              firstname: resJson.firstname,
              lastname: resJson.lastname,
              email: resJson.email
            }
            userData = JSON.stringify(userData);
            Cookies.set('user_data', userData, {expires: 1})
          })
        })
    }
  }

  const handleSubmit = e => {
    let account = { email, password }
    if ( account ) {
      setIsLogin(true);
      ifMatch(account);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row p-0">
        <div className="col-12 col-md-6 bg-default">

        </div>
        <div className="col-12 col-md-6">
          <div className="login-container">
            <div className="login-box">
            <Title title="Iniciar sesión" />
            <Label label="Email" />
            <Input
              attr={{
                id: 'email',
                type: 'email',
                name: 'email',
                placeholder: 'Ingrese correo eléctronico',
              }}
              onChange={handleOnChange}
            />
            <Label label="Contraseña" />
            <Input
              attr={{
                id: 'password',
                type: 'password',
                name: 'password',
                placeholder: 'Ingrese contraseña',
              }}
              onChange={handleOnChange}
              params={passwordError}
            />
            { hasError &&
              <label className="text-danger label-error">Usuario y/o contraseña incorrecta</label>
            }
            { passwordError &&
              <label className="text-danger label-error">Error en la contraseña debe tener minimo 8 caracteres</label>
            }
            <button
              className="btn-login"
              onClick={handleSubmit}
            >
              { isLogin ? <span className="spinner-border spinner-border-sm"></span> : 'Iniciar sesión' }
            </button>
            <label className="label-signup">¿No tienes cuenta aún? <Link to="/signup">Regístrate aquí</Link></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login