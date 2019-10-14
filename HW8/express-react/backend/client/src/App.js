import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

class App extends Component{
state={users:[]};
componentDidMount(){
  this.getUsers();
}

getUsers = _ => {
  //fetch('http://localhost:3001').then(response => console.log(response))
  //.then(({response}) => this.setState({users: 'response.users'}))
  //.catch(error => console.log(error));
  axios.get('/users')
  .then((data) => {
    console.log(data.data.users);
    this.setState({users: data.data.users});
  })
  }
//showUsers = user => {user.username};
showUsers = user => <div key = {user.id}>{user.username}</div>
  render (){
    console.log();

    const{users} = this.state;
    return (
      <div>
        {users.map(this.showUsers)}
      </div>
    );
  }
}

export default App;
