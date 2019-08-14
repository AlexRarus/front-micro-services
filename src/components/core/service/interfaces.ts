import {IMessage, IMessageEmitter, IMessageHandler} from "components/core";

export interface IServiceConfig {
  serviceId: string;
}

export interface IService {
  messageEmitter: IMessageEmitter;
  serviceId: string;
  resizeWindow: () => any;
  loadComponent(ReactComponent: any): any;
  subscribeOnMessages(handler: IMessageHandler): any;
  submitMessage(message: IMessage): any;
}
