import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { colors } from '../styles/theme';

const NotFound = () => (
  <Styles>
    <h1>404 Page Not Found</h1>
    <p>We couldn&apos;t find the question.</p>
    <Link to="/">Back Home</Link>
  </Styles>
);

export default NotFound;

const Styles = styled.main`
  width: 30%;
  margin: 20px auto;

  p {
    margin-bottom: 8px;
  }
  a {
    color: ${colors.yellow};
  }
`;
