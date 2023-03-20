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
export function Input(props) {
    var _a;
    return (<input {...props} class={getClassesForInput({
            intent: props.intent,
            size: props.size,
            class: props.class,
        })} type={(_a = props.type) !== null && _a !== void 0 ? _a : "text"}/>);
}
export function InputWithLabel(props) {
    return (<div>
      <label html-for={props.rootId} class="mb-1 block text-sm text-base-content-lighter">
        {props.label}
      </label>
      <div class="">
        <Input name={props.rootId} {...props}/>
      </div>
    </div>);
}
//# sourceMappingURL=input.jsx.map