import styled from 'styled-components';

interface IFrameProps {
  height: number;
}

export const ServiceLoaderWrapper: any = styled.div`
  box-sizing: border-box;
`;

export const ServiceFrame: any = styled.iframe`
  display: block;
  border: none;
  outline: none;
  height: ${({ height }: IFrameProps) => `${height ? `${height}px` : 'auto'}`};
  width: 100%;
`;