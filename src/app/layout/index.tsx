import React, { Component } from 'react';
import { lazyInject } from 'dal/ioc';
import MenuComponent from 'components/common/menu';
import HeaderComponent from 'components/common/header';
import FooterComponent from 'components/common/footer';
import {
  LayoutWrapper,
  Content,
  SideBar,
  ContainerWrapper
} from './style';

import RoutingStore from '../store/routing';

interface IProps {
  children: any;
}

export default class Layout extends Component<IProps> {
  @lazyInject(RoutingStore) readonly routingStore: RoutingStore;

  render() {
    const { children } = this.props;
    const { menuItems } = this.routingStore;

    return (
      <LayoutWrapper>
        <HeaderComponent />
        <Content>
          <SideBar>
            <MenuComponent
              items={menuItems}
            />
          </SideBar>
          <ContainerWrapper>
            {children}
          </ContainerWrapper>
        </Content>
        <FooterComponent />
      </LayoutWrapper>
    );
  }
}
