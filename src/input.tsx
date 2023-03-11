import { cva, VariantProps } from "class-variance-authority";
import { JSX } from "solid-js";

export const getClassesForInput = cva(
  "block rounded border-base-300 text-base-content px-4 w-full",
  {
    variants: {
      intent: {
        primary: "focus:border-primary focus:ring-primary",
        secondary: "focus:border-secondary focus:ring-secondary",
        success: "focus:border-success focus:ring-success",
        warning: "focus:border-warning focus:ring-warning",
        error: "focus:border-error focus:ring-error",
      },
    },
    // compoundVariants: [
    //   { intent: "primary", size: "medium", className: "uppercase" },
    // ],
    defaultVariants: {
      intent: "primary",
    },
  }
);

type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof getClassesForInput>;

export function Input({
  class: extraClasses,
  intent,
  type,
  ...props
}: InputProps) {
  return (
    <input
      class={getClassesForInput({
        intent,
        class: extraClasses,
      })}
      type={type ?? "text"}
      {...props}
    />
  );
}

type InputWithLabelProps = InputProps & { rootId: string; label: string };

export function InputWithLabel({
  label,
  rootId,
  ...props
}: InputWithLabelProps) {
  return (
    <div>
      <label
        html-for={rootId}
        class="mb-1 block text-sm text-base-content-lighter"
      >
        {label}
      </label>
      <div class="">
        <Input name={rootId} {...props} />
      </div>
    </div>
  );
}
