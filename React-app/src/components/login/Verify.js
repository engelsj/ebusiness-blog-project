import React from 'react';
import { Button } from 'react-bootstrap';
import {

    NavLink

} from "react-router-dom";
var code_to_Verify = "no number entered yet";




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

        };
        this.handleNumber = this.handleNumber.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleNumber(event) {
        this.setState({ number: event.target.value });
    }

    handleSubmit(event) {

        code_to_Verify = this.state.number;
        this.setState({ number: '' });
        alert('code: ' + code_to_Verify);
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
                    <NavLink to="/Partial">
                        <Button type="submit" bsStyle="primary" >submit
                        </Button>
                    </NavLink>
                </form>


                <h1>Please enter verification code</h1>
                {



                    <Verification
                        user={this.state.user}
                        onSignOut={this.signOut.bind(this)}
                    />


                }







            </div>
        )
    }

}

export default Verify