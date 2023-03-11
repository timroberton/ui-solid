import { JSX } from "solid-js";
type OpenAlertInput = {
    title?: string;
    text: string;
    intent?: "danger";
    closeButtonLabel?: string;
};
type OpenConfirmInput = {
    title?: string;
    text: string | JSX.Element;
    intent?: "danger";
    confirmButtonLabel?: string;
};
type OpenPromptInput = {
    initialInputText: string;
    title?: string;
    text?: string;
    inputLabel?: string;
    inputType?: JSX.InputHTMLAttributes<HTMLInputElement>["type"];
    intent?: "danger";
    saveButtonLabel?: string;
};
export type AlertComponentProps<TProps, TReturn> = TProps & {
    close: (p: TReturn | undefined) => void;
};
type OpenComponentInput<TProps, TReturn> = {
    elementProps: TProps;
    element: (p: AlertComponentProps<TProps, TReturn>) => JSX.Element;
};
export type AlertContext = {
    openAlert(v: OpenAlertInput): Promise<void>;
    openConfirm(v: OpenConfirmInput): Promise<boolean>;
    openPrompt(v: OpenPromptInput): Promise<string | undefined>;
    openComponent<TProps, TReturn>(v: OpenComponentInput<TProps, TReturn>): Promise<TReturn | undefined>;
};
export declare const Context: import("solid-js").Context<AlertContext>;
export default function AlertProvider(props: {
    children: JSX.Element;
}): JSX.Element;
export declare const useAlert: () => AlertContext;
export {};
//# sourceMappingURL=alert.d.ts.map