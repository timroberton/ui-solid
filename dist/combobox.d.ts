export declare function ComboBox<T>(p: {
    options: T[];
    optionValue: keyof T | ((option: T) => string | number);
    optionTextValue: keyof T | ((option: T) => string | number);
    optionLabel: keyof T | ((option: T) => string);
    optionDisabled: keyof T | ((option: T) => boolean);
    value: T;
    onChange: (v: T) => void;
    virtualized?: boolean;
    placeholder?: string;
}): import("solid-js").JSX.Element;
//# sourceMappingURL=combobox.d.ts.map