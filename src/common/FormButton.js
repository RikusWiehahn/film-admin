import React from 'react';
import CLR from '../config/CLR';
import { Typography } from '@material-ui/core'
import styled from '@emotion/styled';

const FormButton = (props) => {
  return (
    <div style={{ paddingTop: 0, paddingLeft: 10, paddingRight: 10, paddingBottom: 10, display: 'flex' }}>
      <SignInButton onClick={() => props.onClick ? props.onClick() : null}>
        <Typography variant="button" style={{ color: CLR.WHITE }}>
          {props.label ? props.label : 'Button'}
        </Typography> 
      </SignInButton>
    </div>
  )
};

export default FormButton;

const SignInButton = styled.button(() => ({
  backgroundColor: CLR.BLACK, 
  borderWidth: 0, 
  height: 30, 
  flex: 1,
  outline: 'none',
  alignItems: 'center',
  ":hover": {
    backgroundColor: CLR.BLACK_ACTIVE,
    cursor: 'pointer',
  }
}));