import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: '',
      users2: '',

    }
    this.getUsers = this.getUsers.bind(this);
    this.delete_users = this.delete_users.bind(this);
  }

  
  componentDidMount() {
    this.getUsers();
    this.delete_users();
  }

  getUsers = () => {
      fetch('http://10.90.90.71:5000/getUsers', {method: 'POST'})    
       .then(function(responce){
           return responce.json();
       })
       .then(function(myJson){
          var res = JSON.stringify(myJson);
          var result = JSON.parse(res);
          this.setState({users:result.data});

       }.bind(this))

  }
  delete_users(mobile) {
    var data = {mobile:mobile};
    
      fetch('http://10.90.90.71:5000/deleteUsers', {method: 'POST',headers: {'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'},dataType:'json', body:JSON.stringify(data)})
      .then(function(responce) {
           return responce.json();
      })
      .then(function(myJson) {
        var res = JSON.stringify(myJson);
        var result2 = JSON.parse(res);
        
         })

      
}
  render() {
    
    return (
      <div>
        <div>
         {this.state.users ? this.state.users.map((item,index)=>
           <Users key = {index} users = {item}/> 
         ):'no users found'}
        </div>
      </div>
    );
  }
}
class Users extends Component {
  render() {
    return (
      <div>
         <div class="users_list">
           <div class="data">Name : {this.props.users.name}<br/> Email :{this.props.users.email}<br/> Mobile number:{this.props.users.mobile}</div>
           <div class="center"><button class="btn1">View</button>&nbsp;&nbsp;<button class="btn2" onClick={this.delete_users}>Delete</button></div>
         </div>
      </div>
    )
  }

}

export default App;