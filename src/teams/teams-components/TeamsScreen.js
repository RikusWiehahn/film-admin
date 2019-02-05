import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTeamInfo, logOut, getStaffMemberInfo } from '../../config/ActionsIndex';
import CLR from '../../config/CLR';
import { confirmAlert } from 'react-confirm-alert';
import MinimalButton from '../../common/MinimalButton';
import { LogOut } from 'react-feather';
import { TEAMS } from '../../config/RoutesIndex';
import { Typography } from '@material-ui/core';
import LoadingIndicator from '../../common/LoadingIndicator';
import styled from '@emotion/styled';
import Card from '../../common/Card';

class TeamsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      message: null,
    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.getTeamInfo({
      token: this.props.token,
    }, ({ failed, message }) => {
      if (failed) this.setState({ message, loading: false });
      if (!failed) this.setState({ message: null, loading: false });
    });
    this.props.getStaffMemberInfo({
      token: this.props.token,
    }, () => {
      this.setState({ loading: false });
    });
  }

  showErrorMessage = () => {
    if (this.state.message) {
      return (
        <Typography variant='body2' style={{ fontFamily: 'roboto', color: 'red', textAlign: 'center' }}>
            {`${this.state.message}, This site is for staff use only`}
        </Typography>
      );
    } return null;
  }

  welcomeStaffMember = () => {
    if (!this.state.loading) {
      return (
          <Card onClick={() => {}}>
            <Typography variant='body2' style={{ fontFamily: 'roboto', textAlign: 'center' }}>
              My Details
            </Typography>
            <Typography variant='body1' style={{ fontFamily: 'roboto', textAlign: 'center' }}>
              {`${this.props.firstName} ${this.props.surname}`}
            </Typography>
            <Typography variant='body1' style={{ fontFamily: 'roboto', textAlign: 'center' }}>
              {`${this.props.email}`}
            </Typography>
          </Card>
      )
    }
  }

  showTeamInfo = () => {
    if (!this.state.loading && this.props.team) {
      return (
          <Card onClick={() => {}}>
            <Typography variant='body2' style={{ fontFamily: 'roboto', textAlign: 'center' }}>
              My Team
            </Typography>
            <Typography variant='body1' style={{ fontFamily: 'roboto', textAlign: 'center' }}>
              {`${this.props.team.teamName}`}
            </Typography>
            <Typography variant='body1' style={{ fontFamily: 'roboto', textAlign: 'center' }}>
              {`${this.props.team.teamMembers.length} members`}
            </Typography>
          </Card>
      )
    } else return (
      <Card onClick={() => {}}>
        <Typography variant='body2' style={{ fontFamily: 'roboto', textAlign: 'center' }}>
          You are not in a team yet
        </Typography>
      </Card>
    )
  }

  pressedLogOut = () => {
    confirmAlert({
      title: <Typography variant='h4' style={{ fontFamily: 'knewave' }}>SIGN OUT?</Typography>,
      message: <Typography variant='body1' style={{ fontFamily: 'roboto' }}>Are you sure you want to sign out?</Typography>,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.props.logOut();
            this.props.history.push(TEAMS)
          }
        },
        {
          label: 'No',
          onClick: () => {},
        }
      ]
    })
  }

  render() {
    console.log(this.props);
    if (this.state.loading) return <div style={{ display: 'flex', justifyContent: 'center'}}><LoadingIndicator /></div>;
    return (
      <Container>
        {this.showErrorMessage()}
        {this.welcomeStaffMember()}
        {this.showTeamInfo()}
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <MinimalButton
            onClick={this.pressedLogOut} 
            label={'Sign Out'} 
            logoComponent={LogOut}
            activeColor={CLR.RED_ERROR_TEXT} 
            inactiveColor={CLR.BLACK}
          />
        </div>
      </Container>
    )
  }
}

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const mapStateToProps = ({ teams }) => {
  const { 
    isSignedIn,
    signInVisible,
    token,
    email,
    firstName,
    surname,
    team,
   } = teams;
  return {
    isSignedIn,
    signInVisible,
    token,
    email,
    firstName,
    surname,
    team,
  };
}

export default connect(mapStateToProps, { getTeamInfo, getStaffMemberInfo, logOut })(TeamsScreen);