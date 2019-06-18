import React, { Component } from 'react';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(res => this.setState({ smurfs: res.data }))
      .catch(err => console.log(err));
  }

  addSmurf = (e, smurf) => {
    let id = this.state.smurfs.length;
    axios
      .post('http://localhost:3333/smurfs', {...smurf, id: id})
      .then(res => this.setState({ smurfs: res.data }))
      .catch(err => console.log(err));
  }

  deleteSmurf = (e, smurf) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3333/smurfs/${smurf.id}`, smurf)
      .then(res => this.setState({ smurfs: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <div className='navbar-wrapper'>
          <div className='navbar'>
            <NavLink to='/' className='navbar-item'>Home</NavLink>
            <NavLink to='/smurf-form' className='navbar-item'>Smurf Form</NavLink>
          </div>
        </div>

        {/* Routes */}
        <Route path='/' render={(props) => (
          <Smurfs {...props} smurfs={this.state.smurfs} deleteSmurf={this.deleteSmurf} /> 
        )} exact />
        <Route path='/smurf-form' render={(props) => (
          <SmurfForm {...props} addSmurf={this.addSmurf} />
        )} />
      </div>
    );
  }
}

export default App;
