import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import CLR from '../config/CLR';
import styled from '@emotion/styled';

class NavBarButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineColor: CLR.WHITE,
      activeColor: CLR.BLACK,
      inactiveColor: CLR.WHITE,
    }
  }

  componentDidMount() {
    if (!this.props.activeColor) return;
    if (!this.props.inactiveColor) return;
    const { activeColor, inactiveColor } = this.props;
    activeColor ? this.setState({ activeColor }) : this.setState({ activeColor: CLR.BLACK });
    inactiveColor ? this.setState({ inactiveColor, lineColor: inactiveColor }) : this.setState({ inactiveColor: CLR.WHITE });
  }

  showLogo = () => {
    if (this.props.logoComponent) {
      const Logo = this.props.logoComponent;
      return (
        <Logo
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
          variant="body2"
          style={{ 
            color: this.state.lineColor, 
            paddingLeft: '4px'
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
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  borderWidth: 0,
  outline: 'none',
  cursor: 'pointer',
  paddingTop: '10px',
  width: '200px',
  WebkitTapHighlightColor: 'transparent'
}));

export default NavBarButton;
