import React, { Component } from 'react';
import './mylogin.css';


class App extends React.Component {

    
 


    render() {
  
        return (
            <body className="App" >



                <div>
                    <h1 style={{ color:'green'}}>
                        Welcome <strong>{localStorage.getItem('db_email')}</strong>
                    </h1>

                </div>
           </body>
        );
    }
} export default App;
