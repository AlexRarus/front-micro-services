import React, { Component } from 'react';
import {
  Wrapper,
  Title
} from './style';

interface IProps {

}

export default class AboutContainer extends Component<IProps> {
  render() {
    return (
      <Wrapper>
        <Title>
          About
        </Title>
      </Wrapper>
    );
  }
}
