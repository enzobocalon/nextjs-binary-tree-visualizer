import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    height: 100vh;
    width: 100%;
    font-family: 'Noto Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
  }
`;