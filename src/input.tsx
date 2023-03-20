import { cva, VariantProps } from "class-variance-authority";
import { JSX } from "solid-js";

export const getClassesForInput = cva(
  "block rounded border-base-300 text-base-content w-full",
  {
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
  }
);

type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof getClassesForInput>;

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      class={getClassesForInput({
        intent: props.intent,
        size: props.size,
        class: props.class,
      })}
      type={props.type ?? "text"}
    />
  );
}

type InputWithLabelProps = InputProps & { rootId: string; label: string };

export function InputWithLabel(props: InputWithLabelProps) {
  return (
    <div>
      <label
        html-for={props.rootId}
        class="mb-1 block text-sm text-base-content-lighter"
      >
        {props.label}
      </label>
      <div class="">
        <Input name={props.rootId} {...props} />
      </div>
    </div>
  );
}
