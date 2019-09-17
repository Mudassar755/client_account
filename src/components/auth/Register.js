import React, { Component } from 'react';
import { firebaseConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import Alert from '../layout/Alert';
import { notifyUser } from '../../actions/notifyAction'

 class Register extends Component {

  state = {
    email: '',
    password: ''
  }

  componentWillMount() {
    const { allowRegistration } = this.props.settings;
    if(!allowRegistration){
      this.props.history.push('/')
    }
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault();

    const { email, password} = this.state;
    const { firebase, notifyUser } = this.props;

    firebase.createUser({
      email,
      password
    })
    .catch(err => notifyUser("User Already Exist", "error"))
  }
  render() {
    const { email, password } = this.state;
    const { message, messageType } = this.props.notify;
    return (
      <div className = "row">
        <div className = "col-md-6 mx-auto">
          <div className = "card">
            <div className = "card-body">
              {message ? (

              <Alert message = { message } messageType = { messageType } />
              ) : null}
              <h1 className = "text-center pb-4 pt-3">
                <span className = "text-primary">
                  <i className = "fas fa-lock" /> {' '}
                  Register
                </span>
              </h1>
              <form onSubmit = {this.onSubmit}>
                <div className = "form-group">
                  <label htmlFor = "email">Email</label>
                  <input className = "form-control" 
                  type = "eamil"
                  placeholder = "Enter Email"
                  name = "email"
                  required
                  value = {email}
                  onChange = { this.onChange}
                  />
                </div>
                <div className = "form-group">
                <label htmlFor = "password">Password</label>
                  <input className = "form-control" 
                  type = "password"
                  placeholder = "Enter Password"
                  name = "password"
                  required
                  value = {password}
                  onChange = { this.onChange}
                  />
                </div>
                <button className = "btn btn-block btn-primary">Register</button>
              </form>
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}

Register.propTypes = {
  firebase : PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired,
  notify: PropTypes.object.isRequired,
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    notify: state.notify,
    settings: state.settings
  }), { notifyUser })
)(Register);