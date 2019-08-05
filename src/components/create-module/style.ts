import styled, { createGlobalStyle } from 'styled-components';

interface IModuleProps {
  width: number;
}

export const ModuleInnerWrapper: any = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: ${({ width }: IModuleProps) => `${width}px`};
`;

export const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
`;
