export default class Div {
    public constructor(id: string, visiable = true, display = 'inline') {
        this._id = id;
        this._visiable = visiable;
        this._display = display;
        this._instance = document.getElementById(this._id) as HTMLButtonElement;
        console.log(this._instance);
        this.applyToInstance();
    }

    private _id: string;
    private _instance?: HTMLButtonElement;
    private _visiable: boolean = true;
    private _display: string;
    
    public get id() {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public set innerHtml(value: string) {
        this._instance!.innerHTML = value;
    }

    public get visiable(): boolean {
        return this._visiable;
    }
    public set visiable(value: boolean) {
        this._visiable = value;
        this.applyToInstance();
    }

    public toggleVisiable() {
        this._visiable = !this._visiable;
        this.applyToInstance();
    }

    private applyToInstance() {
        // this._instance.innerText = this._text;
        if(this._visiable) {
            this._instance!.style.display = this._display;
        }
        else {
            this._instance!.style.display = 'none';
        }
        console.log(`vis = ${this._visiable}, ${this._instance!.style.display}`);
    }
}