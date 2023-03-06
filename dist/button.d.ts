import { VariantProps } from "class-variance-authority";
import { JSX } from "solid-js";
export declare const getClassesForButton: (props?: {
    intent?: "primary" | "secondary" | "neutral" | "success" | "warning" | "danger";
    size?: "small" | "medium";
    margin?: "left" | "right";
} & import("class-variance-authority/dist/types").ClassProp) => string;
type ButtonProps = JSX.HTMLAttributes<HTMLButtonElement> & VariantProps<typeof getClassesForButton> & {
    children: JSX.Element;
};
export declare function Button({ class: extraClasses, intent, size, margin, ...props }: ButtonProps): JSX.Element;
export {};
//# sourceMappingURL=button.d.ts.map