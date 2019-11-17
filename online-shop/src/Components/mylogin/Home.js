

import React, { Component } from "react";

import './Home.css';



import {

    NavLink,

} from "react-router-dom";

class Home extends Component {

    toSecure() {
        this.props.history.push('/Secure');
    }
    toTrusted() {
        this.props.history.push('/Login');
    }
    render() {


        return (

            <body>
                <div class="limiter">
                    <div class="container-login100">
                        <div class-="wrap-login100">
                            <form className="login100-form validate-form" >

                                <div class="container-login100-form-btn">
                                    <NavLink exact to="/Secure">
                                    <button class="login100-form-btn" >
                                        Untrusted Login Page
                                </button>
                                        </NavLink>
                                </div>
                            </form>
                            <form className="login100-form validate-form">

                                <div class="container-login100-form-btn">
                                    <NavLink exact to="/Login">
                                    <button class="login100-form-btn" >
                                        Trusted Login Page
                                </button>
                                        </NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </body>
        )
    }
}

export default Home;
