import React, { Component } from 'react';
//import Login from '../pages/Login.js';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import { Row, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';

var code_to_Verify = "no number entered yet";
var code='';

const Verification = () => {
    // This is a dumb "stateless" component
    return (

        <div>
            <form onSubmit={this.handleSubmit} >

                <label>
                    Code:
          <input type="text" number={''} onChange={this.handleNumber} />
                </label>
                <input type="submit" value="enter" />
            </form>

        </div>

    )
}

class Verify extends React.Component {

    // Using a class based component here because we're accessing DOM refs
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            code:'',
            otpSendResponse: [],
            otpVerifyResponse: []

        };
        this.handleNumber = this.handleNumber.bind(this);
        this.handleCode = this.handleNumber.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubm = this.handleSubmit.bind(this);

    }

    handleNumber(event) {
        this.setState({ number: event.target.value });
        code_to_Verify = this.state.number;
    }

    handleCode(event) {

        this.setState({ code: event.target.value });
        code = this.state.code;
        console.log("yeet");
    }
    sendOtp(number){
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
          otpSendResponse:json
        });
      });
    }

    verifyOtp(number,code){
        console.log(code);
        fetch('https://cors-anywhere.herokuapp.com/http://34.76.147.17:8080/otp/verify', {
      method: 'POST',
      body: JSON.stringify({
        phoneNumber: number,
        code: code,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => {
        return response.json()
      }).then(json => {
        this.setState({
        otpVerifyResponse:json
        });
      });
    }

    handleSubmit(event) {
console.log("a");
        
        console.log(code_to_Verify, code);
        this.state = { number: '' };
        this.sendOtp(code_to_Verify);
        this.verifyOtp(code_to_Verify,code);
        alert('code: ' + code_to_Verify);
        event.preventDefault();

    }

    
    handleSubm(event) {
        console.log("b");

        code = this.state.code;
        this.state = { code: '999' };
        this.verifyOtp(code,code_to_Verify);
        alert('code: ' + code);
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



    render() {
        return (
            <div>

                <form onSubmit={this.handleSubmit} >

                    <label>
                        Mobile Number:
                          <input type="text" number={''} onChange={this.handleNumber} />
                    </label>
                                  <Button type="submit" value="Submit" >submit</Button>
                </form>

                <form onSubmit={this.handleSubmit} >

<label>
    Code:
      <input type="text" code={''} onChange={this.handleCode} />
</label>
              <Button type="submit" value="Submit" >submit</Button>
</form>

                <h1>Please enter verification code</h1>
                {
                   // <Verification
                     //   user={this.state.user}
                      //  onSignOut={this.signOut.bind(this)}
                   // />
                }
            </div>
        )
    }

}

export default Verify