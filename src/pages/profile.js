import React, { Component } from 'react';
import * as DogService from '../services/ManageDogService';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ArrowRight from '@material-ui/icons/ArrowRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';




export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dog: DogService.getDogById(this.props.match.params.id),
      imgUrl: " "
    }
  }

  setPresent = (e) => {
    let dog = this.state.dog;
    dog.present = !dog.present;
    this.setState(dog);
    DogService.updateDogById(dog.id,dog);
  };

  componentDidMount() {
    axios.get(`https://dog.ceo/api/breeds/image/random`)
      .then(res => {
        const imgUrl = res.data.message;
        this.setState({ imgUrl });
      })
  }

  render() {
    return (
      
      <div className="center-container">

        {/* IMAGE with BIO */}
      <Card style={{width: '50%'}} variant="outlined">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={this.state.imgUrl} />
        }
        action={
          <Button variant="outlined" size="small" color="primary" endIcon={<EditIcon />} href={'/edit/'+this.state.dog.id}>EDIT</Button>
        }
        title={'@'+this.state.dog.nick}
        subheader={this.state.dog.age + ' /dog-years'}
      />

      <CardActionArea>
        <CardMedia style={{height: 0, paddingTop: '50%'}} 
          wide="true" 
          image={this.state.imgUrl} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {this.state.dog.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {this.state.dog.bio}
          </Typography>
          <p />
          <Divider />
          <Typography variant="body2" color="textSecondary" component="p">
          <br />
          FRIENDS
          </Typography>
          <List component="nav" aria-label="secondary mailbox folders">
           {Object.values(this.state.dog.friends).map((value) => 
            <ListItem>
              <ListItemIcon>
                <ArrowRight />
              </ListItemIcon>
              <ListItemText primary={value.name} /> 
            </ListItem>
           )}      
          </List>
        </CardContent>
      </CardActionArea>
      <CardActions className="card-bottom-navigation">
        <div>
        <Switch checked={this.state.dog.present} color="primary" name="present" onChange={this.setPresent} /> PRESENT
        </div>
        <div>
        <Button variant="outlined" size="small" color="primary" endIcon={<HomeIcon />} href={'/'}>HOME</Button>
        </div>
      </CardActions>    
      </Card>

    

      </div>
    );
  }
}