import styled from 'styled-components';

export const ItemWrapper: any = styled.div`
  display: block;

  a {
    display: block;
    padding: 15px 10px;
    color: black;
    text-decoration: none;
    border: none;
    outline: none;

    &:visited,
    &:active {
      color: black;
    }
    
    &:hover {
      color: black;
      background: #cba;
    }
  }
`;
