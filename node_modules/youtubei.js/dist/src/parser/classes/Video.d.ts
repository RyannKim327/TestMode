import Text from './misc/Text';
import Author from './misc/Author';
import Menu from './menus/Menu';
import Thumbnail from './misc/Thumbnail';
import NavigationEndpoint from './NavigationEndpoint';
import { YTNode } from '../helpers';
declare class Video extends YTNode {
    static type: string;
    id: string;
    title: Text;
    description_snippet: Text | null;
    snippets: {
        text: Text;
        hover_text: Text;
    }[];
    thumbnails: Thumbnail[];
    thumbnail_overlays: import("../helpers").ObservedArray<YTNode>;
    rich_thumbnail: import("../helpers").SuperParsedResult<YTNode> | null;
    author: Author;
    endpoint: NavigationEndpoint;
    published: Text;
    view_count: Text;
    short_view_count: Text;
    upcoming: Date | undefined;
    duration: {
        text: string;
        seconds: number;
    };
    show_action_menu: boolean;
    is_watched: boolean;
    menu: Menu | null;
    constructor(data: any);
    get description(): string;
    get is_upcoming(): boolean | undefined;
    get best_thumbnail(): Thumbnail | undefined;
}
export default Video;
