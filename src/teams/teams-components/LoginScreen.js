import React, { Component } from 'react';
import styled from '@emotion/styled';
import CLR from '../../config/CLR';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import '../../assets/confirm-alert.css' // Import css
import { 
  showSignInScreen, 
  signInAsExistingCustomer,
  resetPassword,
} from '../../config/ActionsIndex';
import FormButton from '../../common/FormButton';
import LoadingIndicator from '../../common/LoadingIndicator';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      animate: true,
      email: '',
      password: '',
      showResetPasswordButton: false,
      helpMessage: '',
    }
  }

  signInAsExistingCustomer = () => {
    this.setState({ helpMessage: null, loading: true, showResetPasswordButton: false });
    this.props.signInAsExistingCustomer({
      email: this.state.email,
      password: this.state.password,
    }, ({ success, message }) => {
      if (success) {
        const hide = () => this.props.showSignInScreen(false);
        setTimeout(hide, 500);
      } else if (message) {
        this.setState({ loading: false, helpMessage: message, showResetPasswordButton: true });
      } else this.setState({ loading: false });
    });
  }

  resetPassword = () => {
    // eslint-disable-next-line no-useless-escape
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({ helpMessage: null, loading: true });
    if (!re.test(this.state.email)) {
      // validate email
        this.setState({ loading: false, helpMessage: 'Invalid email.' });
        return;
    }
    confirmAlert({
      title: 'Are you Sure?',
      message: `Select yes to have a new password emailed to ${this.state.email}.`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.props.resetPassword({
            email: this.state.email,
          }, ({ success, message }) => {
            if (success) {
              this.setState({ loading: false, helpMessage: message });
            } else if (message) {
              this.setState({ loading: false, helpMessage: message, showResetPasswordButton: true });
            } else this.setState({ loading: false });
          })
        },
        {
          label: 'No',
          onClick: () => {},
        }
      ]
    })
  }

  displayHelpMessage = () => {
    if (this.state.helpMessage) {
      return (
        <Typography variant={'body1'} align={'center'} style={{ color: CLR.RED_ERROR_TEXT, paddingLeft: 10 }}>
          {this.state.helpMessage}
        </Typography>
      );
    } return null;
  }

  resetPasswordButton = () => {
    if (this.state.showResetPasswordButton) {
      return (
        <FormButton 
          onClick={this.resetPassword}
          label='Reset Your Password'
        />
      )
    } return null;
  }

  logInForm = () => {
    if (this.state.loading) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LoadingIndicator/>
        </div>
      )
    }
      return (
        <div>
          <div style={{ backgroundColor: CLR.PRIMARY_COLOR, justifyContent: 'center', padding: 10 }}>
            <Typography variant={'h4'} align={'center'} style={{ fontFamily: 'knewave', color: CLR.WHITE }}>
            <span role="img" aria-label="stars">✨</span> Sign In <span role="img" aria-label="stars">✨</span>
            </Typography>
          </div>
            <div style={{ padding: 10, display: 'flex' }}>
              <EmailInput 
                value={this.state.email} 
                placeholder={'email'} 
                type={'text'} 
                name={'email'} 
                onChange={({ target }) => this.setState({ email: target.value })}
              />
            </div>
            <div style={{ paddingTop: 0, paddingLeft: 10, paddingRight: 10, paddingBottom: 10, display: 'flex' }}>
              <PasswordInput 
                value={this.state.password}
                placeholder={'enter password'}
                type={'password'} 
                name={'password'}
                onChange={({ target }) => this.setState({ password: target.value })} 
              />
            </div>
            <div>
              {this.displayHelpMessage()}
            </div>
              <FormButton 
                onClick={this.signInAsExistingCustomer}
                label='Sign In'
              />
            {this.resetPasswordButton()}
        </div>
      )
  }
  render() {
    return (
      <Fade in={this.state.animate}>
        <TransparentBackground>
          <LoginCard>
          {this.logInForm()}
          </LoginCard>
        </TransparentBackground>
      </Fade>
    );
  }
}
const TransparentBackground = styled.div(() => ({
  height: 'calc(100vh - 60px)', 
  width: '100vw', 
  backgroundColor: 'rgba(0,0,0,0.6)', 
  zIndex: 90, 
  position: 'fixed',
  top: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const LoginCard = styled.div(() => ({
  width: '320px',
  backgroundColor: CLR.WHITE,
  zIndex: 91,
  display: 'block',
  borderRadius: '3px',
  borderStyle: 'solid',
  borderWidth: '0px',
  overflow: 'hidden',
}));
const PasswordInput = styled.input(() => ({
  boxSizing: `border-box`,
  border: `0.5px solid ${CLR.SURFACE_ACTIVE}`,
  height: `30px`,
  flex: 1,
  padding: 4,
  fontSize: `16px`,
  outline: `none`,
  textOverflow: `ellipses`,
}));
const EmailInput = styled.input(() => ({
  boxSizing: `border-box`,
  border: `0.5px solid ${CLR.SURFACE_ACTIVE}`,
  height: `30px`,
  flex: 1,
  padding: 4,
  fontSize: `16px`,
  outline: `none`,
  textOverflow: `ellipses`,
}));

export default connect(null, { 
  showSignInScreen, 
  signInAsExistingCustomer,
  resetPassword,
})(LoginScreen);