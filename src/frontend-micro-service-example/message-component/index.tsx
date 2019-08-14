import React, { Component } from 'react';
import { resizeWindow, subscribeOnMessages, submitMessage } from '../service';

import {
  Label,
  MessageWrapper,
  IncomingMessagesList,
  SentMessagesList,
  Message,
  Row,
  Input,
  Button
} from './style';

interface IProps {}

interface IState {
  value: string;
  incomingMessages: any[];
  sentMessages: any[];
}

export default class MessageComponent extends Component<IProps, IState> {
  state: IState = {
    value: '',
    incomingMessages: [],
    sentMessages: []
  };

  componentDidMount() {
    subscribeOnMessages(this.getMessage);
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

    submitMessage(message);

    this.setState({
      sentMessages: [...sentMessages, message],
      value: ''
    })
  };

  getMessage = (message: any) => {
    const { incomingMessages } = this.state;

    this.setState({
      incomingMessages: [...incomingMessages, message]
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
    const { value, incomingMessages, sentMessages } = this.state;

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
          <IncomingMessagesList>
            <Label>Полученные сообщения:</Label>
            {incomingMessages.map(this.renderMessages)}
          </IncomingMessagesList>
        </Row>
      </MessageWrapper>
    );
  }
}
