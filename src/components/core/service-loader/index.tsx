import React, { Component, createRef } from 'react';
import debounce from 'lodash/debounce';

import {
  ServiceLoaderWrapper,
  ServiceFrame
} from './style';

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

export class ServiceLoader extends Component<IProps, IState> {
  componentRef: any;
  frameRef: any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      initialized: false,
      height: 0,
      regExp: new RegExp('')
    };

    window.addEventListener('message', this.getMessage);
    this.componentRef = createRef();
    this.frameRef = createRef();
  }

  componentDidMount(): void {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount(): void {
    window.removeEventListener('message', this.getMessage);
    window.removeEventListener('resize', this.onResize);
  }

  onResize = debounce(() => {
    const componentMetrics = this.getMetrics();
    const payload = {
      width: componentMetrics.width
    };
    this.sendMessage({ type: 'resize', payload });
  }, 100);

  getMessage = (e: any) => {
    const { src } = this.props;
    const { initialized, regExp } = this.state;
    const { data, origin } = e;
    const targetRegExp: any = initialized
      ? regExp
      : new RegExp(`^${origin}`);

    // обрабатываем только сообщения для данного сервиса
    if (targetRegExp.test(src)) {
      try {
        const parsedData: any = JSON.parse(data);

        this.actionSwitcher(parsedData);
        if (!initialized) {
          this.setState({
            initialized: true,
            regExp: targetRegExp
          })
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  sendMessage = ({ type, payload = {} }: IMessageType) => {
    const data = {
      type,
      payload
    };
    const jsonData = JSON.stringify(data);
    const moduleFrame = this.frameRef.current;
    moduleFrame.contentWindow.postMessage(jsonData, '*');
  };

  getMetrics = () => {
    const component: any = this.componentRef.current;

    return component.getBoundingClientRect();
  };

  actionSwitcher = (data: any) => {
    const { type, payload }  = data;

    switch (type) {
      case 'init':
        payload && this.setState(payload);
        const componentMetrics = this.getMetrics();
        const initData = {
          width: componentMetrics.width
        };
        this.sendMessage({ type: 'init', payload: initData });
        break;
      case 'resize':
        this.setState(payload);
        break;
      default:
        break;
    }
  };

  render() {
    const { src, id } = this.props;
    const { height } = this.state;

    return (
      <ServiceLoaderWrapper ref={this.componentRef}>
        <ServiceFrame
          ref={this.frameRef}
          src={src}
          id={id}
          height={height}
          frameBorder="0"
          scrolling="no"
        />
      </ServiceLoaderWrapper>
    );
  }
}
