# Front-Micro-Services

The Front-Micro-Services library exported as a [UMD](https://github.com/umdjs/umd) module.

## Installation

Using npm:
```shell
$ npm i --save @truefalse/front-micro-services
```
## Example Usage
Create Service:
```js
// service.js
import { Service } from '@truefalse/front-micro-services';

export const {
  loadComponent, // load component as service
  resizeWindow, // resizing a service window when resizing its content
  sendMessage, // send message to parent
  subscribeOnMessage // subscription to incoming messages
} = new Service();

```

Load component as service
```jsx
// service application index.jsx
import React, { Component } from 'react';
import { loadComponent } from './service.js';
import Application from './application.jsx';
import {
  ServiceApplicationWrapper
} from './style';

class FrontendMicroService extends Component {
  render() {
    return (
      <ServiceApplicationWrapper>
        <Application />
      </ServiceApplicationWrapper>
    );
  }
}

export default loadComponent(FrontendMicroService); // load component as service

```

Use service's hooks
```jsx
// application.jsx
import React, { Component } from 'react';
import { subscribeOnMessage, sendMessage, resizeWindow } from './service';
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

export default class Application extends Component {
  state = {
    value: '',
    incomingMessages: [],
    sentMessages: []
  };

  componentDidMount() {
    subscribeOnMessage(this.getMessage); // subscription to incoming messages
  }

  onChange = (e) => {
    const target = e.target;
    const value = target.value;

    this.setState({
      value
    });
  };

  sendMessage = () => {
    const { value, sentMessages } = this.state;
    const message = {
      type: 'service',
      payload: { value }
    };

    sendMessage(message); // send message to parent

    this.setState({
      sentMessages: [...sentMessages, message],
      value: ''
    })
  };

  getMessage = (message) => {
    const { incomingMessages } = this.state;

    this.setState({
      incomingMessages: [...incomingMessages, message]
    })
  };

  resizeWindow = () => {
    resizeWindow(); // resizing a service window when resizing its content
  };

  renderMessages = (message, index) => {
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
          <Button onClick={this.sendMessage}>Send message to parent</Button>
          <Button onClick={this.resizeWindow}>Resize window</Button>
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


```


Include service in parent

```jsx
import React, { Component } from 'react';
import { ServiceLoader } from '@truefalse/front-micro-services'
import MessageComponent from './message-component.jsx';
import {
  Wrapper,
  Block,
  Title,
  Paragraph
} from './style';

export default class ServiceLoaderExample extends Component {
  render() {
    return (
      <Wrapper>
        <Title>
          Service Loader Example:
        </Title>
        <Block>
          <Paragraph>
            Родительский компонент
          </Paragraph>
          <MessageComponent
            serviceId="service-id"
          />
        </Block>
        <ServiceLoader
          id="service-id"
          src="http://localhost:3333/service"
        />
      </Wrapper>
    );
  }
}

```

Parent communication with the service

```jsx
// message-component.jsx
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

export default class MessageComponent extends Component {
  state = {
    value: '',
    incomingMessages: [],
    sentMessages: []
  };

  componentDidMount() {
    window.addEventListener('message', this.getMessage); // subscribe on messages
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.getMessage); // unsubscribe
  }

  onChange = (e) => {
    const target = e.target;
    const value = target.value;

    this.setState({
      value
    });
  };

  sendMessage = () => {
    const { serviceId } = this.props;
    const { value, sentMessages } = this.state;
    const message = {
      type: 'parent',
      payload: { value }
    };
    const jsonData = JSON.stringify(message);
    const serviceFrame = document.getElementById(serviceId);

    serviceFrame && serviceFrame.contentWindow.postMessage(jsonData, '*'); // send message to service

    this.setState({
      sentMessages: [...sentMessages, message],
      value: ''
    })
  };

  getMessage = (event) => {
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

  renderMessages = (message, index) => {
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

```
