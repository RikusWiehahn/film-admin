import React from 'react';
import styled from '@emotion/styled';
import CLR from '../config/CLR';

const Card = (props) => {
  return (
    <CardContainer onClick={() => props.onClick ? props.onClick() : null}>
      {props.children}
    </CardContainer>
  )
}

export default Card;

const CardContainer = styled('div')({
  backgroundColor: CLR.WHITE,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'column',
  borderWidth: '0.5px',
  borderStyle: 'solid',
  borderColor: CLR.SURFACE_ACTIVE,
  borderRadius: '10px',
  padding: '10px',
  margin: '10px',
  ":hover": {
    backgroundColor: CLR.WHITE,
    padding: '10px',
    margin: '10px',
    borderStyle: 'solid',
    borderWidth: '0.5px',
    borderColor: CLR.PRIMARY_COLOR,
    boxShadow: '0.5px 0.5px 0.5px rgba(2,2,5,0.35)',
    cursor: 'pointer',
  },
  ":active": {
    borderStyle: 'solid',
    borderWidth: '0.5px',
    borderColor: CLR.PRIMARY_COLOR,
    padding: '10px',
    margin: '10px',
    boxShadow: '0.5px 0.5px 0.5px rgba(2,2,5,0.35)',
    cursor: 'pointer',
  }
});