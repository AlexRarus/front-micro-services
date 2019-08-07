"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var debounce_1 = __importDefault(require("lodash/debounce"));
var style_1 = require("./style");
var ServiceLoader = /** @class */ (function (_super) {
    __extends(ServiceLoader, _super);
    function ServiceLoader(props) {
        var _this = _super.call(this, props) || this;
        _this.onResize = debounce_1.default(function () {
            var componentMetrics = _this.getMetrics();
            var payload = {
                width: componentMetrics.width
            };
            _this.sendMessage({ type: 'resize', payload: payload });
        }, 100);
        _this.getMessage = function (e) {
            var src = _this.props.src;
            var _a = _this.state, initialized = _a.initialized, regExp = _a.regExp;
            var data = e.data, origin = e.origin;
            var targetRegExp = initialized
                ? regExp
                : new RegExp("^" + origin);
            // обрабатываем только сообщения для данного сервиса
            if (targetRegExp.test(src)) {
                try {
                    var parsedData = JSON.parse(data);
                    _this.actionSwitcher(parsedData);
                    if (!initialized) {
                        _this.setState({
                            initialized: true,
                            regExp: targetRegExp
                        });
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
        };
        _this.sendMessage = function (_a) {
            var type = _a.type, _b = _a.payload, payload = _b === void 0 ? {} : _b;
            var data = {
                type: type,
                payload: payload
            };
            var jsonData = JSON.stringify(data);
            var moduleFrame = _this.frameRef.current;
            moduleFrame.contentWindow.postMessage(jsonData, '*');
        };
        _this.getMetrics = function () {
            var component = _this.componentRef.current;
            return component.getBoundingClientRect();
        };
        _this.actionSwitcher = function (data) {
            var type = data.type, payload = data.payload;
            switch (type) {
                case 'init':
                    payload && _this.setState(payload);
                    var componentMetrics = _this.getMetrics();
                    var initData = {
                        width: componentMetrics.width
                    };
                    _this.sendMessage({ type: 'init', payload: initData });
                    break;
                case 'resize':
                    _this.setState(payload);
                    break;
                default:
                    break;
            }
        };
        _this.state = {
            initialized: false,
            height: 0,
            regExp: new RegExp('')
        };
        window.addEventListener('message', _this.getMessage);
        _this.componentRef = react_1.createRef();
        _this.frameRef = react_1.createRef();
        return _this;
    }
    ServiceLoader.prototype.componentDidMount = function () {
        window.addEventListener('resize', this.onResize);
    };
    ServiceLoader.prototype.componentWillUnmount = function () {
        window.removeEventListener('message', this.getMessage);
        window.removeEventListener('resize', this.onResize);
    };
    ServiceLoader.prototype.render = function () {
        var _a = this.props, src = _a.src, id = _a.id;
        var height = this.state.height;
        return (react_1.default.createElement(style_1.ServiceLoaderWrapper, { ref: this.componentRef },
            react_1.default.createElement(style_1.ServiceFrame, { ref: this.frameRef, src: src, id: id, height: height, frameBorder: "0", scrolling: "no" })));
    };
    return ServiceLoader;
}(react_1.Component));
exports.ServiceLoader = ServiceLoader;
