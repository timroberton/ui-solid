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
    name?: string;
};
export declare function Select<T extends string | number>(props: SelectProps<T>): JSX.Element;
type SelectWithLabelProps<T> = SelectProps<T> & {
    rootId: string;
    label: string;
};
export declare function SelectWithLabel<T extends string | number>({ label, rootId, ...props }: SelectWithLabelProps<T>): JSX.Element;
export {};
//# sourceMappingURL=select.d.ts.map