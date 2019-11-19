import React, { Component } from "react";
//import { Row, FormGroup, FormControl, ControlLabel, Button, FormText } from 'react-bootstrap';
import './login.css';
import './mylogin.css';

import { isEmail, isEmpty } from './validator';

import { NavLink, } from "react-router-dom";

import TextField from "@material-ui/core/TextField";

import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import './mylogin.css';



class register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false, // Indicates in progress state of login form
            validateResponse: [],
            product: {
                email: '',
                password: '',
                phone_number: ''

            }
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

        else {
            this.validateUser(formData.email, formData.password);
            setTimeout(() => {
                if (this.state.validateResponse.valid === true) {
                    alert("Login Successful");
                    this.props.history.push('/dark');
                    return true;
                }
                else {
                    alert("Login Failed");
                    errors.password = "incorrect password";
                    return false
                }
            }, 1000);
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
                validateResponse: json
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

    addProduct = _ => {
        const { product } = this.state;
        //console.log(product.email);
        const url = 'http://localhost:4000/products/add?email=' + product.email + '&password=' + product.password + '&phone_number=' + product.phone_number;
        console.log(url);
        fetch(url)
            .then(this.getProducts)
            .catch(err => console.error(err))
        const { formData } = this.state;
        localStorage.setItem('reg_status', 'Logout')
        localStorage.setItem('db_email', formData.email);
        localStorage.setItem('login_status', '');
        this.props.history.push('/');
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
            localStorage.setItem('reg_status', 'Logout')
            localStorage.setItem('db_email', formData.email);
            this.props.history.push('/dark')
        } else {
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
    }
    hide() {
        let star = "";
        const { product } = this.state;
        for (let i = 0; i < product.password.length; i++) {
            star += '*';
        }
        return star;
    }
    render() {
        const { products, product } = this.state;        return (
            <div>
                <div class="limiter">
                    <div class="container-login100">
                        <div class-="wrap-login100">
                            <div class="lo">
                                <Avatar class="avatar">
                                    <LockOutlinedIcon />
                                </Avatar>
                                <div class="log">
                                    Register
                                </div>
                            </div>
                            <form className="login100-form validate-form" onSubmit={this.addProduct}>

                                <div class="wrap-input100 validate-input "
                                    data-validate="username is required">
                                Enter your email:<p>
                                        <TextField class="fields" value={product.email}
                                        onChange={e => this.setState({ product: { ...product, email: e.target.value } })} /></p>
                                    


                                </div>
                                <div class="wrap-input100 validate-input "
                                    data-validate="username is required">
                                    Enter your password:<p>
                                        <TextField class="fields" type = "password" value={product.password}
                                            onChange={e => this.setState({ product: { ...product, password: e.target.value } })} /></p>



                                </div>

                                <div class="wrap-input100 validate-input "
                                    data-validate="username is required">
                                    Enter your phone number:<p>
                                        <TextField class="fields" value={product.phone_number}
                                            onChange={e => this.setState({ product: { ...product, phone_number: e.target.value } })} /></p>



                                </div>
                                <div class="container-login100-form-btn">
                                    <button class="login100-form-btn" >
                                        Register
                                </button>
                                </div>
                                <NavLink class="link" to="/login">already have an account? Login </NavLink>

                            </form>

                        </div>

                    </div>

                </div >

            </div>
        )
    }
}

export default register;





