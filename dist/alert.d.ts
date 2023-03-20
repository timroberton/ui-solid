import { JSX } from "solid-js";
type OpenAlertInput = {
    title?: string;
    text: string;
    intent?: "danger" | "success";
    closeButtonLabel?: string;
};
type OpenConfirmInput = {
    title?: string;
    text: string | JSX.Element;
    intent?: "danger" | "success";
    confirmButtonLabel?: string;
};
type OpenPromptInput = {
    initialInputText: string;
    title?: string;
    text?: string;
    inputLabel?: string;
    inputType?: JSX.InputHTMLAttributes<HTMLInputElement>["type"];
    intent?: "danger" | "success";
    saveButtonLabel?: string;
};
export type AlertComponentProps<TProps, TReturn> = TProps & {
    close: (p: TReturn | undefined) => void;
};
type OpenComponentInput<TProps, TReturn> = {
    elementProps: TProps;
    element: (p: AlertComponentProps<TProps, TReturn>) => JSX.Element;
};
export declare function openAlert(v: OpenAlertInput): Promise<void>;
export declare function openConfirm(v: OpenConfirmInput): Promise<boolean>;
export declare function openPrompt(v: OpenPromptInput): Promise<string | undefined>;
export declare function openComponent<TProps, TReturn>(v: OpenComponentInput<TProps, TReturn>): Promise<TReturn | undefined>;
export default function AlertProvider(props: {
    children: JSX.Element;
}): JSX.Element;
export {};
//# sourceMappingURL=alert.d.ts.map