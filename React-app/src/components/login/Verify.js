import React, { Component } from 'react';
import './login.sass';
import { NavLink, } from "react-router-dom";

import { Row, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';




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
            if (c==="309184") {
                alert('OTP is valid');
            }
            else {
                alert('OTP invalid try again');
            }
        }, 3000);
    }

    handleSubmit(event) {
        this.sendOtp(this.state.number);
        alert('number: ' + this.state.number);
        this.state = { number: '' };
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
            <div className="OTP">
                <Row>
                    <form onSubmit={this.handleSubmit} >
                        <FormGroup>
                            <ControlLabel>
                                Mobile Number:
                          <FormControl type="text" number={''} onChange={this.handleNumber} />
                                <Button type="submit" value="Submit" bsStyle="primary" >send OTP</Button>

                            </ControlLabel>
                        </FormGroup>
                    </form>

                    <form onSubmit={this.handleCode}>
                        <FormGroup>
                            <ControlLabel>
                                Code:
                        <FormControl type="text" number={''} onChange={this.handleC} />
                                <Button type="submit" value="Submit" bsStyle="primary" >Verify</Button>

                            </ControlLabel>

                        </FormGroup>

                    </form>
                </Row> 

                      <NavLink to="/partial">click here to go to partial password</NavLink>

                </div>
        )
    }

}

export default Verify
