import { IMessageEmitter, IMessage, IMessageHandler } from 'components/core';
import { IService, IServiceConfig } from './interfaces';
export declare class Service implements IService {
    messageEmitter: IMessageEmitter;
    serviceId: string;
    private loaded;
    private targetComponent;
    subscribeOnMessages: (handler: IMessageHandler) => any;
    submitMessage: (message: IMessage) => any;
    constructor(config: IServiceConfig);
    resizeWindow: () => Promise<void>;
    private getMetrics;
    private initDetect;
    loadComponent<TProps>(TargetComponent: any): any;
}
