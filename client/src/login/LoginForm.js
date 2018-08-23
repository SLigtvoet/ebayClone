import React, {PureComponent} from 'react'
import './LoginForm.css'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button';

export default class LoginForm extends PureComponent {
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
      <div className="login-form">
  			<form onSubmit={this.handleSubmit}>
  				<InputLabel>
            Email
            <Input pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" type="email" name="email" value={
  						this.state.email || ''
  					} onChange={ this.handleChange } />
          </InputLabel>

  				<InputLabel>
            Password
            <Input type="password" name="password" value={
  						this.state.password || ''
  					} onChange={ this.handleChange } />
          </InputLabel>

  				<Button variant="contained" color="primary" type="submit">Login</Button>
  			</form>
		  </div>)
	}
}
