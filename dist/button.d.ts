import { VariantProps } from "class-variance-authority";
import { JSX } from "solid-js";
import { type TablerIconsProps } from "@tabler/icons-solidjs";
export declare const getClassesForButton: (props?: {
    intent?: "primary" | "secondary" | "neutral" | "success" | "warning" | "danger";
    size?: "small" | "medium";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export declare const getClassesForIcon: (props?: {
    size?: "small" | "medium";
} & import("class-variance-authority/dist/types").ClassProp) => string;
type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof getClassesForButton> & {
    icon?: (props: TablerIconsProps) => JSX.Element;
    children: JSX.Element;
};
export declare function Button(props: ButtonProps): JSX.Element;
export {};
//# sourceMappingURL=button.d.ts.map