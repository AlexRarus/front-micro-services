import React, { Component } from 'react';
import { lazyInject } from 'dal/ioc';
import RoutingStore from './store/routing';
import Routing from 'src/routing';
import Layout from './layout';
import {
  ApplicationWrapper,
  GlobalStyle
} from './style';

export default class Application extends Component<{}> {
  @lazyInject(RoutingStore) readonly routingStore: RoutingStore;

  render() {
    const { routes } = this.routingStore;

    return (
      <ApplicationWrapper>
        <GlobalStyle />
        <Layout>
          <Routing routes={routes} />
        </Layout>
      </ApplicationWrapper>
    );
  }
}
