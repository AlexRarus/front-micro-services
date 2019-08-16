import { IMessageEmitter, IMessageEmitterConfig, IMessageHandler, IMessage } from './interfaces';
export declare class MessageEmitter implements IMessageEmitter {
    sender: string;
    receiver: string;
    targetElement: any;
    handlers: IMessageHandler[];
    allowedSenderIds: string[];
    constructor(config: IMessageEmitterConfig);
    destroy: () => void;
    submitMessage: (message: IMessage) => void;
    subscribeOnMessages: (handler: IMessageHandler) => void;
    private setTargetElement;
    private getMessage;
}
