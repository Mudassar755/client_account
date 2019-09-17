import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  setdisableBalanceOnAdd,
  setdisableBalanceOnEdit,
  setallowRegistration
} from "../../actions/settingsAction";
import PropTypes from "prop-types";

class Settings extends Component {
  disableBalanceOnAddChange = () => {
    const { setdisableBalanceOnAdd } = this.props;
    setdisableBalanceOnAdd();
  };

  disableBalanceOnEditChange = () => {
    const { setdisableBalanceOnEdit } = this.props;
    setdisableBalanceOnEdit();
  };

  allowRegistrationChange = () => {
    const { setallowRegistration } = this.props;
    setallowRegistration();
  };

  render() {
    const {
      setdisableBalanceOnAdd,
      setdisableBalanceOnEdit,
      setallowRegistration
    } = this.props.settings;
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" />
              Back To Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Edit Settings</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Allow Registration</label>{" "}
                <input
                  type="checkbox"
                  name="allowRegistration"
                  checked={!!setallowRegistration}
                  onChange={this.allowRegistrationChange}
                />
              </div>

              <div className="form-group">
                <label>Disable Balance On Add</label>{" "}
                <input
                  type="checkbox"
                  name="disableBalanceOnAdd"
                  checked={!!setdisableBalanceOnAdd}
                  onChange={this.disableBalanceOnAddChange}
                />
              </div>

              <div className="form-group">
                <label>Disable Balance On Edit</label>{" "}
                <input
                  type="checkbox"
                  name="disableBalanceOnEdit"
                  checked={!!setdisableBalanceOnEdit}
                  onChange={this.disableBalanceOnEditChange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setdisableBalanceOnAdd: PropTypes.func.isRequired,
  setdisableBalanceOnEdit: PropTypes.func.isRequired,
  setallowRegistration: PropTypes.func.isRequired
};

export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  { setdisableBalanceOnAdd, setdisableBalanceOnEdit, setallowRegistration }
)(Settings);
