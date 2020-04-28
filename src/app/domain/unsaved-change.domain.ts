export class UnsavedChange {
    private __hasUnsavedchanges: boolean;
    private __customTitle: string;
    private __customMessage: string;
    private __onAnswer: (boolean) => void;
    constructor(hasUnsavedchanges: boolean, options?: { customTitle?: string, customMessage?: string, onAnswer?: (boolean) => void }) {
        this.__hasUnsavedchanges = hasUnsavedchanges;
        if (options) {
            this.__customTitle = options.customTitle;
            this.__customMessage = options.customMessage;
            this.__onAnswer = options.onAnswer;
        }
    }
    get hasUnsavedchanges(): boolean {
        return this.__hasUnsavedchanges;
    }
    get customTitle(): string {
        return this.__customTitle;
    }
    get customMessage(): string {
        return this.__customMessage;
    }
    get onAnswer(): (boolean) => void {
        return this.__onAnswer;
    }
}