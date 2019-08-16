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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var core_1 = require("components/core");
var style_1 = require("./style");
var ServiceLoader = /** @class */ (function (_super) {
    __extends(ServiceLoader, _super);
    function ServiceLoader(props) {
        var _this = _super.call(this, props) || this;
        _this.actionSwitcher = function (data) {
            var type = data.type, payload = data.payload;
            switch (type) {
                case 'init':
                    payload && _this.setState(payload);
                    _this.messageEmitter.submitMessage({ type: 'init' });
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
            height: 0
        };
        _this.messageEmitter = new core_1.MessageEmitter({
            sender: props.id,
            receiver: props.id
        });
        _this.messageEmitter.subscribeOnMessages(_this.actionSwitcher);
        return _this;
    }
    ServiceLoader.prototype.componentWillUnmount = function () {
        this.messageEmitter.destroy();
    };
    ServiceLoader.prototype.render = function () {
        var _a = this.props, src = _a.src, id = _a.id;
        var height = this.state.height;
        return (react_1.default.createElement(style_1.ServiceLoaderWrapper, null,
            react_1.default.createElement(style_1.ServiceFrame, { src: src, id: id, name: id, height: height, frameBorder: "0" })));
    };
    return ServiceLoader;
}(react_1.Component));
exports.ServiceLoader = ServiceLoader;
