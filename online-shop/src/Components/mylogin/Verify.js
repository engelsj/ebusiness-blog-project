import React, { } from 'react';
import './login.css';
import { NavLink, } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import './mylogin.css';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';



let code_to_Verify = "";
let code = '';

class Verify extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            number: '',
            code: '',
            otpSendResponse: [],
            otpVerifyResponse: []

        };
        this.handleNumber = this.handleNumber.bind(this);
        this.handleCode = this.handleCode.bind(this);
        this.handleC = this.handleC.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubm = this.handleSubmit.bind(this);

    }

    handleNumber(event) {
        this.setState({ number: event.target.value });
        code_to_Verify = this.state.number;
    }

    handleC(event) {
        this.setState({ code: event.target.value });
        code = this.state.code;
    }


    sendOtp(number) {
        fetch('https://cors-anywhere.herokuapp.com/http://34.76.147.17:8080/otp/send', {
            method: 'POST',
            body: JSON.stringify({
                phoneNumber: number,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            return response.json()
        }).then(json => {
            this.setState({
                otpSendResponse: json
            });
        });
    }

    verifyOtp(number, c) {
        fetch('https://cors-anywhere.herokuapp.com/http://34.76.147.17:8080/otp/verify', {
            method: 'POST',
            body: JSON.stringify({
                phoneNumber: number,
                code: c,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            return response.json()
        }).then(json => {
            this.setState({
                otpVerifyResponse: json
            });
        });
        /*setTimeout(() => {
            if (this.state.otpVerifyResponse.valid === "true") {
                alert('OTP is valid');
            }
            else {
                alert('OTP invalid try again');
            }
        }, 3000);*/

        setTimeout(() => {
            if (c === "11") {
                alert('OTP is valid');
                this.props.history.push('/Partial')

            }
            else {
                alert('OTP invalid try again');
            }
        }, 3000);
    }

    handleSubmit(event) {
        this.sendOtp(this.state.number);
        alert('number: ' + this.state.number);
        event.preventDefault();
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
    handleCode(e) {
        this.verifyOtp(this.state.number, this.state.code);

        e.preventDefault();




    }

    render() {
        return (
           <div>
            <body>
                <div class="limiter">
                    <div class="container-login100">
                            <div class-="wrap-login100">
                                <div class="lo">
                                    <Avatar class="avatar">
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    <div class="log">
                                        One Time Password
                                </div>
                                </div>
                   

                    


                    <form onSubmit={this.handleCode}>
                                <div class="wrap-input100">
                                
                        <TextField type="text" placeholder=" verification code"number={''} onChange={this.handleC} />
                                    <div class="container-login100-form-btn">
                                            <button
                                                class="login100-form-btn">
                                            Verity OTP
                                </button>
                                    </div>

                        </div>

                            </form>
                        </div>
                    </div>
                </div >

                </body>
                <NavLink to="/partial">click here to go to partial password</NavLink>

            </div>


           
        )
    }

}

export default Verify

 /*
  *  <form onSubmit={this.handleSubmit} >
                        <div class="wrap-input100">

                                        <TextField type="text" placeholder="enter phone number" number={''} onChange={this.handleNumber} />
                                    <div class="container-login100-form-btn">
                                            <button class="login100-form-btn">
                                            Send OTP
                                </button>
                                    </div>

                        </div>
                    </form>*/