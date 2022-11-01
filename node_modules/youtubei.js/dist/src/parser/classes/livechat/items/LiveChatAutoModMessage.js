"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Text_1 = __importDefault(require("../../misc/Text"));
const index_1 = __importDefault(require("../../../index"));
const helpers_1 = require("../../../helpers");
const NavigationEndpoint_1 = __importDefault(require("../../NavigationEndpoint"));
const Button_1 = __importDefault(require("../../Button"));
class LiveChatAutoModMessage extends helpers_1.YTNode {
    constructor(data) {
        super();
        this.menu_endpoint = new NavigationEndpoint_1.default(data.contextMenuEndpoint);
        this.moderation_buttons = index_1.default.parseArray(data.moderationButtons, [Button_1.default]);
        this.auto_moderated_item = index_1.default.parse(data.autoModeratedItem);
        this.header_text = new Text_1.default(data.headerText);
        this.timestamp = Math.floor(parseInt(data.timestampUsec) / 1000);
        this.id = data.id;
    }
}
LiveChatAutoModMessage.type = 'LiveChatAutoModMessage';
exports.default = LiveChatAutoModMessage;
//# sourceMappingURL=LiveChatAutoModMessage.js.map