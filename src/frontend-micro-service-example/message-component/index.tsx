import React, { Component } from 'react';
import { subscribeOnMessage, sendMessage, resizeWindow } from '../service';
import {
  Label,
  MessageWrapper,
  ComingMessagesList,
  SentMessagesList,
  Message,
  Row,
  Input,
  Button
} from './style';

interface IProps {}

interface IState {
  value: string;
  comingMessages: any[];
  sentMessages: any[];
}

export default class MessageComponent extends Component<IProps, IState> {
  state: IState = {
    value: '',
    comingMessages: [],
    sentMessages: []
  };

  componentDidMount() {
    subscribeOnMessage(this.getMessage);
  }

  onChange = (e: any) => {
    const target = e.target;
    const value = target.value;

    this.setState({
      value
    });
  };

  sendMessage = () => {
    const { value, sentMessages } = this.state;
    const message: any = {
      type: 'service',
      payload: { value }
    };

    sendMessage(message);

    this.setState({
      sentMessages: [...sentMessages, message],
      value: ''
    })
  };

  getMessage = (message: any) => {
    const { comingMessages } = this.state;

    this.setState({
      comingMessages: [...comingMessages, message]
    })
  };

  resizeWindow = () => {
    resizeWindow();
  };

  renderMessages = (message: any, index: number) => {
    return (
      <Message key={index}>
        {JSON.stringify(message)}
      </Message>
    );
  };

  render() {
    const { value, comingMessages, sentMessages } = this.state;

    return(
      <MessageWrapper>
        <Row>
          <Input onChange={this.onChange} value={value} />
          <Button onClick={this.sendMessage}>Отправить сообщение родителю</Button>
          <Button onClick={this.resizeWindow}>resize window</Button>
        </Row>
        <Row>
          <SentMessagesList>
            <Label>Отправленные сообщения:</Label>
            {sentMessages.map(this.renderMessages)}
          </SentMessagesList>
          <ComingMessagesList>
            <Label>Полученные сообщения:</Label>
            {comingMessages.map(this.renderMessages)}
          </ComingMessagesList>
        </Row>
      </MessageWrapper>
    );
  }
}
