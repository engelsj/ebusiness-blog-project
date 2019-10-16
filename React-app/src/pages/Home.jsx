

import React, { Component } from "react";

import { Button } from 'react-bootstrap';



import {

    NavLink,

} from "react-router-dom";

class Home extends Component {







    render() {


        return (
        
            <div class="text-center">
                <h1>
                    <NavLink exact to="/Secure"><Button type="submit" bsStyle="primary" ><h1>secure</h1></Button></NavLink>

                    <NavLink exact to="/Login"> <Button type="submit" bsStyle="primary" ><h1>unsecure</h1></Button></NavLink>
                </h1>
            </div>
        )
    }
}

export default Home;
