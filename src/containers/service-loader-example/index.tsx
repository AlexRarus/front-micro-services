import React, { Component } from 'react';
import { ServiceLoader } from 'components/core'
import MessageComponent from './message-component';
import {
  Wrapper,
  Block,
  Title,
  Paragraph
} from './style';

interface IProps {}

export default class ServiceLoaderExample extends Component<IProps> {
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
          <ServiceLoader
            id="service-id"
            src="http://localhost:3333/service"
          />
        </Block>
      </Wrapper>
    );
  }
}
