import Text from '../../misc/Text';
import { ObservedArray, YTNode } from '../../../helpers';
import NavigationEndpoint from '../../NavigationEndpoint';
import Button from '../../Button';
declare class LiveChatAutoModMessage extends YTNode {
    static type: string;
    auto_moderated_item: import("../../../helpers").SuperParsedResult<YTNode>;
    header_text: Text;
    menu_endpoint?: NavigationEndpoint;
    moderation_buttons: ObservedArray<Button>;
    timestamp: number;
    id: string;
    constructor(data: any);
}
export default LiveChatAutoModMessage;
