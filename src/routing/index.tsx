import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

interface IProps {
  routes: any[];
}

export default class RoutingComponent extends Component<IProps> {
  renderRoute = (route: any) => (
    <Route key={route.path} {...route} />
  );

  render() {
    const { routes } = this.props;

    return (
      <Switch>
        {routes.map(this.renderRoute)}
      </Switch>
    );
  }
}
