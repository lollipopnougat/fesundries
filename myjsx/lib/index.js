import { DOMcreateElement, DOMcreateFragment } from "../jsxutils/jsxFactory";
const MyButton = () => {
  return /* @__PURE__ */ DOMcreateElement(DOMcreateFragment, null, /* @__PURE__ */ DOMcreateElement("button", {
    onClick: "()=>{console.log('123)}"
  }, "123"), /* @__PURE__ */ DOMcreateElement("p", null, "111"));
};
export default MyButton;
