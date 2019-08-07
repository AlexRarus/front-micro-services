import React, { Component } from 'react';
import {
  Wrapper,
  Title,
  Paragraph
} from './style';

interface IProps {

}

export default class HomeContainer extends Component<IProps> {
  render() {
    return (
      <Wrapper>
        <Title>
          Front-micro-services
        </Title>
        <Paragraph>
          The Micro-services library exported as a UMD module.
        </Paragraph>
      </Wrapper>
    );
  }
}
