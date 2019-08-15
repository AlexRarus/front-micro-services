import {
  IMessageEmitter,
  IMessageEmitterConfig,
  IMessageHandler,
  IMessage
} from './interfaces';

export class MessageEmitter implements IMessageEmitter {
  public sender: string;
  public receiver: string;
  public targetElement: any;
  public handlers: IMessageHandler[] = [];
  public allowedSenderIds: string[];

  constructor(config: IMessageEmitterConfig) {
    this.sender = config.sender;
    this.receiver = config.receiver || 'parent';
    // по-умолчанию обрабатывать сообщения только от отправителя с таким же id
    this.allowedSenderIds = config.allowedSenderIds || [this.sender];

    window.addEventListener('message', this.getMessage);
  }

  public destroy = () => {
    window.removeEventListener('message', this.getMessage);
  };

  public submitMessage = (message: IMessage): void => {
    if (!this.targetElement) {
      this.setTargetElement();
    }
    const data: any = {
      sender: this.sender,
      receiver: this.receiver,
      ...message
    };
    const jsonData: string = JSON.stringify(data);
    this.targetElement.postMessage(jsonData, '*');
  };

  public subscribeOnMessages = (handler: IMessageHandler) => {
    this.handlers.push(handler);
  };

  private setTargetElement = () => {
    if (this.receiver === 'parent') {
      this.targetElement = window.parent;
      return;
    }

    let element: any = document.getElementById(this.receiver);

    if (!element) {
      throw new Error(`Cannot find element with id: ${this.receiver}`);
    }

    if (element.tagName !== 'IFRAME') {
      element = element.querySelector('iframe');
    }

    if (!element) {
      throw new Error(`Cannot find iframe inside element with id: ${this.receiver}`);
    }

    this.targetElement = element.contentWindow;
  };

  private getMessage = (e: any) => {
    try {
      const data: any = JSON.parse(e.data);

      if (this.allowedSenderIds.includes(data.sender)) {
        this.handlers.forEach((handler: IMessageHandler) => handler(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
}
