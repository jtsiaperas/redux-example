import React, { Component } from "react";
import { connect } from "react-redux";
import { forgotPassword } from "../../../store/actions/userActions";
import {
  Button,
  container,
  Form,
  Message,
  Segment, Dimmer, Loader
} from 'semantic-ui-react';
import vid from '../../Background/bc.mp4'
import './Reset.css'

class ForgotPassword extends Component{
  
  state = {
	email: ""
  };
  
  onChange = (e) => this.setState({
	...this.state, [e.target.name]: e.target.value 
  });
  
  onSubmit = (e) => {
	e.preventDefault();
	this.props.forgotPassword(this.state.email, this.props.history);
  };
  
  render(){
	const { loading, error, message } = this.props.passwordForgot;
	
	return(
		<div className='container'>
        <div dangerouslySetInnerHTML={{ __html: `
        <video
          loop
          muted
          autoplay
          playsinline
          src="${vid}"
          class="Videostyle"
        />,
      ` }}></div>
<div className="jumbotron">
	  <div className="main">
		<container text>
		  <h2>Enter your email for a password reset link</h2>
		  
		  <Form onSubmit={this.onSubmit} className="submitForm">	
			{loading ? (<Dimmer active inverted size="massive"><Loader inverted>Loading...</Loader></Dimmer>)
			: 
			message ? <Message className="success-text" content={message.message} />
			:
			error ? <Message className="error-text" content={error.message} />
			: null}
			<Segment>
			  <Form.Input
				fluid
				required
				icon="lock"
				iconPosition="left"
				label="Email"
				placeholder="email..."
				name="email"
				type="email"
				value={this.state.email}
				onChange={this.onChange}
			  />
			  <Button primary
				icon="signup"
				type="submit"
				content="Submit"
			  />
			</Segment>
		  </Form>
		</container>
	  </div>
	  </div></div>
	)
  }
}

const mapStateToProps = (state) => ({
  authInfo: state.authInfo,
  passwordForgot: state.passwordForgot
});

export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);