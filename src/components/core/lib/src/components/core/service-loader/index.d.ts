/// <reference types="lodash" />
import { Component } from 'react';
interface IProps {
    id: string;
    src: string;
}
interface IState {
    initialized: boolean;
    height: number;
    regExp: any;
}
interface IMessageType {
    type: string;
    payload?: any;
}
export declare class ServiceLoader extends Component<IProps, IState> {
    componentRef: any;
    frameRef: any;
    constructor(props: IProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onResize: (() => void) & import("lodash").Cancelable;
    getMessage: (e: any) => void;
    sendMessage: ({ type, payload }: IMessageType) => void;
    getMetrics: () => any;
    actionSwitcher: (data: any) => void;
    render(): JSX.Element;
}
export {};
