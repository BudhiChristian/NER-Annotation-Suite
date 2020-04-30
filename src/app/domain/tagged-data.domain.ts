import { TagInfo } from './tag-info.domain';
import { EntityTag } from './entity-tag.domain';

export class TaggedData {
    private static count: number = 0;
    private __id: number;
    private __sentence: string;
    private __entities: TagInfo[];
    private __reviewed: boolean;

    public constructor(sentence: string) {
        TaggedData.count++;
        this.__id = TaggedData.count;
        this.__sentence = sentence;
        this.__entities = [];
        this.__reviewed = false;
    }

    get touched(): boolean {
        return this.__reviewed;
    }

    touch() {
        this.__reviewed = true;
    }

    untouch() {
        this.__reviewed = false;
    }

    get id(): number {
        return this.__id;
    }

    get sentence(): string {
        return this.__sentence;
    }

    get entities(): TagInfo[] {
        return this.__entities;
    }

    addEntity(tag: EntityTag, start: number, end: number, text: string) {
        this.__entities.push(new TagInfo(tag, start, end, text));
    }

    removeEntity(id: number) {
        this.__entities = this.__entities.filter(entity => entity.id != id);
    }

    getCharacterIndexEntity(idx): EntityTag {
        let matches = this.__entities.filter(entity => entity.start <= idx && entity.end >= idx)
        if (matches.length > 0) {
            return matches[0].tag
        }
        return undefined
    }
}