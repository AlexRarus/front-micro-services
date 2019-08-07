import React, { Component } from 'react';
import { loadComponent } from './service';
import MessageComponent from './message-component';
import {
  FrontendMicroServiceExampleWrapper,
  Block,
  Paragraph
} from './style';

interface IProps {}
interface IState {}

class FrontendMicroServiceExample extends Component<IProps, IState> {
  render() {
    return (
      <FrontendMicroServiceExampleWrapper>
        <Block>
          <Paragraph>
            Компонент сервиса
          </Paragraph>
          <MessageComponent />
        </Block>
      </FrontendMicroServiceExampleWrapper>
    );
  }
}

export default loadComponent(FrontendMicroServiceExample);
