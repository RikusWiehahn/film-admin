import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import styled from '@emotion/styled';
import CLR from '../config/CLR';
import { showSignInScreen, logOut } from '../config/ActionsIndex';
import NavBarButton from './NavBarButton';
import { TEAMS, TASKS, PRODUCTS, ITEMS, CUSTOMERS } from '../config/RoutesIndex';

class NavBar extends Component {
  pressedLogIn = () => {
    this.props.showSignInScreen(true);
  }

  signedInButtons = () => {
    if (this.props.isSignedIn) {
      return (
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', paddingRight: 25 }}>
          <NavBarButton onClick={() => this.props.history.push(TASKS)} label={'Tasks'}  logoType={'Search'} />
          <NavBarButton onClick={() => this.props.history.push(ITEMS)} label={'Items'}  logoType={'Search'} />
          <NavBarButton onClick={() => this.props.history.push(PRODUCTS)} label={'Products'} logoType={'Home'}/> 
          <NavBarButton onClick={() => this.props.history.push(CUSTOMERS)} label={'Customers'}  logoType={'Search'} />
          <NavBarButton onClick={() => this.props.history.push(TEAMS)} label={'Teams'} logoType={'User'}/> 
        </div>
      )
    }
  }

  nonSignedInButtons = () => {
    if (!this.props.isSignedIn) {
      return (
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', paddingRight: 25 }}>
          <NavBarButton onClick={this.pressedLogIn} label={'Log In'} logoType={'LogIn'}/>
        </div>
      )
    }
  }

  render() {
    return (
      <div style={{ zIndex: 100 }}>
        <OuterDiv>
        {this.nonSignedInButtons()}
        {this.signedInButtons()}
        </OuterDiv>
        <div style={{ height: '60px' }}/>
      </div>
    );
  }
}

const OuterDiv = styled.div(() => ({
  position: 'fixed',
  zIndex: 100,
  top: '0px',
  display: 'flex',
  height: '59px',
  borderStyle: 'solid',
  borderWidth: '0.5px',
  borderColor: 'transparent',
  borderBottomColor: CLR.SURFACE_ACTIVE,
  width: '100%',
  backgroundColor: CLR.WHITE,
  paddingLeft: '10px',
  alignItems: 'center',
  justifyContent: 'space-between',
  // boxShadow: '0.5px 0.5px 5px rgba(0,0,0,0.5)'
}));

const mapStateToProps = ({ teams }) => {
  const { 
    isSignedIn,
   } = teams;
  return {
    isSignedIn,
  };
}
 
export default withRouter(connect(mapStateToProps, { showSignInScreen, logOut })(NavBar));