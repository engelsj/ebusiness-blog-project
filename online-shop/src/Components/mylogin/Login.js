import React, { Component } from "react";
//import { Row, FormGroup, FormControl, ControlLabel, Button, FormText } from 'react-bootstrap';
import './login.css';
import { isEmail, isEmpty} from './validator';

import { NavLink, } from "react-router-dom";

import TextField from "@material-ui/core/TextField";

import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import './mylogin.css';



class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false, // Indicates in progress state of login form
            validateResponse: []
        }


    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        formData[name] = value;

       this.setState({
            formData: formData
        });
    }

    validateLoginForm = (e) => {

        let errors = {};
        const { formData } = this.state;

        if (isEmpty(formData.email)) {
            errors.email = "Email can't be blank";
            return errors;
        } else if (!isEmail(formData.email)) {
            errors.email = "Please enter a valid email";
            return errors;
        }

        else if (isEmpty(formData.password)) {
            errors.password = "Password can't be blank";
            return errors;
        }

        else
        {
            this.validateUser(formData.email, formData.password);
            setTimeout(()=>{
            if(this.state.validateResponse.valid===true){
                alert("Login Successful");
                this.props.history.push('/dark');
                return true;
            }
            else{
                alert("Login Failed");
                errors.password = "incorrect password";
                return false
            }
            },1000);
        }
        return false;
    }

    
    validateUser(username, password) {
        let headers = new Headers();
        fetch('http://localhost:8080/validate/login', {
        method: 'POST',
        body: JSON.stringify({
        userName: username,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => {
        return response.json()
      }).then(json => {
        this.setState({
          validateResponse:json
        });
      });
    }

    check() {
        var test = "yess";
        var x = test.charAt(1);
        console.log(x);
    }
    signOut() {
        this.setState({ user: null })
    }

    signIn(username, password) {
        this.setState({
            user: {
                username,
                password,
            }
        })
    }


    login = (e) => {
        console.log(localStorage.getItem('login_status'));
        localStorage.setItem('login_status', '');

        e.preventDefault();
        let errors = this.validateLoginForm();

        if (errors === true) {
            alert("You are successfully signed in...");
            localStorage.setItem('login_status', '');
            const { formData } = this.state;
            localStorage.setItem('db_email', formData.email);
            this.props.history.push('/dark')
        } else {
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div class="limiter">
                    <div class="container-login100">
                        <div class-="wrap-login100">
                            <div class="lo">
                                <Avatar class="avatar">
                                    <LockOutlinedIcon />
                                </Avatar>
                                <div class="log">
                                    Login
                                </div>
                            </div>
                            <form className="login100-form validate-form" onSubmit={this.login}>

                                <div class="wrap-input100 validate-input "
                                    data-validate="username is required">

                                    <TextField class="fields" type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                                    {errors.email &&
                                        <div class="errors">{errors.email}</div>
                                    }
                                   

                                </div>
                                <div class="wrap-input100 validate-input "
                                    data-validate="username is required">

                                   
                                    <TextField class="fields" type="text" name="password" placeholder="Enter your email" onChange={this.handleInputChange} />
                                    {errors.password &&
                                        <div class="errors">{errors.password}</div>
                                    }

                                </div>
                                <div class="container-login100-form-btn">
                                    <button class="login100-form-btn" >
                                        Login
                                </button>
                                </div>
                                <div>
                                <NavLink class="link" to="/Secure">do you not trust your device?</NavLink>
                                    </div>
                                <div>
                                    <NavLink class="link" to="/register">Dont have an account? Register </NavLink>
</div>
                            </form>

                        </div>

                    </div>

                </div >

            </div>
        )
    }
}

export default Login;






/*<div className="Home">

//                <h1>Login</h1>


//                <Row>
//                    <form onSubmit={this.login} >
                        
//                        <FormGroup class= "wrap-input100" controlId="email" validationState={formSubmitted ? (errors.email ? 'error' : 'success') : null}>
                            
//                            <TextField  type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
//                            {errors.email &&*
//                                <HelpBlock>{errors.email}</HelpBlock>
//                            }
//                        </FormGroup>
//                        <FormGroup controlId="password" validationState={formSubmitted ? (errors.password ? 'error' : 'success') : null}>
                           
//                            <TextField type="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange} />
//                            {errors.password &&
//                                <HelpBlock>{errors.password}</HelpBlock>
//                            }
//                        </FormGroup>
//                        <div class="btn">
//                            <button class="form-btn">
//                                Login
//                                </button>
//                            </div>
//                    </form>
//                </Row>


//            </div>

/*
import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Auth from "../../Auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setLoggedInUser } from "../../Redux/Actions";
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { NavLink, } from "react-router-dom";
import './mylogin.css';
import './login.css';
class ConnectedLogin extends Component {
    state = {
        userName: "",
        pass: "",
        redirectToReferrer: false
    };





    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };

        // If user was authenticated, redirect her to where she came from.
        if (this.state.redirectToReferrer === true) {
            return <Redirect to={from} />;
        }

        return (
            <div class="l">
                <div class="lo">
                    <Avatar class="avatar">
                        <LockOutlinedIcon />
                    </Avatar>
                    <div class="log">
                        {" "}
                        Log in
            {" "}
                    </div>
                    <TextField 
                        value={this.state.userName}
                        placeholder="User name"
                        onChange={e => {
                            this.setState({ userName: e.target.value });
                        }}
                    />
                    <TextField 
                        value={this.state.pass}
                        type="password"
                        placeholder="Password"
                        onChange={e => {
                            this.setState({ pass: e.target.value });
                        }}
                    />
                    
                    <div class="container-login100-form-btn">
                        <button class="login100-form-btn" >
                            Login
                                </button>
                    </div>
                   
                    <NavLink to="/Secure">do you not trust your device?</NavLink>
                    {this.state.wrongCred && (
                        <div style={{ color: "red" }}>Wrong username and/or password</div>
                    )}
                </div>
            </div>
        );
    }
}
const Login = withRouter(connect()(ConnectedLogin));

export default Login;



 *  <Button
                        style={{ marginTop: 20, width: 200 }}
                        variant="outlined"
                        color="primary"
                        onClick={() => {

                            // Simulate authentication call
                            Auth.authenticate(this.state.userName, this.state.pass, user => {

                                if (!user) {
                                    this.setState({ wrongCred: true });
                                    return;
                                }

                                this.props.dispatch(setLoggedInUser({ name: user.name }));
                                this.setState(() => ({
                                    redirectToReferrer: true
                                }));
                            });
                        }}
                    >
                        Log in
          </Button>
          */
