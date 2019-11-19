import React, { Component } from "react";
import './login.css';
import { isEmail, isEmpty} from './validator';
import { NavLink, } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import './mylogin.css';
import { encode } from "base-64";

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
        localStorage.setItem('login_status', '');
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
                console.log(this.state.validateResponse.valid)
            if(this.state.validateResponse.valid===true){
                alert("Login Successful");
                localStorage.setItem('db_email', formData.email);
                localStorage.setItem('reg_status', 'Logout');
                this.props.history.push('/');
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
        let usernameAuth = '123';
        let passwordAuth = '123';
        fetch('http://104.197.41.22:8080/validate/login', 
        {
            method: 'POST',
            body: JSON.stringify({
            userName: username,
            password: password,
        }),
        headers: 
        {
            'Authorization': 'Basic ' + encode(usernameAuth + ":" + passwordAuth),
            "Content-type": "application/json; charset=UTF-8"
        }
        }).then(response => 
        {
            if(response !== null)
                return response.json()
            else
                alert("Service unable to respond")
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
            localStorage.setItem('reg_status', 'Logout');
            this.props.history.push('/')
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
                                   
                                    <TextField class="fields" type="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange} />
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
                                <NavLink class="link" to="/Secure">On a untrusted device?</NavLink>
                                    </div>
                                <div>
                                    <NavLink class="link" to="/register">Don't have an account?</NavLink>
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
