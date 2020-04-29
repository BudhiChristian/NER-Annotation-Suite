export class TagInfo {
    private static count: number = 0;
    private __id: number;

    private __text: string;
    private __start: number;
    private __end: number;
    public constructor(text: string, start: number, end: number) {
        TagInfo.count++;
        this.__id = TagInfo.count;
        this.__text = text;
        this.__start = start;
        this.__end = end;
    }

    get id(): number {
        return this.__id;
    }

    get text(): string {
        return this.__text;
    }

    get start(): number {
        return this.__start;
    }

    get end(): number {
        return this.__end;
    }
}