import { __rest } from "tslib";
import { cva } from "class-variance-authority";
export var getClassesForInput = cva("block rounded border-base-300 text-base-content w-full", {
    variants: {
        intent: {
            primary: "focus:border-primary focus:ring-primary",
            secondary: "focus:border-secondary focus:ring-secondary",
            success: "focus:border-success focus:ring-success",
            warning: "focus:border-warning focus:ring-warning",
            error: "focus:border-error focus:ring-error",
        },
        size: {
            small: "text-sm py-1 px-2",
            medium: "text-base py-2 px-4",
        },
    },
    // compoundVariants: [
    //   { intent: "primary", size: "medium", className: "uppercase" },
    // ],
    defaultVariants: {
        intent: "primary",
        size: "medium",
    },
});
export function Input(_a) {
    var extraClasses = _a.class, intent = _a.intent, size = _a.size, type = _a.type, props = __rest(_a, ["class", "intent", "size", "type"]);
    return (<input class={getClassesForInput({
            intent: intent,
            size: size,
            class: extraClasses,
        })} type={type !== null && type !== void 0 ? type : "text"} {...props}/>);
}
export function InputWithLabel(_a) {
    var label = _a.label, rootId = _a.rootId, props = __rest(_a, ["label", "rootId"]);
    return (<div>
      <label html-for={rootId} class="mb-1 block text-sm text-base-content-lighter">
        {label}
      </label>
      <div class="">
        <Input name={rootId} {...props}/>
      </div>
    </div>);
}
//# sourceMappingURL=input.jsx.map