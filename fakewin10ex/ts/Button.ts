export default class Button {
    public constructor(id: string, text: string, onclick: () => void) {
        this._id = id;
        this._text = text;
        this._onclick = onclick;
        this._instance = document.getElementById(this._id) as HTMLButtonElement;
        console.log(this._instance);
        this.applyToInstance();
    }

    private _id: string;
    private _text: string;

    private _onclick: () => void;
    private _instance: HTMLButtonElement;
    public get id() {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get text(): string {
        return this._text;
    }

    public set text(value: string) {
        this._text = value;
    }

    public set onClick(value: () => void) {
        this._onclick = value;
    }

    private applyToInstance() {
        this._instance.onclick = this._onclick;
        if(this._text != '<nope>') {
            this._instance.innerText = this._text;
        }
    }



}