import { createGlobalStyle } from 'styled-components';

import Reset from './Reset';
import Global from './Global';

const GlobalStyles = createGlobalStyle`
  ${Reset}
  ${Global}
`;

export default GlobalStyles;
