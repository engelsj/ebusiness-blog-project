import React from 'react';
import './login.css';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";


var code_to_Verify = "no number entered yet";

var x, y, z, a, b, c;
var password = '351235';
var secret = '';
var array = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];
let count = 0;


class Verify extends React.Component {

    // Using a class based component here because we're accessing DOM refs
    constructor(props) {
        super(props);
        this.state = {
            number: '',
        };
        this.handleNumber = this.handleNumber.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNumber(event) {
        this.setState({ number: event.target.value });
    }

    handleSubmit(event) {
        count = 0;
        code_to_Verify = this.state.number;
        //  this.setState({ number: '' });
        this.check();
        event.preventDefault();
        secret = '';
    }

    randomize(e) {//function to assign values to random
        a = this.getRandomInt();
        b = this.getRandomInt();
        c = this.getRandomInt();
        while (a === b) {
            b = this.getRandomInt();
        }
        while (c === b || c === a) {
            c = this.getRandomInt();
        }
        this.sort(a, b, c);

        for (let i = 0; i < password.length; i++) {
            if (i === a || i === b || i === c) {
                secret += '*';
            }
            else {
                secret += password.charAt(i);
            }
        }
    }
    sort(n1, n2, n3) {
        var min;
        if (n1 < n2 && n1 < n3) {
            min = n1;
        }
        else if (n2 < n1 && n2 < c) {
            min = n2;
        }
        else if (n3 < n1 && n3 < n2) {
            min = n3;
        }

        var max;
        if (n1 > n2 && n1 > n3) {
            max = n1;
        }
        else if (n2 > n1 && n2 > n3) {
            max = n2;
        }
        else if (n3 > a && n3 > n2) {
            max = n3;
        }

        var mid;
        if ((n1 > n2 && n1 < n3) || (n1 < n2 && n1 > n3)) {
            mid = n1;
        }
        if ((n2 > n1 && n2 < n3) || (n2 < n1 && n2 > n3)) {
            mid = n2;
        }
        if ((n3 > n1 && n3 < n2) || (n3 < n1 && n3 > n2)) {
            mid = n3;
        }
        a = min;
        b = mid;
        c = max;
    }
    getRandomInt() {
        var min = Math.ceil(0);
        var max = Math.floor(password.length - 1);
        var x = Math.floor(Math.random() * (max - min + 1)) + min;
        return x;
    }

    check(event) {
        var copy_password = "";
        for (let i = 0; i < password.length; i++) {
            if (secret.charAt(i) === '*') {
                if (count === 0) {
                    copy_password += x;
                }
                else if (count === 1) {
                    copy_password += y;
                }
                else if (count === 2) {
                    copy_password += z;
                }
                count++;
            }
            else {
                copy_password += password.charAt(i);
            }
        }

        if (copy_password === password) {
            alert('Password Success');
            //window.location.reload();
            //window.location.href = '/Secure'
            //  return <Redirect to="/Secure" />;
            this.props.history.push('/')
        }
        else {
            alert('Password Fail');
            //this.props.history.pop();

            window.location.reload();
        }
    }

    handleX(event) {
        x = event.target.value;
        // event.target.value = "*";


    }
    handleY(event) {
        y = event.target.value;
        // event.target.value = "*";

    }
    handleZ(event) {
        z = event.target.value;
        // event.target.value = "*";
    }


    render() {
        this.randomize();
        console.log(password);
        return (
            < body >
                <div class="limiter">
                    <div class="container-login100">
                        <div class-="wrap-login100">
                            <form className="login100-form validate-form" onSubmit={this.handleSubmit}>
                                <div class="wrap-input100">
                                    {array[a]} number:
         <p> <TextField  type="text" number={''} placeholder="enter the number" onChange={this.handleX} /></p>
                                </div>
                                <div class="wrap-input100" >
                                    {array[b]} number:
         <p> <TextField  type="text" number={''} placeholder="enter the number" onChange={this.handleY} /></p>
                                </div>
                                <div class="wrap-input100" >
                                    {array[c]} number
         <p> <TextField  type="text" number={''} placeholder="enter the number" onChange={this.handleZ} /></p>

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

