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
export declare class Service implements IService {
    private handlers;
    private loaded;
    private targetComponent;
    constructor();
    sendMessage: ({ type, payload }: IMessageType) => void;
    resizeWindow: () => Promise<void>;
    private getMetrics;
    subscribeOnMessage: (handler: (message: any) => any) => void;
    private initDetect;
    loadComponent<TProps>(TargetComponent: any): any;
}
export {};
