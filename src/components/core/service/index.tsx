import React, { Component, createRef } from 'react';

import {
  ServiceWrapper,
  GlobalStyle
} from './style';

interface IState {
  width: number;
}

interface IMessageType {
  type: string;
  payload?: any;
}

interface MessageHandler {
  (message: any): any;
}

export interface IService {
  sendMessage: (message: IMessageType) => void;
  resizeWindow: () => any;
  subscribeOnMessage(handler: MessageHandler): any;
  loadComponent(ReactComponent: any): any;
}

export class Service implements IService {
  private handlers: any[] = [];
  private loaded: boolean = false;
  private targetComponent: any;

  constructor() {
    this.loadComponent = this.loadComponent.bind(this);
  }

  sendMessage = ({ type, payload = {} }: IMessageType) => {
    const data = {
      type,
      payload
    };
    const jsonData = JSON.stringify(data);
    window.parent.postMessage(jsonData, '*');
  };

  resizeWindow = async () => {
    this.initDetect();
    const componentMetrics: any = await this.getMetrics();
    const payload = {
      height: componentMetrics.height
    };
    this.sendMessage({ type: 'resize', payload });
  };

  private getMetrics = () => {
    this.initDetect();
    const defaultBox: any = { height: 0 };
    const component: any = this.targetComponent;

    return new Promise((resolve: any) => {
      setTimeout(() => {
        resolve(component ? component.getBoundingClientRect() : defaultBox);
      }, 0);
    });
  };

  subscribeOnMessage = (handler: (message: any) => any) => {
    this.handlers.push(handler);
  };

  private initDetect = () => {
    if (!this.loaded) {
      throw new Error('module is not loaded');
    }
  };

  loadComponent<TProps>(TargetComponent: any): any {
    if (!this.loaded) {
      this.loaded = true;
      const self = this;

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
          self.targetComponent = this.componentRef.current;
          self.sendMessage({ type: 'init' });
        }

        componentWillUnmount(): void {
          window.removeEventListener('message', this.getMessage);
        }

        getMessage = (e: any) => {
          try {
            const data: any = JSON.parse(e.data);

            this.actionSwitcher(data);
          } catch (error) {
            console.log(error);
          }
        };

        actionSwitcher = (data: any) => {
          const { type, payload }  = data;

          switch (type) {
            case 'init':
              payload && this.setState(payload);
              self.resizeWindow();
              break;
            case 'resize':
              this.setState(payload);
              break;
            default:
              break;
          }

          self.handlers.forEach((handler: any) => handler(data));
        };

        render() {
          const { width } = this.state;

          return (
            <ServiceWrapper
              width={width}
              ref={this.componentRef}
            >
              <GlobalStyle />
              <TargetComponent
                {...this.props}
              />
            </ServiceWrapper>
          );
        }
      }

      return WrapperModule;
    } else {
      throw new Error('root component is already loaded');
    }
  }
}
