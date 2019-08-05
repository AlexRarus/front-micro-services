import React, { Component, createRef } from 'react';
import debounce from 'lodash/debounce';

import {
  ModuleWrapper,
  ModuleFrame
} from './style';

interface IProps {
  name: string;
  moduleUrl: string;
}

interface IState {
  initialized: boolean;
  height: number;
  regExp: any;
}

export class ModuleInstance extends Component<IProps, IState> {
  componentRef: any;
  moduleRef: any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      initialized: false,
      height: 0,
      regExp: new RegExp('')
    };

    window.addEventListener('message', this.getMessage);
    this.componentRef = createRef();
    this.moduleRef = createRef();
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
    this.sendMessage('resize', payload);
  }, 100);

  getMessage = (e: any) => {
    const { moduleUrl } = this.props;
    const { initialized, regExp } = this.state;
    const { data, origin } = e;
    const targetRegExp: any = initialized
      ? regExp
      : new RegExp(`^${origin}`);

    // обрабатываем только сообщения для данного модуля
    if (targetRegExp.test(moduleUrl)) {
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

  sendMessage = (type: string, payload: any = {}) => {
    const data = {
      type,
      payload
    };
    const jsonData = JSON.stringify(data);
    const moduleFrame = this.moduleRef.current;
    moduleFrame.contentWindow.postMessage(jsonData, '*');
  };

  getMetrics = () => {
    const component: any = this.componentRef.current;

    return component.getBoundingClientRect();
  };

  actionSwitcher = (data: any) => {
    const { type, payload } = data;

    switch (type) {
      case 'init':
        this.setState(payload);
        const componentMetrics = this.getMetrics();
        const initData = {
          width: componentMetrics.width
        };
        this.sendMessage('init', initData);
        break;
      case 'resize':
        this.setState(payload);
        break;
      default:
        break;
    }
  };

  render() {
    const { moduleUrl, name } = this.props;
    const { height } = this.state;

    return (
      <ModuleWrapper ref={this.componentRef}>
        <ModuleFrame
          ref={this.moduleRef}
          src={moduleUrl}
          name={name}
          height={height}
          frameBorder="0"
          scrolling="no"
        />
      </ModuleWrapper>
    );
  }
}
