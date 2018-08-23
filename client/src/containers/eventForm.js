import React, {PureComponent} from 'react'
import Button from '@material-ui/core/Button';

export class EventForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
		this.setState({
			title: "",
			pictureUrl: "",
			startDate: "",
			startTime: ""
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
			<form onSubmit={this.handleSubmit} style={{marginTop: "200px"}}>
				<div>
					<label htmlFor="title">Add title</label>
					<input name="title" id="title" value={
						this.state.title !== undefined ? this.state.title : initialValues.title
					} onChange={ this.handleChange } />
				</div>
                <div>
					<label htmlFor="pictureUrl">Add picture URL</label>
					<input name="pictureUrl" id="pictureUrl" value={
						this.state.pictureUrl !== undefined ? this.state.pictureUrl : initialValues.pictureUrl
					} onChange={ this.handleChange } />
				</div>
				<div>
					<label htmlFor="startDate">Add start date</label>
					<input name="startDate" id="startDate" value={
						this.state.startDate !== undefined ? this.state.startDate : initialValues.startDate
					} onChange={ this.handleChange } />
				</div>
				<div>
					<label htmlFor="startTime">Add start time</label>
					<input name="startTime" id="startTime" value={
						this.state.startTime !== undefined ? this.state.startTime : initialValues.startTime
					} onChange={ this.handleChange } />
				</div>
				<Button variant="contained" color="primary" type="submit">Create event!</Button>
			</form>
		)
	}
}
