export default class Span {
    public constructor(id: string, text: string) {
        this._id = id;
        this._text = text;
        this._instance = document.getElementById(this._id) as HTMLButtonElement;
        //console.log(this._instance);
        this.applyToInstance();
    }

    private _id: string;
    private _instance: HTMLButtonElement;
    private _text: string;
    
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
        this.applyToInstance();
    }


    private applyToInstance() {
        // this._instance.innerText = this._text;
        this._instance.innerText = this._text;
    }
}