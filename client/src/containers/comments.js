import React, {PureComponent} from 'react'
import Button from '@material-ui/core/Button';

export class Comments extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state.comment)
		this.setState({
			comment: ""
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
			<div>
			<form onSubmit={this.handleSubmit} style={{marginTop: "200px"}}>
				<div>
					<label htmlFor="comment">Your comment</label>
					<input name="comment" id="comment" value={
						this.state.comment !== undefined ? this.state.comment : initialValues.comment
					} onChange={ this.handleChange } />
				</div>
				<Button variant="contained" color="primary" type="submit">Create comment</Button>
			</form>
			</div>
		)
	}
}