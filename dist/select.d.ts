import { VariantProps } from "class-variance-authority";
import { JSX } from "solid-js";
export declare const getClassesForSelect: (props?: {
    intent?: "primary" | "secondary" | "success" | "warning" | "error";
} & import("class-variance-authority/dist/types").ClassProp) => string;
type SelectProps<T> = VariantProps<typeof getClassesForSelect> & {
    selected: T;
    options: {
        key: T;
        text: string;
    }[];
    onChange: (v: T) => void;
    label?: string;
    class?: string;
};
export declare function Select<T extends string | number>(props: SelectProps<T>): JSX.Element;
export {};
//# sourceMappingURL=select.d.ts.map