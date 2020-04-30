import { EntityTag } from './entity-tag.domain';

export class TagInfo {
    private static count: number = 0;
    private __id: number;

    private __tag: EntityTag;
    private __start: number;
    private __end: number;
    private __text: string;
    public constructor(tag: EntityTag, start: number, end: number, text: string) {
        TagInfo.count++;
        this.__id = TagInfo.count;
        this.__tag = tag;
        this.__start = start;
        this.__end = end;
        this.__text = text;
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

    get text(): string {
        return this.__text;
    }
}