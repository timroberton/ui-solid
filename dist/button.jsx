import { __rest } from "tslib";
import { cva } from "class-variance-authority";
export var getClassesForButton = cva("inline-flex items-center justify-center whitespace-nowrap rounded border border-transparent font-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2", {
    variants: {
        intent: {
            primary: "bg-primary text-primary-content focus:ring-primary  hover:bg-primary-focus",
            secondary: "bg-secondary text-secondary-content focus:ring-secondary  hover:bg-secondary-focus",
            neutral: "bg-neutral text-neutral-content focus:ring-neutral  hover:bg-neutral-focus",
            success: "bg-success text-success-content focus:ring-success  hover:bg-success-focus",
            warning: "bg-warning text-warning-content focus:ring-warning  hover:bg-warning-focus",
            danger: "bg-error text-error-content focus:ring-error  hover:bg-error-focus",
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
export function Button(_a) {
    var extraClasses = _a.class, intent = _a.intent, size = _a.size, type = _a.type, props = __rest(_a, ["class", "intent", "size", "type"]);
    return (<button class={getClassesForButton({
            intent: intent,
            size: size,
            class: extraClasses,
        })} type={type !== null && type !== void 0 ? type : "button"} {...props}>
      {props.children}
    </button>);
}
//# sourceMappingURL=button.jsx.map