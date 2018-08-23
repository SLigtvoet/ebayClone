import React, {PureComponent} from 'react'
import { connect } from 'react-redux';
import { fetchEvent } from '../actions/events'
import {getUsers} from '../actions/users'
import {createComment, fetchComments}  from '../actions/comments'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { fetchTicket, editTicket, fetchEventTickets } from '../actions/tickets'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { Comments } from './comments';
import Paper from '@material-ui/core/Paper';
import {userId} from '../../src/jwt'
import EditTicketForm from './editTicketForm';

class TicketDetails extends PureComponent {
  state = {
    edit: false,
}

toggleEdit = () => {
    this.setState({
        edit: !this.state.edit
    })
}

componentDidMount() {
        this.props.fetchTicket(this.props.match.params.id)
        this.props.fetchComments(this.props.match.params.id)
        this.props.getUsers()
   
    }

    handleSubmit = (props) => {
      this.props.createComment(this.props.match.params.id, props)
    }
    
    handleEditSubmit = (data) => {
      this.props.editTicket(this.props.match.params.id, data)
    }
  
    render() {
      console.log(this.props)
        return (
          <div>
            <AppBar position="static">
                <Toolbar>
                {this.props.currentAdd &&
                    <Typography variant="title" color="inherit">
                    
            {this.props.currentAdd.title}
            
                    </Typography>
                    }
                    <div style={{width: "87%"}}></div>
                    {!this.props.currentUser &&
                    <Typography variant="title" color="inherit">
                    
                     <Link to={'/login'} style={{color: "white", textDecoration: "none"}}>Log in</Link>
            
                    </Typography>
                    }
                </Toolbar>
            </AppBar>
            {this.props.currentAdd &&
            <h1 style={{textAlign: "center"}}>Available ticket for {this.props.currentAdd.title}</h1>
            }
            {this.props.tickets && 
            <div>
            <Grid container spacing={24} 
                direction={"row"}
                alignItems={"center"}>
                
        {this.props.tickets.length > 0 && this.props.tickets.map(x => {
            return (
                <div>     
                <Grid item lg={10} style={{paddingLeft: '20px', paddingBottom: "30px", paddingTop: '20px'}}>
                <Card style={{width: "100%", height: '400px'}}>
                  <CardMedia>
                   <img src={x.thumbnail} style={{width: '345px', height: '200px'}}/>
                 </CardMedia >
                  <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                      {x.title}
                    </Typography>
                    <Typography gutterBottom variant="headline" component="h2">
                   Price: &euro;{x.price}
                    </Typography>
                    <Typography gutterBottom variant="headline" component="h2">
                    Description: {x.description}
                    </Typography>
                  </CardContent>
                  {this.props.currentAdd.user.id === this.props.user.id && (
              <Button onClick={this.toggleEdit}>
                Edit current ticket
              </Button>
            )}
                  
            
                </Card>
                </Grid>
              </div>
        )} )  }
        
              </Grid>
              </div>
            }
            {this.props.comments.length > 0 && this.props.comments.map(x => {
              return (
                <div>
                <Paper  elevation={1}>
                    <Typography variant="headline" component="h3">
                    {this.props.users[x.user_id].firstName} said
                    </Typography>
                    <Typography component="p">
                    {x.comment}
                    </Typography>
                </Paper>
                </div>

              )
            })}
            {this.state.edit &&
            <EditTicketForm onSubmit={this.handleEditSubmit} />
            }
            <Comments onSubmit={this.handleSubmit} />
            <Link to={ `/events` }><Button variant="contained" color="primary" style={{textDecoration: "none", marginTop: "20px"}}>Go back to events</Button></Link>
          </div>
        )
      }
    }

const mapStateToProps = function (state) {
  return {
    currentAdd: state.currentAdd === null ? null : state.currentAdd,
    currentUser: state.currentUser === null ? null : state.currentUser,
    users: state.users === null ? null : state.users,
    tickets: Object.values(state.tickets),
    comments: Object.values(state.comments),
    user:
    state.currentUser &&
    state.users &&
    state.users[userId(state.currentUser.jwt)]
  }
}
  
export default connect(mapStateToProps, {getUsers,fetchEventTickets,  fetchEvent, editTicket, fetchTicket, createComment, fetchComments })(TicketDetails)