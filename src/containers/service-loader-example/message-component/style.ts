import styled from 'styled-components';

export const Label: any = styled.div`
  font-size: 18px;
  font-weigh: bold;
`;

export const MessageWrapper: any = styled.div`
  display: flex;
  flex-direction: column;
`;

export const IncomingMessagesList: any = styled.div`
  display: flex;
  flex-direction: column;
  background: white; 
  color: black;
`;

export const SentMessagesList: any = styled.div`
  display: flex;
  flex-direction: column;
  background: black; 
  color: white;
  margin-right: 10px;
`;

export const Message: any = styled.div`
  padding: 10px;
  margin-bottom: 2px;
`;

export const Row: any = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 0;
`;

export const Input: any = styled.input`
  font-size: 14px;
  margin-right: 10px;
`;

export const Button: any = styled.div`
  border: 1px solid black;
  border-radius: 2px;
  padding: 5px;
  cursor: pointer;
  user-select: none;
  margin-right: 10px;
`;
