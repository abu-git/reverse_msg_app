import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import validator from 'validator';
import { If } from 'rc-if-else';
import axios from 'axios';


class SubmitPage extends Component{
	constructor(props){
		super(props);
		this.state = {
			fullName: "",
			phoneNumber: "",
			email: "",
			message: "",
			errors: "",
			toBoard: false
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.validateInput = this.validateInput.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	//Validation for submitted data
	validateInput(){
		if(validator.isEmpty(this.state.fullName)){
			this.setState({ errors: "Full Name field is required"});
			return false;
		}else if(validator.isEmpty(this.state.phoneNumber)){
			this.setState({ errors: "Phone Number field is required"});
			return false;
		}else if(!validator.isNumeric(this.state.phoneNumber)){
			this.setState({ errors: "Phone Number field is incorrect"});
			return false;
		}else if(validator.isEmpty(this.state.email)){
			this.setState({ errors: "Email field is required"});
			return false;
		}else if(!validator.isEmail(this.state.email)){
			this.setState({ errors: "Email is invalid"});
			return false;
		}else if(validator.isEmpty(this.state.message)){
			this.setState({ errors: "Message field is required"});
			return false;
		}
		return true;
	}

	onChange = e =>{
		this.setState({ [e.target.id]: e.target.value });
	}

	onSubmit = e =>{
		e.preventDefault();
		const validate = this.validateInput();
		if(validate){
			//create object to be sent to Backend
			const messagePost = {
				fullName: this.state.fullName,
				phoneNumber: this.state.phoneNumber,
				email: this.state.email,
				message: this.state.message
			}

			//POST to Backend
			axios.post('/submit', messagePost)
				.then(function(res){
					console.log(res.status);
				})
				.catch(function(err){
					console.log(err);
				});
				this.setState({ toBoard: true });
		}
	}

	render(){
		const { errors } = this.state;
		if(this.state.toBoard === true){
			return <Redirect to="/view-all" />
		}
		return(
			<div className="row mt-2">
				<div className="col-sm-8 m-auto">
					<div className="card card-body">
						<h1 className="display-4 mb-2">Enter Message Info</h1>
						<If condition={errors !== ""}>
							<div className="alert alert-warning alert-dismissible fade show" role="alert">
								{errors}
								<button type="button" className="close" data-dismiss="alert" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
						</If>
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<label htmlFor="fullName">Full Name</label>
								<input onChange={this.onChange}
									value={this.state.fullName}
									className="form-control" 
									id="fullName"
									placeholder="John Doe"/>
							</div>
							<div className="form-group">
								<label htmlFor="phoneNumber">Phone Number</label>
								<input onChange={this.onChange} 
									value={this.state.phoneNumber}
									className="form-control" 
									id="phoneNumber"/>
							</div>
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input onChange={this.onChange}
									value={this.state.email} 
									className="form-control" 
									id="email"
									placeholder="johndoe@example.com"/>
							</div>
							<div className="form-group">
								<label htmlFor="message">Message</label>
								<textarea onChange={this.onChange} value={this.state.message} className="form-control" id="message" rows="3"></textarea>
							</div>
							<button type="submit" className="btn btn-success btn-block mb-2">Submit Post</button>
						</form>
						<Link to="/view-all" className="btn btn-primary">View Post</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(SubmitPage);