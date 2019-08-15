# Front-Micro-Services

The Front-Micro-Services library exported as a [UMD](https://github.com/umdjs/umd) module.

## Installation

Using npm:
```shell
$ npm i --save @truefalse/front-micro-services
```
## Components
```js
import {
  Service, // for module project
  ServiceLoader, // for parent project
  MessageEmitter // for sending and receiving messages between modules
} from '@truefalse/front-micro-services';
```

#### Service init
```js
import { Service } from '@truefalse/front-micro-services';

const config = {
  serviceId: 'my-service' // required
};

const myService = new Service(config);

myService.loadComponent(MyReactComponent); // load component as service
myService.resizeWindow(); // tell parent to resize
myService.submitMessage({ type: 'say', payload: 'hello' }); // submit custom message to parent
myService.subscribeOnMessages(handler); // subscribe on messages from parent
```

##### Service config
<table>
	<tr>
		<th>name</th>
		<th>type</th>
		<th>required</th>
		<th>description</th>
	</tr>
	<tr>
		<td>serviceId</td>
		<td>string</td>
		<td>true</td>
		<td>service id for sending and receiving messages</td>
	</tr>
</table>

##### Service methods
<table>
	<tr>
		<th>name</th>
		<th>params</th>
		<th>description</th>
	</tr>
	<tr>
		<td>loadComponent</td>
		<td>ReactComponent</td>
		<td>must be called to initialize the service</td>
	</tr>
	<tr>
		<td>resizeWindow</td>
		<td>-</td>
		<td>tell parent to resize window</td>
	</tr>
	<tr>
		<td>submitMessage</td>
		<td>message: { type: string, payload: any }</td>
		<td>submit custom message to parent</td>
	</tr>
	<tr>
		<td>subscribeOnMessages</td>
		<td>handler: (message: any) => any)</td>
		<td>subscribe on messages from parent</td>
	</tr>
</table>

#### ServiceLoader init
```js
import React from 'react';
import { ServiceLoader } from '@truefalse/front-micro-services';

const componnet = () => (
  <ServiceLoader
    id="my-service"
    src="http://my-service.com"
  />
);
```
##### ServiceLoader props
<table>
	<tr>
		<th>name</th>
		<th>type</th>
		<th>required</th>
		<th>description</th>
	</tr>
	<tr>
		<td>id</td>
		<td>string</td>
		<td>true</td>
		<td>service id for sending and receiving messages</td>
	</tr>
	<tr>
		<td>src</td>
		<td>string</td>
		<td>true</td>
		<td>Servise URL</td>
	</tr>
</table>

#### MessageEmitter init
```js
import React from 'react';
import { MessageEmitter } from '@truefalse/front-micro-services';

const config = {
  sender: 'service', // required
  receiver: 'parent', // required
};

const messageEmitter = new MessageEmitter(config);
```
##### MessageEmitter config
<table>
	<tr>
		<th>name</th>
		<th>type</th>
		<th>required</th>
		<th>default</th>
		<th>description</th>
	</tr>
	<tr>
		<td>sender</td>
		<td>string</td>
		<td>true</td>
		<td>-</td>
		<td>id for sending messages</td>
	</tr>
	<tr>
		<td>receiver</td>
		<td>string</td>
		<td>false</td>
		<td>'parent'</td>
		<td>id for receiving messages, if set 'parent' messages will be sent to the parent window</td>
	</tr>
	<tr>
		<td>allowedSenderIds</td>
		<td>string[]</td>
		<td>false</td>
		<td>[sender]</td>
		<td>list of allowed id for receiving messages</td>
	</tr>
</table>

##### MessageEmitter methods
<table>
	<tr>
		<th>name</th>
		<th>params</th>
		<th>description</th>
	</tr>
	<tr>
		<td>destroy</td>
		<td>-</td>
		<td>remove message event listener on window</td>
	</tr>
	<tr>
		<td>submitMessage</td>
		<td>message: { type: string, payload: any }</td>
		<td>submit custom message to `receiver`</td>
	</tr>
	<tr>
		<td>subscribeOnMessages</td>
		<td>handler: (message: any) => any)</td>
		<td>subscribe on messages from `allowedSenderIds`</td>
	</tr>
</table>

### Usage:
#### Create Service:
```js
// service.js
import { Service } from '@truefalse/front-micro-services';

const serviceOptions = {
  serviceId: 'service-example' // required
};

export const {
  loadComponent, // load component as service
  resizeWindow, // resizing a service window when resizing its content
  submitMessage, // send message to parent
  subscribeOnMessages // subscription to incoming messages
} = new Service({ serviceId: 'service-example' });
```

#### Load component
```jsx
// service application index.jsx
import React, { Component } from 'react';
import { loadComponent } from './service.js';
import Application from './application.jsx';
import {
  ServiceApplicationWrapper
} from './style';

class FrontendMicroServiceApp extends Component {
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

#### Use service's methods
```jsx
// application.jsx
import React, { Component } from 'react';
import { subscribeOnMessages, submitMessage, resizeWindow } from './service';
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
    subscribeOnMessages(this.getMessage); // subscription to incoming messages
  }

  onChange = (e) => {
    const target = e.target;
    const value = target.value;

    this.setState({
      value
    });
  };

  submitMessage = () => {
    const { value, sentMessages } = this.state;
    const message = {
      type: 'service',
      payload: { value }
    };

    submitMessage(message); // send message to parent

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
    const { value, incomingMessages, submitMessage } = this.state;

    return(
      <MessageWrapper>
        <Row>
          <Input onChange={this.onChange} value={value} />
          <Button onClick={this.submitMessage}>Send message to parent</Button>
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


#### Include service in parent

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
		  id="service-example"
		  src="http://service-example.com"
		/>
      </Wrapper>
    );
  }
}

```

#### Parent communication with the service

```jsx
// message-component.jsx
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

const messageEmitter: IMessageEmitter = new MessageEmitter({
  sender: 'service-example',
  receiver: 'service-example'
});

export default class MessageComponent extends Component {
  state = {
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

  onChange = (e) => {
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

