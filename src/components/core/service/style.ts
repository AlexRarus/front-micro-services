import styled, { createGlobalStyle } from 'styled-components';

interface IServiceProps {
  width: number;
  isInit: boolean;
}

export const ServiceWrapper: any = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: ${({ width }: IServiceProps) => `${width}px`};
`;

export const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
`;
