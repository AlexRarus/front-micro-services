import React, { Component } from 'react';
import { MessageEmitter, IMessageEmitter, IMessage } from 'components/core';

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

interface IProps {
  serviceId: string;
}

interface IState {
  value: string;
  incomingMessages: any[];
  sentMessages: any[];
}

const messageEmitter: IMessageEmitter = new MessageEmitter({
  sender: 'service-example',
  receiver: 'service-example'
});

export default class MessageComponent extends Component<IProps, IState> {
  state: IState = {
    value: '',
    incomingMessages: [],
    sentMessages: []
  };

  componentDidMount() {
    messageEmitter.subscribeOnMessages(this.getMessage);
  }

  componentWillUnmount() {
    messageEmitter.destroy();
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
      type: 'parent',
      payload: { value }
    };

    messageEmitter.submitMessage(message);

    this.setState({
      sentMessages: [...sentMessages, message],
      value: ''
    })
  };

  getMessage = (message: IMessage) => {
    const { incomingMessages } = this.state;

    this.setState({
      incomingMessages: [...incomingMessages, message]
    });
  };

  renderMessage = (message: any, index: number) => {
    return (
      <Message key={index}>
        {JSON.stringify(message)}
      </Message>
    );
  };

  render() {
    const { value, incomingMessages, sentMessages } = this.state;

    return (
      <MessageWrapper>
        <Row>
          <Input onChange={this.onChange} value={value} />
          <Button onClick={this.sendMessage}>Отправить сообщение сервису</Button>
        </Row>
        <Row>
          <SentMessagesList>
            <Label>Отправленные сообщения:</Label>
            {sentMessages.map(this.renderMessage)}
          </SentMessagesList>
          <IncomingMessagesList>
            <Label>Полученные сообщения:</Label>
            {incomingMessages.map(this.renderMessage)}
          </IncomingMessagesList>
        </Row>
      </MessageWrapper>
    );
  }
}
