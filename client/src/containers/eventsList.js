import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {fetchAllEvents, createEvent} from '../actions/events'
import {Link} from 'react-router-dom'
import { EventForm } from './eventForm';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import {getUsers} from '../actions/users'
import {userId} from '../jwt'

class EventList extends PureComponent {

  state = {
      edit: false,
      index:  0
     }

  toggleEdit = () => {
      this.setState({
          edit: !this.state.edit,
      })
  }

  componentDidMount() {
      this.props.fetchAllEvents()
      this.props.getUsers()
      this.emptyArray = []
  }

  createEvent = (event) => {
      this.props.createEvent(event)
  }

  emptyArray = []

  componentDidUpdate(){
    this.emptyArray = []
  }

  paginationStarter = events => {
    if (events.length > 4){
      this.emptyArray.push(events.slice(0, 4))
      this.paginationStarter(events.slice(4))
    } else {
      this.emptyArray.push(events)
    }
  }

  foreward = () => {
    this.setState({
      index: this.state.index +1
    })
  }

  backward = () => {
    this.setState({
      index: this.state.index -1
   })
  }

  filterEvents = events => {
	 return events.filter(event => {
      const endDate = new Date(event.startDate)
      console.log(endDate, "this is enddate")
      const now = new Date()
      console.log(now, "this is now")

      if(now < endDate) return event
      console.log(event, "final event")
	  })
  }

  render() {
    this.paginationStarter(this.filterEvents(this.props.events))
    return (
      <div>
             <AppBar position="fixed">
        <Toolbar>
          <Typography variant="title" color="inherit">
            All events
          </Typography>
          <div style={{width: "83%"}}></div>
          {!this.props.currentUser &&
          <Typography variant="title" color="inherit">
          <Link to={'/login'} style={{color: "white", textDecoration: "none"}}>Login</Link>
          </Typography>
          }
         <div style={{width: "3%"}}></div>
          {!this.props.currentUser &&
          <Typography variant="title" color="inherit">
          <Link to={'/signup'} style={{color: "white", textDecoration: "none"}}>Sign Up</Link>
          </Typography>      
          }
           {this.props.currentUser &&
          <Typography variant="title" color="inherit">
          <Link to={'/logout'} style={{color: "white", textDecoration: "none"}}>logout</Link>
          </Typography>
          } 
        </Toolbar>
      </AppBar>
      <div className="container" style={{position: "relative"}}>
        <div className="homepageImage" style={{height: "1151px"}}>
          <h1 style={{position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%",
                    fontSize: "150px",
                    color: "white",
                    opacity: "0.9"
                    }}>Welcome!</h1>
                    
        </div>
      </div>
         <h1 style={{marginLeft: "20px", textAlign: "center"}}>Upcoming events</h1>       

        <Grid container spacing={24} 
                direction={"row"}
                alignItems={"center"}>
                
            {this.props.events.length > 0 && this.emptyArray[this.state.index].map(x => {
            return (
                <div>     
                <Grid item lg={10} style={{paddingLeft: '20px', paddingBottom: "30px", paddingTop: '20px'}}>
                <Card style={{width: "100%", height: '500px'}}>
                  <CardMedia>
                   <img src={x.pictureUrl} style={{width: '345px', height: '200px'}}/>
                 </CardMedia >
                  <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                      {x.title}
                    </Typography>
                    <Typography gutterBottom variant="headline" component="h6">
                      Start date: {x.startDate}
                    </Typography>
                    <Typography gutterBottom variant="headline" component="h6">
                      Start time: {x.startTime}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      <Link to={`/events/${x.id}`}>Learn More </Link>
                    </Button>
                  </CardActions>
                </Card>
                </Grid>
              </div>
        )} )  }
        
        
              </Grid>
                  {   this.state.index !== 0 &&
                      <Button variant="contained" color="primary" onClick={this.backward} size="small" color="primary">Previous</Button>
                   }
                  {   this.state.index < this.emptyArray.length -1 &&
                      <Button variant="contained" color="primary" onClick={this.foreward} size="small" color="primary">Next</Button>
                  }
                      {this.props.currentUser &&
                      <EventForm onSubmit={this.createEvent} />
                  }
      </div>
    )
  }
}

const mapStateToProps = function (state) {
    return {
      events: state.events,
      currentUser: state.currentUser === null ? null : state.currentUser,
      users: state.users === null ? null : state.users,
      user:
      state.currentUser &&
      state.users &&
      state.users[userId(state.currentUser.jwt)]
    }
  }

  export default connect(mapStateToProps, { fetchAllEvents, createEvent, getUsers })(EventList)