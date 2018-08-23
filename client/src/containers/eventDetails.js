import React, {PureComponent} from 'react'
import { connect } from 'react-redux';
import { fetchEvent } from '../actions/events'
import { createTicket } from '../actions/tickets'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TicketForm from './ticketForm'
import { fetchTicket, fetchEventTickets } from '../actions/tickets'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import {getUsers} from '../actions/users'
import {userId} from '../jwt'


class EventDetails extends PureComponent {

  state = {
    edit: false,
}

toggleEdit = () => {
    this.setState({
        edit: !this.state.edit
    })
}

handleSubmit = (data) => {
  this.props.createTicket(this.props.match.params.id, data.description, Number(data.price), data.thumbnail)
}

componentDidMount() {
        this.props.fetchEvent(this.props.match.params.id)
        this.props.fetchEventTickets(this.props.match.params.id)
        this.props.getUsers()      
    }

averageTicketPrice = (tickets) => {
    return tickets.reduce((accumulator, currentValue) => {
      return accumulator + Number(currentValue.price)
    },0) / tickets.length
}

fraudCalculator = (x) => {
    let risk = 2
    const hourCreation = new Date(x.time_of_creation)
    console.log(x, "helluh")
    if (this.props.users[x.user_id].ticketCounter === 1) risk += 10
    console.log(risk, "stap 1")
    if (x.price === this.averageTicketPrice(this.props.tickets)) risk
    console.log(risk, "stap 2")
    if (100 - (x.price *100 / this.averageTicketPrice(this.props.tickets)) > 15){
      risk +=(100 - (x.price *100 / this.averageTicketPrice(this.props.tickets)))
    }console.log(risk, "stap 3")
    if (100 - (x.price *100 / this.averageTicketPrice(this.props.tickets)) < -15) {
      risk -= 15
    } 
   if (100 - (x.price *100 / this.averageTicketPrice(this.props.tickets)) < 15 && (100 - (x.price *100 / this.averageTicketPrice(this.props.tickets)) > -15))
   { risk +=(100 - (x.price *100 / this.averageTicketPrice(this.props.tickets)))
      
    } console.log(risk, "stap 4")
    if (x.comments_counter > 3 ){
      risk + 6
    }console.log(risk, "stap 5")
    if (hourCreation.getUTCHours() >= 9 && hourCreation.getUTCHours() <17){
      risk -=10
    } else {
      risk +=10
    } console.log(risk, "stap 6")
    if (risk > 98 || risk < -98){
      risk = 98
    } else if (risk < 2){
      risk = 2
    }
    return Math.ceil(risk)
}

color = (x) => {
    if (x < 33){
      return "green"
    } else if (x < 66){
      return "orange"
    } else {
      return "red"
    }
}

  render() {
      return (
        <div>
          <AppBar position="static">
              <Toolbar>
              {this.props.currentAdd &&
                  <Typography variant="title" color="inherit">
                  
                  <Link to={'/'} style={{color: "white", textDecoration: "none"}}>Home</Link>
          
                  </Typography>
                  }
                  <div style={{width: "87%"}}></div>
                  {!this.props.currentUser &&
                  <Typography variant="title" color="inherit">
                  
                    <Link to={'/login'} style={{color: "white", textDecoration: "none"}}>Log in</Link>
          
                  </Typography>
                  }
                  
          {this.props.currentUser &&
              <Typography variant="title" color="inherit">
              <Link to={'/logout'} style={{color: "white", textDecoration: "none"}}>logout</Link>
              </Typography>
            } 
              </Toolbar>
          </AppBar>
          {this.props.currentAdd &&
          <h1 style={{textAlign: "center"}}>Available tickets for {this.props.currentAdd.title}</h1>
          }
          {this.props.tickets && 
          <div>
          <Grid container spacing={24} 
              direction={"row"}
              alignItems={"center"}>
              
      {(this.props.tickets.length > 0 && this.props.users) && this.props.tickets.map(x => {
          return (
              <div>     
              <Grid item lg={10} style={{paddingLeft: '20px', paddingBottom: "30px", paddingTop: '20px'}}>
              <Card style={{width: "100%", height: '400px'}}>
                <CardMedia>
                  <img src={x.thumbnail} style={{width: '345px', height: '200px'}}/>
                </CardMedia >
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h5">
                    {x.title}
                  </Typography>
                  <Typography gutterBottom variant="headline" component="h5">
                  &euro;{x.price}
                  </Typography>
                  <Typography gutterBottom variant="headline" component="h5">
                  {/* Average price: &euro;{this.averageTicketPrice(this.props.tickets)} <br></br>
                  Price deviation: &euro;{this.averageTicketPrice(this.props.tickets)- x.price}<br></br>
                  percentage deviation: {100 - (x.price *100 / this.averageTicketPrice(this.props.tickets) )}% */}
                  </Typography>
                  <Typography gutterBottom variant="headline" component="h5">
                  {/* user id: {x.user_id} <br></br>
                  comments counter: {x.comments_counter} <br></br>
                  this user has {this.props.users[x.user_id].ticketCounter} tickets <br></br>
                  time of creation: {x.time_of_creation} <br></br>
                  calculated fraud risk: {}% */}
                  Fraud risk: {this.fraudCalculator(x)}%
                  <div className="fraudAlert" style={{width: "20px",
                              height: "20px",
                              border: "2px solid black",
                              backgroundColor: this.color(this.fraudCalculator(x))}}></div>
                  </Typography>
                  
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    <Link to={`/tickets/${x.id}`}>Learn More </Link>
                  </Button>
                </CardActions>
              </Card>
              </Grid>
            </div>
      )} )  }
            </Grid>
            </div>
          }
          {this.props.currentUser &&
            <TicketForm onSubmit={this.handleSubmit} />
              }
        </div>
      )
    }
  }

const mapStateToProps = function (state) {
  return {
    currentAdd: state.currentAdd,
    currentUser: state.currentUser,
    tickets: Object.values(state.tickets),
    users: state.users === null ? null : state.users,
    user:
    state.currentUser &&
    state.users &&
    state.users[userId(state.currentUser.jwt)]
  }
}
  
export default connect(mapStateToProps, {getUsers, fetchEvent, createTicket, fetchTicket, fetchEventTickets})(EventDetails)



