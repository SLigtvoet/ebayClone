import React, {PureComponent} from 'react'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel'

export default class EditTicketForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
		this.setState({
			title: "",
			thumbnail: "",
			price: "",
			description: ""
		})
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

 

	render() {
		const initialValues = this.props.initialValues || {}
		return (
            <div style={{border: "2px solid black"}}>
			<form onSubmit={this.handleSubmit} style={{marginTop: "2px"}}>
				<div>
					<InputLabel htmlFor="title">change title</InputLabel>
					<Input pattern=".{2,}" name="title" id="title" value={
						this.state.title !== undefined ? this.state.title : initialValues.title
					} onChange={ this.handleChange } />
				</div>
                <div>
					<InputLabel htmlFor="thumbnail">change picture URL</InputLabel>
					<Input  name="thumbnail" id="thumbnail" value={
						this.state.thumbnail !== undefined ? this.state.thumbnail : initialValues.thumbnail
					} onChange={ this.handleChange } />
				</div>
				<div>
					<InputLabel htmlFor="price">change price</InputLabel>
					<Input name="price" id="price" value={
						this.state.price !== undefined ? this.state.price : initialValues.price
					} onChange={ this.handleChange } />
				</div>
				<div>
					<InputLabel htmlFor="description">change description</InputLabel>
					<Input pattern=".{2,}"  name="description" id="description" value={
						this.state.description !== undefined ? this.state.description : initialValues.description
					} onChange={ this.handleChange } />
				</div>
				<Button variant="contained" color="primary" type="submit">change ticket!</Button>
			</form>
            </div>
		)
	}
}
