import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './SignUp.css';

import { registerUser } from '../../actions/userActions';
import { setNewVenue } from '../../actions/venueActions';
import InputField from '../styledComponents/InputField';
import ModalButton from '../styledComponents/ModalButton';
import InnerModal from '../styledComponents/InnerModal';
import SoftText from '../styledComponents/SoftText';

export class SignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    venueName: '',
    venueCity: '',
    venueError: null,
    userErrors: {
      email: null,
      password: null
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const savedUser = await this.saveUser();
    const savedVenue = await this.saveVenue();
    if (savedUser && savedVenue) {
      this.props.history.push('/home');
    }
  };

  toggleModal = () => {
    this.props.closeSignUpModal();
    this.props.openLogInModal();
  };

  saveVenue = async () => {
    try {
      const { venueName, venueCity } = this.state;
      const { setNewVenue } = this.props;
      return await setNewVenue(venueName, venueCity);
    } catch (error) {
      this.setState({ venueError: error.message });
    }
  };

  saveUser = async () => {
    try {
      const { firstName, lastName, email, password } = this.state;
      const { registerUser } = this.props;
      const user = {
        buyer: {
          first_name: firstName,
          last_name: lastName,
          email,
          password
        }
      };
      return await registerUser(user);
    } catch (error) {
      this.setState({
        userErrors: {
          ...this.state.userErrors,
          ...error.response.data.errors[0].detail
        }
      });
    }
  };

  render() {
    const { closeSignUpModal } = this.props;
    const { userErrors, venueError } = this.state;
    return (
      <div className="sign-up">
        <InnerModal>
          <i className="fas fa-times-circle" onClick={closeSignUpModal} />
          <div className="top-container">
            <div className="top-inner">
              <h3 className="header-text">Welcome to Talent Buyer!</h3>
            </div>
          </div>
          <p>Sign Up With Email</p>
          <form className="sign-up-form" onSubmit={this.handleSubmit}>
            <InputField
              type="text"
              name="firstName"
              value={this.state.firstName}
              placeholder="first name"
              onChange={this.handleChange}
            />
            <InputField
              type="text"
              name="lastName"
              value={this.state.lastName}
              placeholder="last name"
              onChange={this.handleChange}
            />
            <InputField
              type="email"
              name="email"
              value={this.state.email}
              placeholder="email"
              onChange={this.handleChange}
            />
            {userErrors.email && (
              <p style={{ fontSize: '0.8rem', color: 'crimson', width: '80%' }}>
                Email {userErrors.email[0]}
              </p>
            )}
            <InputField
              type="password"
              name="password"
              value={this.state.password}
              placeholder="password"
              onChange={this.handleChange}
            />
            {userErrors.password && (
              <p style={{ fontSize: '0.8rem', color: 'crimson', width: '80%' }}>
                Password {userErrors.password[0]}
              </p>
            )}
            <InputField
              type="text"
              name="venueName"
              value={this.state.venueName}
              placeholder="Venue Name"
              onChange={this.handleChange}
            />
            <InputField
              type="text"
              name="venueCity"
              value={this.state.venueCity}
              placeholder="Venue City"
              onChange={this.handleChange}
            />
            {venueError && (
              <p style={{ fontSize: '0.8rem', color: 'crimson', width: '80%' }}>
                {venueError}
              </p>
            )}
            <ModalButton>Sign Up</ModalButton>
          </form>
          <SoftText onClick={this.toggleModal}>
            Already a member? Sign in
          </SoftText>
        </InnerModal>
      </div>
    );
  }
}

SignUp.propTypes = {
  openLogInModal: PropTypes.func,
  closeSignUpModal: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  'history.push': PropTypes.func,
  registerUser: PropTypes.func.isRequired
};

export const mapDispatchToProps = dispatch => ({
  registerUser: user => dispatch(registerUser(user)),
  setNewVenue: (venueName, venueCity) =>
    dispatch(setNewVenue(venueName, venueCity))
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(SignUp)
);
