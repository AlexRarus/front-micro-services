import React, { Component, createRef } from 'react';

import {
  ModuleInnerWrapper,
  GlobalStyle
} from './style';

interface IState {
  width: number;
}

export function createModule<TProps>(TargetComponent: any) {
  const handlers: any[] = [];

  class WrapperModule extends Component<TProps, IState> {
    componentRef: any;

    constructor(props: TProps) {
      super(props);

      this.state = {
        width: 0
      };
      this.componentRef = createRef();
      window.addEventListener('message', this.getMessage);
    }

    componentDidMount(): void {
      const componentMetrics = this.getMetrics();
      const payload = {
        height: componentMetrics.height
      };
      this.sendMessage('init', payload);
    }

    componentWillUnmount(): void {
      window.removeEventListener('message', this.getMessage);
    }

    sendMessage = (type: string, payload: any = {}) => {
      const data = {
        type,
        payload
      };
      const jsonData = JSON.stringify(data);
      window.parent.postMessage(jsonData, '*');
    };

    getMessage = (e: any) => {
      try {
        const data: any = JSON.parse(e.data);

        this.actionSwitcher(data);
        handlers.forEach((handler: any) => handler(data));
      } catch (error) {
        console.log(error);
      }
    };

    actionSwitcher = (data: any) => {
      const { type, payload } = data;

      switch (type) {
        case 'init':
          this.setState(payload);
          break;
        case 'resize':
          this.setState(payload);
          break;
        default:
          break;
      }
    };

    resize = () => {
      const componentMetrics = this.getMetrics();
      const payload = {
        height: componentMetrics.height
      };
      this.sendMessage('resize', payload);
    };

    getMetrics = () => {
      const component: any = this.componentRef.current;

      return component.getBoundingClientRect();
    };

    subscribeOnMessage = (handler: (message: any) => any) => {
      handlers.push(handler);
    };

    render() {
      const { width } = this.state;

      return (
        <ModuleInnerWrapper width={width} ref={this.componentRef}>
          <GlobalStyle />
          <TargetComponent
            resize={this.resize}
            sibscribeOnMessage={this.subscribeOnMessage}
            sendMessage={this.sendMessage}
            {...this.props}
          />
        </ModuleInnerWrapper>
      );
    }
  }

  return WrapperModule;
}
