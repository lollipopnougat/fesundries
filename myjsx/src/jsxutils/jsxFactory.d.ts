// --- jsxFactory.d.ts ---
declare namespace JSX {
    type Element = string;
    interface ElementAttributesProperty {
        props: any; // 明确使用哪个属性名用于属性类型检查
    }
    interface IntrinsicElements {
        button: {};
        [eleName: string]: any;
    }
}