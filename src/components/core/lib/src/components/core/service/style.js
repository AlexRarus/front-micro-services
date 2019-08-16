"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = __importStar(require("styled-components"));
exports.ServiceWrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  box-sizing: border-box;\n  position: absolute;\n  width: 100%;\n"], ["\n  box-sizing: border-box;\n  position: absolute;\n  width: 100%;\n"])));
exports.GlobalStyle = styled_components_1.createGlobalStyle(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  html, body {\n    height: 100%;\n    margin: 0;\n    padding: 0;\n  }\n"], ["\n  html, body {\n    height: 100%;\n    margin: 0;\n    padding: 0;\n  }\n"])));
var templateObject_1, templateObject_2;
