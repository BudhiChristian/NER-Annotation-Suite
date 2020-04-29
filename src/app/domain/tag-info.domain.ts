import { EntityTag } from './entity-tag.domain';

export class TagInfo {
    private static count: number = 0;
    private __id: number;

    private __tag: EntityTag;
    private __start: number;
    private __end: number;
    public constructor(text: EntityTag, start: number, end: number) {
        TagInfo.count++;
        this.__id = TagInfo.count;
        this.__tag = text;
        this.__start = start;
        this.__end = end;
    }

    get id(): number {
        return this.__id;
    }

    get tag(): EntityTag {
        return this.__tag;
    }

    get start(): number {
        return this.__start;
    }

    get end(): number {
        return this.__end;
    }
}