
import React, { Component } from "react";

import { Button } from 'react-bootstrap';



import {

    NavLink,

} from "react-router-dom";

class Home extends Component {







    render() {


        return (
            <div >
                <NavLink exact to="/Secure"> <Button type="submit" bsStyle="primary" >secure</Button></NavLink>
                <NavLink exact to="/Login"> <Button type="submit" bsStyle="primary" >unsecure</Button></NavLink>

            </div>
        )
    }
}

export default Home;





