import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {fetchAllAdds, createAdd} from '../actions/adds'
import {Link} from 'react-router-dom'
import { AddForm } from './addForm';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';


class AddsList extends PureComponent {

  state = {
      edit: false
  }

  toggleEdit = () => {
      this.setState({
          edit: !this.state.edit
      })
  }

  componentWillMount() {
      this.props.fetchAllAdds()
  }

  createAdd = (add) => {
      this.props.createAdd(add)
  }

  render() {
    return (
      <div>
             <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            All advertisements
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
        <Grid container spacing={24} 
                direction={"row"}
                alignItems={"center"}>
        {this.props.addss.length > 0 && this.props.addss.map(x => {
            return (
                <div>            
                <Grid item lg={10} style={{paddingLeft: '20px', paddingBottom: "30px", paddingTop: '20px'}}>
                <Card style={{maxWidth: '345px', height: '400px'}}>
                  <CardMedia>
                   <img src={x.pictureUrl} style={{width: '345px', height: '200px'}}/>
                 </CardMedia >
                  <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                      {x.title}
                    </Typography>
                    <Typography component="p">
                     Price &euro;{x.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      <Link to={`/adds/${x.id}`}>Learn More </Link>
                    </Button>
                  </CardActions>
                  {
                      this.state.edit &&
                  <CardActions>
                    <Button size="small" color="primary">
                      Adjust
                    </Button>
                  </CardActions>
                  }
                  {
                      !this.state.edit &&
                  <CardActions>
                    <Button size="small" color="primary" onClick={this.toggleEdit}>
                      I'm an admin!
                    </Button>
                  </CardActions>
                  }
                </Card>
                </Grid>
                
              </div>
        )} )  }
              </Grid>

        <AddForm onSubmit={this.createAdd} />
      </div>
    )
  }
}

const mapStateToProps = function (state) {
    return {
      addss: state.addss
    }
  }

  export default connect(mapStateToProps, { fetchAllAdds, createAdd })(AddsList)