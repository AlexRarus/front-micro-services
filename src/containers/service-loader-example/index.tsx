import React, { Component } from 'react';
import { ServiceLoader } from 'components/core'
import MessageComponent from './message-component';
import {
  Wrapper,
  Block,
  Title,
  Paragraph,
  ServiceLoaderWrapper
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
          <ServiceLoaderWrapper>
            <ServiceLoader
              id="service-example"
              src="http://localhost:3333/service"
            />
          </ServiceLoaderWrapper>
        </Block>
      </Wrapper>
    );
  }
}
