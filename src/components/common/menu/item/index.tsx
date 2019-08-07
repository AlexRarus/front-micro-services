import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  ItemWrapper
} from './style';

interface IProps {
  path: string;
  menuTitle: string;
}

export default class MenuItem extends Component<IProps> {
  render() {
    const { path, menuTitle } = this.props;

    return (
      <ItemWrapper>
        <Link to={path}>{menuTitle}</Link>
      </ItemWrapper>
    );
  }
}
