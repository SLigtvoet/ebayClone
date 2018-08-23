import React, {PureComponent} from 'react'
import './SignupForm.css'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Link} from 'react-router-dom'

export default class SignupForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

	render() {
		return (
			<div>
			<AppBar position="fixed">
				<Toolbar>
					<Typography variant="title" color="inherit">
					<Link to={'/'} style={{color: "white", textDecoration: "none"}}>Home</Link>
					</Typography>
				</Toolbar>
			</AppBar>
		
      <div className="signup-form">
  			<form onSubmit={this.handleSubmit}>
  				<InputLabel>
            Email
            <Input pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" type="email" name="email" value={
  						this.state.email || ''
  					} onChange={ this.handleChange } />
          </InputLabel>

					<InputLabel>
            First Name
            <Input type="firstName" name="firstName" value={
  						this.state.firstName|| ''
  					} onChange={ this.handleChange } />
          </InputLabel>

					<InputLabel>
            Last name
            <Input type="lastName" name="lastName" value={
  						this.state.lastName || ''
  					} onChange={ this.handleChange } />
          </InputLabel>

					<InputLabel>
            Telephone number
            <Input type="telephoneNumber" name="telephoneNumber" value={
  						this.state.telephoneNumber || ''
  					} onChange={ this.handleChange } />
          </InputLabel>
  					
  				<InputLabel>
            Password
  					<Input type="password" name="password" value={
  						this.state.password || ''
  					} onChange={ this.handleChange } />
  				</InputLabel>

  				<InputLabel>
            Confirm password
  					<Input type="password" name="confirmPassword" value={
  						this.state.confirmPassword || ''
  					} onChange={ this.handleChange } />
  				</InputLabel>

  				{
  					this.state.password &&
  					this.state.confirmPassword &&
  					this.state.password !== this.state.confirmPassword &&
  					<p style={{color:'red'}}>The passwords do not match!</p>
  				}

  				<Button variant="contained" color="primary" type="submit">Sign up</Button>
  			</form>
      </div>
			</div>
		)
	}
}
