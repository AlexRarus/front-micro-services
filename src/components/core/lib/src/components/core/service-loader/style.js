"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = __importDefault(require("styled-components"));
exports.ServiceLoaderWrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  box-sizing: border-box;\n"], ["\n  box-sizing: border-box;\n"])));
exports.ServiceFrame = styled_components_1.default.iframe(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: block;\n  border: none;\n  outline: none;\n  height: ", ";\n  width: 100%;\n"], ["\n  display: block;\n  border: none;\n  outline: none;\n  height: ", ";\n  width: 100%;\n"])), function (_a) {
    var height = _a.height;
    return "" + (height ? height + "px" : 'auto');
});
var templateObject_1, templateObject_2;
