import { VariantProps } from "class-variance-authority";
import { JSX } from "solid-js";
export declare const getClassesForInput: (props?: {
    intent?: "primary" | "secondary" | "success" | "warning" | "error";
} & import("class-variance-authority/dist/types").ClassProp) => string;
type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof getClassesForInput>;
export declare function Input({ class: extraClasses, intent, type, ...props }: InputProps): JSX.Element;
type InputWithLabelProps = InputProps & {
    rootId: string;
    label: string;
};
export declare function InputWithLabel({ label, rootId, ...props }: InputWithLabelProps): JSX.Element;
export {};
//# sourceMappingURL=input.d.ts.map