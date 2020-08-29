import React, { Fragment, useContext, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Url from '../../services/Config';

//Import components to this page
import './Signup.css';
import Title from './components/title/Title';
import Label from './components/label/Label';
import Input from './components/input/Input';

const SignUp = () => {
  const history = useHistory();
  const [ signUp, setSignUp ] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });

  const [ emailError, setEmailError ] = useState(false);
  const [ passwordError, setPasswordError ] = useState(false);
  const [ hasError, setHasError ] = useState(false);
  const [ signup, setSignup ] = useState(false);

  const handleOnChange = (name, value) => {
    setSignUp({
      ...signUp,
      [name]: value
    })

    if (name === 'email' ) {
      setSignup(false);
    }

    if (name === "password" && value.length < 8) {
      setPasswordError(true)
    } else {
      setPasswordError(false);
    }
  }

  const ifMatch = async (param) => {
    const {firstname, lastname, email, password } = param['signUp'];
    if ( firstname.length > 0 && lastname.length > 0 && email.length > 0 && password.length > 0 ) {
      let config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(param['signUp'])
      }
      await fetch(`${Url}/users/signup`, config)
        .then((res) => {
          if ( res.status != 200 ) {
            setEmailError(true);
          } else {
            history.push("/login");
          }
        })
    } else {
      setHasError(true)
    }
  }

  const handleSubmit = e => {
    let account = { signUp }
    if ( account ) {
      setSignup(true);
      ifMatch(account)
    }
  }

  return (
    <div className="container-fluid">
      <div className="row p-0">
        <div className="col-12 col-md-6">
        <div className="login-container">
          <div className="login-box">
            <Title title="Crear cuenta"/>
            <Label label="Nombre" />
            <Input
              attr={{
                id: 'firstname',
                name: 'firstname',
                type: 'text',
                placeholder: 'Ingresar Nombre'
              }}
              onChange={handleOnChange}
            />
            <Label label="Apellido" />
            <Input
              attr={{
                id: 'lastname',
                name: 'lastname',
                type: 'text',
                placeholder: 'Ingresar Apellido'
              }}
              onChange={handleOnChange}
            />
            <Label label="Email"/>
            <Input
              attr={{
                id: 'email',
                name: 'email',
                type: 'email',
                placeholder: 'Ingresar email'
              }}
              param={emailError}
              onChange={handleOnChange}
            />
            { emailError &&
              <label className="text-danger label-error">Este correo ya existe</label>
            }
            <Label label="Contraseña" />
            <Input
              attr={{
                id: 'password',
                name: 'password',
                type: 'password',
                placeholder: 'Ingresar contraseña'
              }}
              onChange={handleOnChange}
              param={passwordError}
            />
            { hasError &&
              <label className="text-danger label-error">Error en la información ingresada</label>
            }
            {passwordError &&
              <label className="text-danger label-error">Error en la contraseña debe tener minimo 8 caracteres</label>
            }
            <button
              className="btn-login"
              onClick={handleSubmit}
            >
              { signup ? <span className="spinner-border spinner-border-sm"></span> : 'Crear cuenta' }
            </button>
            <label className="label-login">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></label>
          </div>
        </div>
        </div>
        <div className="col-12 col-md-6 bg-default">
        </div>
      </div>
    </div>
  );
};

export default SignUp;