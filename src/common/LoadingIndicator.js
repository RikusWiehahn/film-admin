import React from 'react';
import { css } from '@emotion/core';
import { SyncLoader } from 'react-spinners';
import CLR from '../config/CLR';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: ${CLR.PRIMARY_COLOR};
`;

const LoadingIndicator = () => {
  return (
    <SyncLoader
      className={override}
      sizeUnit={"px"}
      size={30}
      color={CLR.PRIMARY_COLOR}
      loading
    />
  )
};

export default LoadingIndicator;