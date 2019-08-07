import React, { Component } from 'react';
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

export default class MessageComponent extends Component<IProps, IState> {
  state: IState = {
    value: '',
    incomingMessages: [],
    sentMessages: []
  };

  componentDidMount() {
    window.addEventListener('message', this.getMessage);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.getMessage);
  }

  onChange = (e: any) => {
    const target = e.target;
    const value = target.value;

    this.setState({
      value
    });
  };

  sendMessage = () => {
    const { serviceId } = this.props;
    const { value, sentMessages } = this.state;
    const message: any = {
      type: 'parent',
      payload: { value }
    };
    const jsonData: string = JSON.stringify(message);
    const serviceFrame: any = document.getElementById(serviceId);

    serviceFrame && serviceFrame.contentWindow.postMessage(jsonData, '*');

    this.setState({
      sentMessages: [...sentMessages, message],
      value: ''
    })
  };

  getMessage = (event: any) => {
    const { data } = event;
    const { incomingMessages } = this.state;

    try {
      const parsedData: any = JSON.parse(data);

      this.setState({
        incomingMessages: [...incomingMessages, parsedData]
      });
    } catch (error) {
      console.log(error);
    }
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
          <Button onClick={this.sendMessage}>Отправить сообщение сервису</Button>
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
