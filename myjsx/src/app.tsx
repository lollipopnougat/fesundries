import { DOMcreateElement, DOMcreateFragment } from './jsxutils/jsxFactory';
import MyButton from "./mybutton";

const btn = MyButton();
console.log(btn);
document.querySelector('#app').appendChild(btn);
