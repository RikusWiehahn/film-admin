import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { LogOut, User, LogIn, Search, Home } from 'react-feather';
import CLR from '../config/CLR';
import styled from '@emotion/styled';

class NavBarButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineColor: CLR.BLACK,
      activeColor: CLR.PRIMARY_COLOR,
      inactiveColor: CLR.BLACK,
    }
  }

  componentDidMount() {
    if (!this.props.activeColor) return;
    if (!this.props.inactiveColor) return;
    const { activeColor, inactiveColor } = this.props;
    activeColor ? this.setState({ activeColor }) : this.setState({ activeColor: CLR.PRIMARY_COLOR });
    inactiveColor ? this.setState({ inactiveColor, lineColor: inactiveColor }) : this.setState({ inactiveColor: CLR.BLACK });
  }

  showLogo = () => {
    if (this.props.logoType === 'LogOut') {
      return (
        <LogOut
          size={20}
          color={this.state.lineColor}
          style={{ padding: 3 }}
        />
      )
    } else if (this.props.logoType === 'User') {
      return (
        <User
          size={20}
          color={this.state.lineColor}
          style={{ padding: 3 }}
        />
      )
    } else if (this.props.logoType === 'Home') {
      return (
        <Home
          size={20}
          color={this.state.lineColor}
          style={{ padding: 3 }}
        />
      )
    } else if (this.props.logoType === 'LogIn') {
      return (
        <LogIn
          size={20}
          color={this.state.lineColor}
          style={{ padding: 3 }}
        />
      )
    } else if (this.props.logoType === 'Search') {
      return (
        <Search
          size={20}
          color={this.state.lineColor}
          style={{ padding: 3 }}
        />
      )
    }
  }
  render() {
    return (
      <ButtonContainer
        onMouseOver={() => this.setState({ lineColor: this.state.activeColor })}
        onMouseLeave={() => this.setState({ lineColor: this.state.inactiveColor })}
        styling={this.props.styling}
        onClick={() => this.props.onClick()}
      >
        {this.showLogo()}
        <Typography 
          variant="button"
          style={{ 
            color: this.state.lineColor, 
            fontSize: 10,
          }}>
          {this.props.label}
        </Typography>
      </ButtonContainer>
    )
  }
}

const ButtonContainer = styled('div')(() => ({
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  flexDirection: 'column',
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  borderWidth: 0,
  outline: 'none',
  cursor: 'pointer',
  width: '65px',
  WebkitTapHighlightColor: 'transparent',
}));

export default NavBarButton;
