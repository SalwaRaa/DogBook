import React, { Component } from 'react';
import * as DogService from '../services/ManageDogService';
//material-UI framewwork
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

export default class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
    this.dog = {
      name: "",
      nick: "",
      age: "",
      bio: "",
      present: false,
      friends: []
    };
    this.state = {
      allDogs: DogService.getDogs(),
      selectedDogs: []
      }
  }

  createDog = (e) => {
    this.dog.friends = this.createFriendsList();
    DogService.createDog(this.dog);
  };

  createFriendsList = () => {
    let list = []
    this.state.selectedDogs.forEach(dog => {
      list.push({'id':dog.id, 'name':dog.name})
    })
    return list;
  }

  onInputChange = (e) => {
    e.preventDefault();
    this.dog[e.target.name] = e.target.value;
  }

  handleCheck = (dog) => (e) => {
    this.setState(state => ({
    selectedDogs: state.selectedDogs.includes(dog)
        ? state.selectedDogs.filter(d => d !== dog)
        : [...state.selectedDogs, dog]
    }));
  }

  render() {
    return (
      <div className="center-container-grid">

        <div>
          <TextField id="input-name" name="name" label="Name" variant="outlined" onChange={this.onInputChange} />
          <p />
          <TextField id="input-nick" name="nick" label="Nick" variant="outlined" onChange={this.onInputChange} />
          <p />
          <TextField id="input-number" type="number" name="age" label="Age" variant="outlined" onChange={this.onInputChange} />
          <p />
          <TextField id="input-bio" name="bio" multiline rows={4} label="Bio" variant="outlined" onChange={this.onInputChange} />      
        </div>

        <p>SELECT FRIENDS</p>
        {Object.keys(this.state.allDogs).length !== 0 ?
        <Paper variant="outlined" className="friends-list">
        {Object.values(this.state.allDogs).map((dog) => 
          <FormControlLabel key={dog.id} style={{padding: 0.5 + 'rem'}}
              control={<Checkbox icon={<FavoriteBorder />} 
              checkedIcon={<Favorite />} 
              name={dog.name} />}
              onChange={this.handleCheck(dog)}
              checked={this.state.selectedDogs.includes(dog)}
              label={dog.name}
              /> 
          )}
        </Paper>
        :
        <span>You need to add first some dogs to the system</span>
        }

        <div style={{marginTop: 1 + 'em'}}>
          <Button variant="contained" color="primary" onClick={this.createDog} href="/">CREATE</Button>
        </div>  
      </div>
    );
  }
}