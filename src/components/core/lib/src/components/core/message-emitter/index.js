"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var MessageEmitter = /** @class */ (function () {
    function MessageEmitter(config) {
        var _this = this;
        this.handlers = [];
        this.destroy = function () {
            window.removeEventListener('message', _this.getMessage);
        };
        this.submitMessage = function (message) {
            if (!_this.targetElement) {
                _this.setTargetElement();
            }
            var data = __assign({ sender: _this.sender, receiver: _this.receiver }, message);
            var jsonData = JSON.stringify(data);
            _this.targetElement.postMessage(jsonData, '*');
        };
        this.subscribeOnMessages = function (handler) {
            _this.handlers.push(handler);
        };
        this.setTargetElement = function () {
            if (_this.receiver === 'parent') {
                _this.targetElement = window.parent;
                return;
            }
            var element = document.getElementById(_this.receiver);
            if (!element) {
                throw new Error("Cannot find element with id: " + _this.receiver);
            }
            if (element.tagName !== 'IFRAME') {
                element = element.querySelector('iframe');
            }
            if (!element) {
                throw new Error("Cannot find iframe inside element with id: " + _this.receiver);
            }
            _this.targetElement = element.contentWindow;
        };
        this.getMessage = function (e) {
            try {
                var data_1 = JSON.parse(e.data);
                if (_this.allowedSenderIds.includes(data_1.sender)) {
                    _this.handlers.forEach(function (handler) { return handler(data_1); });
                }
            }
            catch (error) {
                console.log(error);
            }
        };
        this.sender = config.sender;
        this.receiver = config.receiver || 'parent';
        // по-умолчанию обрабатывать сообщения только от отправителя с таким же id
        this.allowedSenderIds = config.allowedSenderIds || [this.sender];
        window.addEventListener('message', this.getMessage);
    }
    return MessageEmitter;
}());
exports.MessageEmitter = MessageEmitter;
