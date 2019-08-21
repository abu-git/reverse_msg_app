import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

const Message = props => (
	<div className="card">
		<div className="card-body">
			<h5 className="card-subtitle mb-2">{props.theMessage.fullName}</h5>
			<h6 className="card-subtitle mb-2 text-muted"><i className="fas fa-phone"></i>{"  " + props.theMessage.phoneNumber}</h6>
			<h6 className="card-subtitle mb-2 text-muted"><i className="fas fa-envelope"></i>{"  " + props.theMessage.email}</h6>
			<h6 className="card-subtitle mb-2 text-muted"><i className="far fa-clock"></i>{"  " + props.theMessage.date}</h6>
			<p className="card-text">{props.theMessage.message}</p>
		</div>
	</div>
)


class ViewBoard extends Component{
	constructor(props){
		super(props);
		this.state = {
			messages: []
		};

		this.messageList = this.messageList.bind(this);
	}

	componentDidMount(){
		axios.get('/view-all')
			.then((res) => {
				this.setState({ messages: res.data });
				//console.log(this.state.messages);
			}).catch((err) =>{
				console.log(err.message);
			});
	}

	messageList(){
		return this.state.messages.map((theMessage, i) =>{
			return <Message theMessage={theMessage} key={i} />
		});
	}

	render(){
		return(
			<div className="row mt-2">
				<div className="col-sm-8 m-auto">
					<div className="card card-body">
						<h1 className="display-4 mb-2">Message Board</h1>
						<Link to="/" className="btn btn-primary btn-block mb-2">Send New Message</Link>
						{ this.messageList() }
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(ViewBoard);