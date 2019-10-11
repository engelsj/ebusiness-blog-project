import React from 'react';

var code_to_Verify = "no number entered yet";

var number1 = "1";
var x, y, z;








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

        console.log({ x });
    }

    handleSubmit(event) {

        code_to_Verify = this.state.number;
        this.setState({ number: '' });
        alert('code: ' + code_to_Verify);
        this.check();
        event.preventDefault();

    }


    check(event) {
        var a = x + y + z;
        if (a === "123") {
            console.log("yippeee");
        }
        else {
            console.log(a);
        }
    }



    handleX(event) {
        x = event.target.value;
        console.log({ x });
    }
    handleY(event) {
        y = event.target.value;
    }
    handleZ(event) {
        z = event.target.value;
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
                        {number1} number:
          <input type="text" number={''} onChange={this.handleX} />
                    </label>
                    <label>
                        {number1} number
          <input type="text" number={''} onChange={this.handleY} />
                    </label>
                    <label>
                        {number1} number
          <input type="text" number={''} onChange={this.handleZ} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>










            </div>
        )
    }

}

export default Verify