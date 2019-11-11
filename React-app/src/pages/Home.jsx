

import React, { Component } from "react";

import { Button, FormGroup } from 'react-bootstrap';
import '../components/login/login.sass';



import {

    NavLink,

} from "react-router-dom";

class Home extends Component {







    render() {


        return (

            <div class="Home">   
                <h1>
                    <FormGroup className="text-center">
                        <NavLink exact to="/Secure"><Button type="submit" bsStyle="primary" ><h1>Untrusted Login Page</h1></Button></NavLink>
                    </FormGroup>
                    <FormGroup className="text-center">
                        <NavLink exact to="/Login"> <Button type="submit" bsStyle="primary" ><h1>Trusted Login Page</h1></Button></NavLink>
                    </FormGroup>
                </h1>
            </div>
        )
    }
}

export default Home;
