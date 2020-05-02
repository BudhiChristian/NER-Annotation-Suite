import { BehaviorSubject } from 'rxjs';

export class EntityTag {
    private static count = 0;
    public id: number;
    private __name: string;
    private __color: string;
    private __contrastColor: string;

    public changed: BehaviorSubject<void>  = new BehaviorSubject<void>(null);
    
    public constructor(name: string, color: string) {
        EntityTag.count ++;
        this.id = EntityTag.count
        this.__name = name;
        this.color = color;
    }

    get name(): string {
        return this.__name;
    }

    set name(val: string) {
        this.__name = val;
        this.changed.next();
    }

    get color(): string {
        return this.__color;
    }

    set color(val: string) {
        this.__color = val;
        let r = this.getColorCalc(1);
        let g = this.getColorCalc(3);
        let b = this.getColorCalc(5);

        let luminance = (0.2126*r) + (0.7152*g) + (0.0722*b);
        let lightContrast = this.getContrast(luminance, 1);
        let darkContrast = this.getContrast(luminance, 0);

        this.__contrastColor = (lightContrast > darkContrast) ? '#ffffff' : '#000000';
        this.changed.next();
    }

    get contrastColor(): string {
        return this.__contrastColor;
    }

    private getContrast(back: number, front: number) {
        let b = back+0.05;
        let f = front+0.05;
        return Math.max(b, f)/Math.min(b, f);
    }

    private getColorCalc(start: number) {
        let c = parseInt('0x'+this.__color.substr(start,2))/255;
        if(c < 0.03928) {
            return c/12.92;
        }
        return Math.pow((c+0.055)/1.055, 2.4);
    }
}