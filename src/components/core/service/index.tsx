import React, { Component, createRef } from 'react';

import { MessageEmitter } from '../message-emitter';
import { IMessageEmitter, IMessage, IMessageHandler } from '../message-emitter/interfaces';

import { IService, IServiceConfig } from './interfaces';
import {
  ServiceWrapper,
  GlobalStyle
} from './style';

interface IState {}

export class Service implements IService {
  public messageEmitter: IMessageEmitter;
  public serviceId: string;
  private loaded: boolean = false;
  private targetComponent: any;
  public subscribeOnMessages: (handler: IMessageHandler) => any;
  public submitMessage: (message: IMessage) => any;

  constructor(config: IServiceConfig) {
    this.serviceId = config.serviceId;
    this.loadComponent = this.loadComponent.bind(this);
    this.messageEmitter = new MessageEmitter({
      sender: config.serviceId,
      receiver: 'parent'
    });
    this.subscribeOnMessages = this.messageEmitter.subscribeOnMessages;
    this.submitMessage = this.messageEmitter.submitMessage;
  }

  resizeWindow = async () => {
    this.initDetect();
    const componentMetrics: any = await this.getMetrics();
    const payload = {
      height: componentMetrics.height
    };
    this.messageEmitter.submitMessage({
      type: 'resize',
      payload
    });
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

          this.componentRef = createRef();
          self.messageEmitter.subscribeOnMessages(this.actionSwitcher);
        }

        componentDidMount(): void {
          self.targetComponent = this.componentRef.current;
          self.messageEmitter.submitMessage({
            type: 'init'
          });
        }

        componentWillUnmount() {
          self.messageEmitter.destroy();
        }

        actionSwitcher = (data: IMessage) => {
          const { type, payload }  = data;

          console.log('service-actionSwitcher: ', data);

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
        };

        render() {

          return (
            <ServiceWrapper
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
