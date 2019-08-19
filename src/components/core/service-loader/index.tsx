import React, { Component } from 'react';

import { MessageEmitter } from '../message-emitter';
import { IMessageEmitter, IMessage } from '../message-emitter/interfaces';

import {
  ServiceLoaderWrapper,
  ServiceFrame
} from './style';

interface IProps {
  id: string;
  src: string;
}

interface IState {
  initialized: boolean;
  height: number;
}

export class ServiceLoader extends Component<IProps, IState> {
  messageEmitter: IMessageEmitter;

  constructor(props: IProps) {
    super(props);

    this.state = {
      initialized: false,
      height: 0
    };

    this.messageEmitter = new MessageEmitter({
      sender: props.id,
      receiver: props.id
    });
    this.messageEmitter.subscribeOnMessages(this.actionSwitcher);

  }

  componentWillUnmount(): void {
    this.messageEmitter.destroy();
  }

  actionSwitcher = (data: IMessage) => {
    const { type, payload }  = data;

    switch (type) {
      case 'init':
        payload && this.setState(payload);
        this.messageEmitter.submitMessage({ type: 'init' });
        break;
      case 'resize':
        this.setState(payload);
        break;
      default:
        break;
    }
  };

  render() {
    const { src, id } = this.props;
    const { height } = this.state;

    return (
      <ServiceLoaderWrapper>
        <ServiceFrame
          src={src}
          id={id}
          name={id}
          height={height}
          frameBorder="0"
        />
      </ServiceLoaderWrapper>
    );
  }
}
