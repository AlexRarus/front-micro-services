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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var message_emitter_1 = require("../message-emitter");
var style_1 = require("./style");
var Service = /** @class */ (function () {
    function Service(config) {
        var _this = this;
        this.loaded = false;
        this.resizeWindow = function () { return __awaiter(_this, void 0, void 0, function () {
            var componentMetrics, payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.initDetect();
                        return [4 /*yield*/, this.getMetrics()];
                    case 1:
                        componentMetrics = _a.sent();
                        payload = {
                            height: componentMetrics.height
                        };
                        this.messageEmitter.submitMessage({
                            type: 'resize',
                            payload: payload
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        this.getMetrics = function () {
            _this.initDetect();
            var defaultBox = { height: 0 };
            var component = _this.targetComponent;
            return new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(component ? component.getBoundingClientRect() : defaultBox);
                }, 0);
            });
        };
        this.initDetect = function () {
            if (!_this.loaded) {
                throw new Error('module is not loaded');
            }
        };
        this.serviceId = config.serviceId;
        this.loadComponent = this.loadComponent.bind(this);
        this.messageEmitter = new message_emitter_1.MessageEmitter({
            sender: config.serviceId,
            receiver: 'parent'
        });
        this.subscribeOnMessages = this.messageEmitter.subscribeOnMessages;
        this.submitMessage = this.messageEmitter.submitMessage;
    }
    Service.prototype.loadComponent = function (TargetComponent) {
        if (!this.loaded) {
            this.loaded = true;
            var self_1 = this;
            var WrapperModule = /** @class */ (function (_super) {
                __extends(WrapperModule, _super);
                function WrapperModule(props) {
                    var _this = _super.call(this, props) || this;
                    _this.actionSwitcher = function (data) {
                        var type = data.type, payload = data.payload;
                        console.log('service-actionSwitcher: ', data);
                        switch (type) {
                            case 'init':
                                payload && _this.setState(payload);
                                self_1.resizeWindow();
                                break;
                            case 'resize':
                                _this.setState(payload);
                                break;
                            default:
                                break;
                        }
                    };
                    _this.componentRef = react_1.createRef();
                    self_1.messageEmitter.subscribeOnMessages(_this.actionSwitcher);
                    return _this;
                }
                WrapperModule.prototype.componentDidMount = function () {
                    self_1.targetComponent = this.componentRef.current;
                    self_1.messageEmitter.submitMessage({
                        type: 'init'
                    });
                };
                WrapperModule.prototype.componentWillUnmount = function () {
                    self_1.messageEmitter.destroy();
                };
                WrapperModule.prototype.render = function () {
                    return (react_1.default.createElement(style_1.ServiceWrapper, { ref: this.componentRef },
                        react_1.default.createElement(style_1.GlobalStyle, null),
                        react_1.default.createElement(TargetComponent, __assign({}, this.props))));
                };
                return WrapperModule;
            }(react_1.Component));
            return WrapperModule;
        }
        else {
            throw new Error('root component is already loaded');
        }
    };
    return Service;
}());
exports.Service = Service;
