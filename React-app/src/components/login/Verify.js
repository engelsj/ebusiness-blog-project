import React, { Component } from 'react';
import './login.sass';

import { Row, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';

var code_to_Verify = "no number entered yet";
var code = '';


class Verify extends React.Component {

    // Using a class based component here because we're accessing DOM refs
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
        console.log(c, number);
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
    handleCode(x) {
        this.verifyOtp(this.state.number, this.state.code);
        alert('code: ' + this.state.code);
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



            </div>
        )
    }

}

export default Verify