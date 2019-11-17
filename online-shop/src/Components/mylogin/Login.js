import React, { Component } from "react";
//import { Row, FormGroup, FormControl, ControlLabel, Button, FormText } from 'react-bootstrap';
import './login.css';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from './validator';
import Loginlogo from './login.png';
import { NavLink, } from "react-router-dom";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Auth from "../../Auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setLoggedInUser } from "../../Redux/Actions";
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import './mylogin.css';
import db from './db';


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false // Indicates in progress state of login form
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
        } else if (!isEmail(formData.email)) {
            errors.email = "Please enter a valid email";
        }

        if (isEmpty(formData.password)) {
            errors.password = "Password can't be blank";
        } else if (isContainWhiteSpace(formData.password)) {
            errors.password = "Password should not contain white spaces";
        } else if (!isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
            errors.password = "Password's length must between 6 to 16";
        }
        else if (("banan" + formData.password + "a") !== "bananbananaa") {
            //check();
            errors.password = "incorrect password";

        }

        if (isEmpty(errors)) {
            return true;
        } else {

            return errors;
        }
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

        e.preventDefault();
        let errors = this.validateLoginForm();

        if (errors === true) {
            alert("You are successfully signed in...");
            this.props.history.push('/dark')


        } else {
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
    }

    render() {

        const { errors, formSubmitted } = this.state;

        return (
           

                    
                        
                        
         
            <body>
                
                <div class="limiter">
                    <div class="container-login100">
                        <div class-="wrap-login100">
                          
                                <div class="lo">
                            <Avatar class="avatar">
                                <LockOutlinedIcon />
                            </Avatar>
                            <div class="log">
                                Log in
                                </div>
                                </div>
                            <form className="login100-form validate-form"  onSubmit={this.login}>
                               

                                    <div class="wrap-input100" controlId="email" validationState={formSubmitted ? (errors.email ? 'error' : 'success') : null}>

                                        <input class="input100" type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                                        {errors.email &&
                                        <div class="errors">{errors.email}</div>
                                        }
                                    </div>
                                    <div controlId="password" validationState={formSubmitted ? (errors.password ? 'error' : 'success') : null}>

                                        <input class="input100" type="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange} />
                                    {errors.password &&
                                        
                                        <div class="errors">{errors.password}</div>
                                        }
                                    </div>
                                <div class="container-login100-form-btn">
                                    <button class="login100-form-btn" >
                                        Login
                                </button>
                                </div>
                                {db.j}
                                <NavLink to="/Secure">do you not trust your device?</NavLink>
                                {console.log(db.j)}
                                
                            </form>
                            
                        </div>
                    </div>
                </div >
            </body>
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
