import React, { Component } from 'react';
import {
  HeaderWrapper
} from './style';

interface IProps {

}

export default class HeaderComponent extends Component<IProps> {
  render() {
    return (
      <HeaderWrapper>
        Front-micro-services
      </HeaderWrapper>
    );
  }
}
