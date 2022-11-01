import Actions from '../../core/Actions';
import Button from '../classes/Button';
import { ParsedResponse } from '..';
import { ObservedArray, YTNode } from '../helpers';
declare class ItemMenu {
    #private;
    constructor(data: ParsedResponse, actions: Actions);
    selectItem(icon_type: string): Promise<ParsedResponse>;
    selectItem(button: Button): Promise<ParsedResponse>;
    items(): ObservedArray<YTNode>;
    page(): ParsedResponse;
}
export default ItemMenu;
