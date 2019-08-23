import styled, { createGlobalStyle } from 'styled-components';

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

export const FrontendMicroServiceExampleWrapper: any = styled.div`
  height: 100%;
`;

export const Block: any = styled.div`
  border: 1px solid grey;
  border-radius: 2px;
  padding: 10px;
`;

export const Title: any = styled.div`
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
`;

export const Paragraph: any = styled.div`
  font-size: 14px;
  padding: 5px 0;
`;
