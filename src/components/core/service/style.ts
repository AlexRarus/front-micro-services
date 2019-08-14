import styled, { createGlobalStyle } from 'styled-components';

export const ServiceWrapper: any = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
`;

export const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
`;
