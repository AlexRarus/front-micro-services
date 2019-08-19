import { Component } from 'react';
import { IMessageEmitter, IMessage } from '../message-emitter/interfaces';
interface IProps {
    id: string;
    src: string;
}
interface IState {
    initialized: boolean;
    height: number;
}
export declare class ServiceLoader extends Component<IProps, IState> {
    messageEmitter: IMessageEmitter;
    constructor(props: IProps);
    componentWillUnmount(): void;
    actionSwitcher: (data: IMessage) => void;
    render(): JSX.Element;
}
export {};
