import 'reflect-metadata';
import { render } from 'react-dom';
import React from 'react';
import { Router } from 'react-router-dom';
import history from './history';
import Application from './app';
import FrontendMicroServiceExample from './frontend-micro-service-example';
import { inIframe } from './utils';

const rootElement: any = document.getElementById('root');

render(
  <Router history={history}>
    {inIframe() ? <FrontendMicroServiceExample /> : <Application />}
  </Router>,
  rootElement
);
