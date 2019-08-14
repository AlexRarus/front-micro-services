export interface IMessageEmitterConfig {
  sender: string;
  receiver: string;
  allowedSenderIds?: string[];
}

export interface IMessageEmitter {
  sender: string;
  receiver: string;
  targetElement: any;
  handlers: IMessageHandler[];
  allowedSenderIds: string[];
  destroy: () => void;

  submitMessage: (message: IMessage) => any;
  subscribeOnMessages: (handler: IMessageHandler) => any;
}

export interface IMessage {
  type: string;
  payload?: any;
}

export interface IMessageHandler {
  (message: IMessage): any;
}
