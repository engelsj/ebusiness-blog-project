import React, { } from 'react';
import './login.css';
import { NavLink, } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import './mylogin.css';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { isEmail, isEmpty } from './validator';
import { encode } from "base-64";
let code_to_Verify = "";
let code = '';

class Verify extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            number: '',
            code: '',
            formData: {},
            errors: {},
            otpVerifyResponse: [],
            partialPasswordGenerateResponse: []

        };
        this.handleCode = this.handleCode.bind(this);
        this.handleC = this.handleC.bind(this);
    }
    

    handleC(event) {
        this.setState({ code: event.target.value });
        code = this.state.code;
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


    verifyOtp(number, c) {
        let usernameAuth = '123';
        let passwordAuth = '123';
        fetch('http://104.197.41.22:8080/otp/verify', {
            method: 'POST',
            body: JSON.stringify({
                phoneNumber: number,
                code: c,
            }),
            headers: {
                'Authorization': 'Basic ' + encode(usernameAuth + ":" + passwordAuth),
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            return response.json()
        }).then(json => {
            this.setState({
                otpVerifyResponse: json
            });
        });

    }

    generatePartialPassword(username) {
        let usernameAuth = '123';
        let passwordAuth = '123';
        fetch('http://104.197.41.22:8080/validate/generatePartialPassword', {
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
                partialPasswordGenerateResponse: json
            });
        });

    }

    validateLoginForm = (e) => 
    {
       
        let errors = {};
        const { formData } = this.state;
        if (isEmpty(formData.code)) 
        {
            errors.code = "Code Can't be Blank";
            this.generatePartialPassword(localStorage.getItem('userName'));
            return errors;
        } 
        else
        {
            this.verifyOtp(localStorage.getItem('phoneNumber'), formData.code);
            setTimeout(()=>
            {
                console.log(this.state.otpVerifyResponse.errorMessage)
                if(this.state.otpVerifyResponse.valid === 'true')
                {
                    setTimeout(()=>
                    {
                        alert("OTP has been verified")
                        this.generatePartialPassword(localStorage.getItem('userName'));
                        setTimeout(()=>
                        {
                            localStorage.setItem('index1', this.state.partialPasswordGenerateResponse.index1)
                            localStorage.setItem('index2', this.state.partialPasswordGenerateResponse.index2)
                            localStorage.setItem('index3', this.state.partialPasswordGenerateResponse.index3)
                            this.props.history.push('/Partial')
                        },3000);
                    
                    },3000);
                }
                else
                {
                    alert("Unable to verify OTP code")
                    return errors;
                }
            },2000);
    
        }
        console.log(errors.code)
        return errors
    }

    handleCode(e) {
       // this.verifyOtp(this.state.number, this.state.code);

        e.preventDefault();
        let errors = this.validateLoginForm();

        if (errors === true) {
            this.verifyOtp(this.state.number, this.state.code)

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
                <div>
                    <div  class="limiter">
                        <div class="container-login100">
                            <div class-="wrap-login100">
                                <div class="lo">
                                    <Avatar class="avatar2">
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    <div class="otp">
                                        OTP
                                </div>
                                </div>
                                <form class="lo" onSubmit={this.handleCode}>

                                    <div class="wrap-input100 validate-input "
                                        data-validate="username is required">

                                        <TextField class="fields"type="text" name="code" placeholder="Verification code" onChange={this.handleInputChange} />
                                        {errors.code &&
                                            <div class="errors">{errors.code}</div>
                                        }

                                    </div>





                                    <div class="container-login100-form-btn">
                                        <button class="login100-form-btn" >
                                            Login
                                </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div >
                </div>
                <NavLink to="/partial">click here to go to partial password</NavLink>

            </div>


           
        )
    }

}


export default Verify
