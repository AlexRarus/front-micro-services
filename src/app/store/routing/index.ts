import { computed } from 'mobx';
import { provide } from 'dal/ioc';

import {
  LazyHomeContainer,
  LazyServiceLoaderExampleContainer,
  LazyAboutContainer,
  LazyNotFoundContainer
} from 'src/routing/lazy-containers';

@provide.singleton
export default class RoutingStore {
  @computed public get routes() {
    return this._routes.filter((route: any) => !route.hide || !route.hide());
  }

  @computed public get menuItems() {
    return this._routes.filter((route: any) => !!route.menuTitle);
  }

  private _routes: any[] = [
    {
      path: '/',
      exact: true,
      component: LazyHomeContainer,
      menuTitle: 'Home'
    },
    {
      path: '/service-loader-example/',
      exact: true,
      component: LazyServiceLoaderExampleContainer,
      menuTitle: 'Service Loader Example'
    },
    {
      path: '/about/',
      exact: true,
      component: LazyAboutContainer,
      menuTitle: 'About'
    },
    {
      path: '*',
      exact: true,
      component: LazyNotFoundContainer
    }
  ];
}
