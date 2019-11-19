import React from 'react';
import './login.css';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from "@material-ui/core/TextField";
import { encode } from "base-64";

var code_to_Verify = "no number entered yet";

var x, y, z;
class Verify extends React.Component {

    // Using a class based component here because we're accessing DOM refs
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            verifyPartialPasswordResponse: []
        };
        this.verifyPartialPassword = this.verifyPartialPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    

    handleSubmit(event) {
       var fullIndexes = "";
       var fullPartial = "";
       fullIndexes = fullIndexes.concat(localStorage.getItem('index1') - 1, localStorage.getItem('index2') - 1, localStorage.getItem('index3') - 1);
       fullPartial = fullPartial.concat(x,y,z);
       this.verifyPartialPassword(fullPartial,fullIndexes);
       setTimeout(()=>{
           if (this.state.verifyPartialPasswordResponse.valid === true) {

               localStorage.setItem('login_status', 'Logout');
               alert("Login")
               this.props.history.push('/db')

           }
            else
                alert("Not login")
       },3000);
       event.preventDefault();
    }

    verifyPartialPassword(partialPassword, indexes){
        let usernameAuth = '123';
        let passwordAuth = '123';
       fetch('http://localhost:8080/validate/verifyPartialPassword', {
            method: 'POST',
            body: JSON.stringify({
                userName: localStorage.getItem('userName'),
                partialPassword: partialPassword,
                indexes: indexes
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': 'Basic ' + encode(usernameAuth + ":" + passwordAuth)
            }
        }).then(response => {
            return response.json()
        }).then(json => {
            this.setState({
                verifyPartialPasswordResponse: json
            });
        });
    }

    handleX(event) {
        x = event.target.value;

    }

    handleY(event) {
        y = event.target.value;

    }

    handleZ(event) {
        z = event.target.value;
    }


    render() {
        
        return (
            < body >
                <div class="limiter">
                    <div class="container-login100">
                        <div class-="wrap-login100">
                            <div class="lo">
                                <Avatar class="avatar">
                                    <LockOutlinedIcon />
                                </Avatar>
                                <div class="log">
                                    Please enter the specified indexes of your password
                                </div>
                                <div class="sub_heading">For security reasons we would like you to only enter a partial password,
                                    this is to prevent keystroke loggers from obtaining your full password</div>
                            </div>
                            <form className="login100-form validate-form" onSubmit={this.handleSubmit}>
                                <div class="wrap-input100"ontrolId="index1" >
                                    Enter Index {localStorage.getItem('index1')} of Your Password:<p> <TextField class="fields" type="password" cnumber={''} placeholder="enter the number" onChange={this.handleX} /></p>
                                </div>
                                <div class="wrap-input100"controlId="index2" >
                                    Enter Index {localStorage.getItem('index2')} of Your Password:<p> <TextField class="fields" type="password"  number={''} placeholder="enter the number" onChange={this.handleY} /></p>
                                </div>
                                <div class="wrap-input100"controlId="index3"  >
                                    Enter Index {localStorage.getItem('index3')} of Your Password:<p> <TextField class="fields" type="password" number={''} placeholder="enter the number" onChange={this.handleZ} /></p>
                                </div>
                                <div class="container-login100-form-btn">
                                    <div class="container-login100-form-btn">
                                        <button class="login100-form-btn" >
                                            Login
                                </button>
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </ body>
        )

    }

}

export default Verify

