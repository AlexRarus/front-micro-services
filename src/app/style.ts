import styled, { createGlobalStyle } from 'styled-components';

export const ApplicationWrapper: any = styled.div`
  height: 100%;
`;

export const GlobalStyle: any = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  
  #root {
    height: 100%;
  }
`;
