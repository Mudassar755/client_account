import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

 class AddClient extends Component {

  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: ''
  };

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault();
    const newClient = this.state;
    const {firestore, history} = this.props;

    //if balance is empty, set it to zero
    if(newClient.balance === ''){
      newClient.balance = 0
    };

    firestore.add({ collection: "clients"}, newClient).then(() => history.push('/'))

  }
  render() {
    const { firstName, lastName, email, phone, balance} = this.state;
    const { disableBalanceOnAdd } = this.props.settings;
    return (
      <div>
        <div className = "row">
          <div className = "col-md-6">
            <Link to = '/' className = "btn btn-link">
              <i className = "fas fa-arrow-circle-left" /> Back To Dashboard</Link>
          </div>
        </div>
        <div className = "card">
          <div className = "card-header">Add Client</div>
          <div className = "card-body">
            <form onSubmit = {this.onSubmit}>
              <div className = "form-group">
                <label htmlFor = "firstName">First Name</label>
                <input 
                type = "text"
                name = "firstName"
                className = "form-control"
                minLength = "2"
                required
                onChange = {this.onChange}
                value = {firstName}
                />
              </div>

              <div className = "form-group">
                <label htmlFor = "lastName">Last Name</label>
                <input 
                type = "text"
                name = "lastName"
                className = "form-control"
                minLength = "2"
                required
                onChange = {this.onChange}
                value = {lastName}
                />
              </div>

              <div className = "form-group">
                <label htmlFor = "email">Email</label>
                <input 
                type = "email"
                name = "email"
                className = "form-control"
                onChange = {this.onChange}
                value = {email}
                />
              </div>

              <div className = "form-group">
                <label htmlFor = "phone">Phone</label>
                <input 
                type = "text"
                name = "phone"
                className = "form-control"
                minLength = "10"
                required
                onChange = {this.onChange}
                value = {phone}
                />
              </div>

              <div className = "form-group">
                <label htmlFor = "balance">Balance</label>
                <input 
                type = "text"
                name = "balance"
                className = "form-control"
                onChange = {this.onChange}
                value = {balance}
                disabled = { disableBalanceOnAdd }
                />
              </div>
              <input type = "submit" value = "Submit" className = "btn btn-block btn-primary" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
}

export default compose(
  firestoreConnect(),
  connect(( state, props) => ({
    settings: state.settings
  }))
)(AddClient);
