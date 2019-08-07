import React, { Component } from 'react';
import MenuItem from './item';
import {
  MenuWrapper
} from './style';

interface IProps {
  items: any[];
}

export default class MenuComponent extends Component<IProps> {
  renderItem = (item: any) => (
    <MenuItem key={item.menuTitle} {...item} />
  );

  render() {
    const { items } = this.props;

    return (
      <MenuWrapper>
        {items.map(this.renderItem)}
      </MenuWrapper>
    );
  }
}
