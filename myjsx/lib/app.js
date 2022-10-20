(() => {
  // src/jsxutils/jsxFactory.ts
  var entityMap = {
    "&": "amp",
    "<": "lt",
    ">": "gt",
    '"': "quot",
    "'": "#39",
    "/": "#x2F"
  };
  var escapeHtml = (str) => String(str).replace(/[&<>"'\/\\]/g, (s) => `&${entityMap[s]};`);
  var AttributeMapper = (val) => ({
    tabIndex: "tabindex",
    className: "class",
    readOnly: "readonly"
  })[val] || val;
  function DOMcreateElement(tag, attrs, ...children) {
    attrs = attrs || {};
    const stack = [...children];
    if (typeof tag === "function") {
      attrs.children = stack;
      return tag(attrs, stack);
    }
    const elm = document.createElement(tag);
    for (let [name, val] of Object.entries(attrs)) {
      name = escapeHtml(AttributeMapper(name));
      if (name.startsWith("on") && name.toLowerCase() in window) {
        elm.addEventListener(name.toLowerCase().substring(2), val);
      } else if (name === "ref") {
        val(elm);
      } else if (name === "style") {
        Object.assign(elm.style, val);
      } else if (val === true) {
        elm.setAttribute(name, name);
      } else if (val !== false && val != null) {
        elm.setAttribute(name, escapeHtml(val));
      } else if (val === false) {
        elm.removeAttribute(name);
      }
    }
    while (stack.length) {
      const child = stack.shift();
      if (!Array.isArray(child)) {
        elm.appendChild(
          child.nodeType == null ? document.createTextNode(child.toString()) : child
        );
      } else {
        stack.push(...child);
      }
    }
    return elm;
  }
  var DOMcreateFragment = (attrs, ...children) => {
    return DOMcreateElement("div", null, ...children);
  };

  // src/mybutton/index.tsx
  var MyButton = () => {
    return /* @__PURE__ */ DOMcreateElement(DOMcreateFragment, null, /* @__PURE__ */ DOMcreateElement("button", {
      className: "btn",
      onClick: () => {
        console.log("123");
      }
    }, "123"), /* @__PURE__ */ DOMcreateElement("p", null, "111"));
  };
  var mybutton_default = MyButton;

  // src/app.tsx
  var btn = mybutton_default();
  console.log(btn);
  document.querySelector("#app").appendChild(btn);
})();
