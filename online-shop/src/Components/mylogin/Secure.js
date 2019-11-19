import React, { Component } from "react";
import { isEmail, isEmpty } from './validator';
//import './login.css';
import './mylogin.css';
import { NavLink, } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { encode } from "base-64";

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: null,
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            userResponse: [],
            otpResponse: [],
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
            return errors;
        } 
        else if (!isEmail(formData.email)){
            errors.email = "Please enter a valid email";
            return errors;
        }
        else
        {
            this.validateUser(formData.email);
            setTimeout(()=>{
            if(this.state.userResponse.message === 'Not Found'){
                alert("Failed");
                errors.password = "incorrect username";
                return false
            }
            else{
                this.sendOTP(this.state.userResponse.message);
                setTimeout(()=>{
                alert("OTP Sent");
                localStorage.setItem('userName', formData.email)
                localStorage.setItem('phoneNumber',this.state.userResponse.message)
                this.props.history.push('/Verify');

                },3000);
            }
            },1000);
        }
        return errors;
    }

    validateUser(username) {
        let headers = new Headers();
        let usernameAuth = '123';
        let passwordAuth = '123';
        fetch('http://localhost:8080/validate/user', {
        method: 'POST',
        body: JSON.stringify({
        userName: username,
      }),
      headers: {
        'Authorization': 'Basic ' + encode(usernameAuth + ":" + passwordAuth),
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => {
        return response.json()
      }).then(json => {
        this.setState({
          userResponse:json
        });
      });
    }

    sendOTP(phoneNumber) {
        let headers = new Headers();
        let usernameAuth = '123';
        let passwordAuth = '123';
        fetch('http://localhost:8080/otp/send', {
        method: 'POST',
        body: JSON.stringify({
        phoneNumber: phoneNumber,
      }),
      headers: {
        'Authorization': 'Basic ' + encode(usernameAuth + ":" + passwordAuth),
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => {
        return response.json()
      }).then(json => {
        this.setState({
          otpResponse:json
        });
      });
    }

    check() {
        var test = "yes";
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

    onClick() {
        // console.log(product.email);
        var m = localStorage.getItem('db_email');
        const url = 'http://localhost:4000/products/find?email=' + m;
        fetch(url)
            .then(res => res.json())
            .then((response) => {
                localStorage.setItem('db_password', response.data[0].password);
                localStorage.setItem('db_number', response.data[0].phone_number);
                console.log(localStorage.getItem('db_email'));
            })
    }
    login = (e) => {
        const { formData } = this.state;
        localStorage.setItem('db_email', formData.email);
        this.onClick();
        e.preventDefault();
        let errors = this.validateLoginForm();
        if (errors === true) {
            alert("You are successfully signed in...");
            this.props.history.push('/Verify')
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
            <body>
                <div class="limiter">
                    <div class="container-login100">
                        <div class-="wrap-login100">
                            <div class="lo">
                                <Avatar class="avatar">
                                    <LockOutlinedIcon />
                                </Avatar>
                                <div class="log">
                                    Secure Login
                                </div>
                            </div>
                            <form class="login100-form validate-form" onSubmit={this.login}>
                                
                                <div class="wrap-input100 validate-input "
                                    data-validate="username is required">

                                    <TextField class="fields"type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                                    {errors.email &&
                                        <div class="errors">{errors.email}</div>
                                    }
                                    
                                </div>



                                

                                <div class="container-login100-form-btn">
                                    <button class="login100-form-btn" >
                                        Login
                                </button>
                                </div>
                                <a 
                                    href="https://www.getsafeonline.org/protecting-yourself/using-public-computers/"
                                   
                                >
                                    <div class="link">Click here for more information on secure authentication</div>
                                </a>
                            </form>
                        </div>
                    </div>
                </div >
            </body>
        )
    }
}

export default Login;

/*
               <Row>
                    <div class="limiter">
                        <div class="container">
                            <form onSubmit={this.login} >
                                <span class="title">Login</span>
                                <div class="wrap-input100 validadte-input">
                                    <input class="input100" type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                                    {errors.email &&
                                        <HelpBlock>{errors.email}</HelpBlock>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="btn">
                        <button class="form-btn">
                            Login
                                </button>
                    </div>
                </Row>
 */



/*database stuff
 * import React, { Component } from "react";
import { FormText } from 'react-bootstrap';
import { isEmail, isEmpty } from './validator';
//import './login.css';
import './mylogin.css';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
let p;
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

    //number(st) {
    //    //console.log("l");
    //   // const { formData } = this.state;
    //    console.log("ccol"+st);
    //    const url = 'http://localhost:4000/products/find?email=' +st;

    //    fetch(url)
    //        .then(res => res.json())
    //        .then((response) => {p=(response.data[0].password) })

    //        .then(this.getProducts)
    //        .catch(err => console.error(err))
    //    console.log("number"+ p  );
    //}
    login = (e) => {

        e.preventDefault();
        let errors = this.validateLoginForm();

        if (errors === true) {
            alert("You are successfully signed in...");
          //  this.props.history.push('/Verify')


        } else {

            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
    }

    addProduct =_=> {
        const { formData } = this.state;
       // console.log("st:"+st);
        const url = 'http://localhost:4000/products/find?email=amypi@eircom.net';
        const url2 = 'http://localhost:4000/products/find?email=' + formData.email;
        console.log(url2);
        console.log(url);
        fetch(url2)
            .then(res => res.json())
            .then((response) => { p = (response.data[0].password) })

            .then(this.getProducts)
            .catch(err => console.error(err))
        console.log("add"+p);
    }
    render() {

        const { errors, formData } = this.state;

        console.log(formData.email);
        let o = formData.email;
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
                                    Secure Login
                                </div>
                            </div>
                            <form className="lo" onSubmit={this.addProduct(formData.email)}>

                                <div class="wrap-input100 validate-input "
                                    data-validate="username is required">

                                    <TextField type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                                    {errors.email &&
                                        <div class="errors">{errors.email}</div>
                                    }

                                </div>





                                <div class="container-login100-form-btn">
                                    <button class="login100-form-btn" >
                                        Login
                                </button>
                                </div>
                            </form>
                            <button onClick={this.addProduct(formData.email)}>Add product</button>
                            {p}
                        </div>
                    </div>
                </div >
            </body>
        )
    }
}

export default Login;

/*
               <Row>
                    <div class="limiter">
                        <div class="container">
                            <form onSubmit={this.login} >
                                <span class="title">Login</span>
                                <div class="wrap-input100 validadte-input">
                                    <input class="input100" type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                                    {errors.email &&
                                        <HelpBlock>{errors.email}</HelpBlock>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="btn">
                        <button class="form-btn">
                            Login
                                </button>
                    </div>
                </Row>
 */
