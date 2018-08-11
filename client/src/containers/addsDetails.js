import React, {PureComponent} from 'react'
import { connect } from 'react-redux';
import { fetchAdd } from '../actions/adds'
import {Link} from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {AddForm} from './addForm'

class AddsDetails extends PureComponent {

  componentWillMount() {
        this.props.fetchAdd(this.props.match.params.id)
    }

    render() {
        return (
          <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        Your advertisement
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {this.props.currentAdd &&
                <div>
                <Grid container spacing={24} direction={"column"}>
                <Grid item lg={10} style={{paddingLeft: '20px', paddingBottom: "30px", paddingTop: '20px'}}>
                    <Card style={{maxWidth: '345px'}}>
                        <CardMedia>
                            <img src={this.props.currentAdd.pictureUrl} style={{maxWidth: '345px'}}/>
                        </CardMedia >
                         <CardContent>
                           <Typography gutterBottom variant="headline" component="h2">
                             {this.props.currentAdd.title}
                           </Typography>
                           <Typography component="p">
                            {this.props.currentAdd.addInfo}
                           </Typography>
                           <Typography component="p">
                            {this.props.currentAdd.price}
                           </Typography>
                           <Typography component="p">
                            {this.props.currentAdd.telephoneNumber}
                           </Typography>
                           <Typography component="p">
                            {this.props.currentAdd.email}
                           </Typography>
                         </CardContent>
                         <CardActions>
                           <Button size="small" color="primary">
                             Buy me!
                           </Button>
                  </CardActions>
                </Card>
                </Grid>
                </Grid>
              </div>           

            }

            <Link to={ `/adds` }><Button variant="contained" color="primary" style={{textDecoration: "none"}}>Go back to adds</Button></Link>
          </div>
        )
      }
    }

const mapStateToProps = function (state) {
  return {
    currentAdd: state.currentAdd
  }
}
  
export default connect(mapStateToProps, {fetchAdd})(AddsDetails)