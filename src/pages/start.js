import React, { Component } from 'react';
import * as DogService from '../services/ManageDogService';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: DogService.getDogs(),
    }
  }

  deleteDog = param => e => {
    e.preventDefault();
    let listOfIds = Object.keys(this.state.dogs).map((key) => {return {id:parseInt(key)}});
    DogService.removeFriendsById(listOfIds,param)
    DogService.deleteDogById(param);
    this.setState({dogs: DogService.getDogs()})
  };

  render() {
    return (
      <div>
        <h1>Dogbok</h1>

        <h2>Dogs</h2>

        <Divider />

        <List component="nav" aria-label="secondary mailbox folders">
          {Object.keys(this.state.dogs).map((key) => 
            <ListItemLink key={key} href={'/profile/'+ this.state.dogs[key].id}>
              <span className={`status-circle ${this.state.dogs[key].present ? 'present' : 'absent'}`}></span> 
              <ListItemText primary={this.state.dogs[key].name} /> 
              <IconButton aria-label="delete" onClick={this.deleteDog(this.state.dogs[key].id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </ListItemLink>
          )}      
        </List>
        
        <p>
        <Button variant="outlined" color="primary" href="/create">
          CREATE DOG
        </Button>
        </p>

      </div>
    );
  }
}