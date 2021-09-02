import React, { Component } from 'react';
import * as DogService from '../services/ManageDogService';
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
    this.state = {
      allDogs: DogService.getDogs(),
      updatedFriendsList: DogService.getDogById(this.props.match.params.id).friends,
      friendsToBeRemoved: [],
    }
    this.dog = DogService.getDogById(this.props.match.params.id)
  }

  updateDog = (e) => {
    this.dog.friends = this.state.updatedFriendsList;
    DogService.updateDogById(this.dog.id, this.dog);
    DogService.removeFriendsById(this.state.friendsToBeRemoved);
  };

  onInputChange = (event) => {
    this.dog[event.target.name] = event.target.value;
  }

  handleCheck = (dog) => (e) => {
    this.setState(state => ({
      updatedFriendsList: state.updatedFriendsList.some(d => d.id === dog.id)
        ? state.updatedFriendsList.filter(d => d.id !== dog.id)
        : [...state.updatedFriendsList, { 'id': dog.id, 'name': dog.name }],
      friendsToBeRemoved: state.updatedFriendsList.some(d => d.id === dog.id) && this.dog.friends.some(d => d.id === dog.id)
        ? [...state.friendsToBeRemoved, { 'id': dog.id, 'name': dog.name }]
        : state.friendsToBeRemoved.filter(d => d.id !== dog.id),
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
        {Object.keys(this.state.allDogs).length !== 0
          ?
          <Paper variant="outlined" className="friends-list">
            {Object.values(this.state.allDogs).map((dog) => {
              return dog.id !== this.dog.id
                ? <FormControlLabel key={dog.id} style={{ padding: 0.5 + 'rem' }}
                  control={<Checkbox icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    name={dog.name} />}
                  onChange={this.handleCheck(dog)}
                  checked={this.state.updatedFriendsList.some(d => d.id === dog.id)}
                  label={dog.name}
                />
                : <span key={dog.id} />
            })}
          </Paper>
          :
          <span>You need to add first some dogs to the system</span>
        }

        <div className="edit-buttons">
          <Button variant="contained" color="primary"
            onClick={this.updateDog}
            href={'/profile/' + this.dog.id}>UPDATE
          </Button>
          <Button variant="contained"
            href={'/profile/' + this.dog.id}>CANCEL
          </Button>
        </div>
      </div>

    );
  }
}