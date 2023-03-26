import { cva, VariantProps } from "class-variance-authority";
import { JSX } from "solid-js";
import { type TablerIconsProps } from "@tabler/icons-solidjs";

export const getClassesForButton = cva(
  "inline-flex items-center align-middle justify-center whitespace-nowrap rounded border border-transparent font-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      intent: {
        primary:
          "bg-primary text-primary-content focus:ring-primary  hover:bg-primary-focus",
        secondary:
          "bg-secondary text-secondary-content focus:ring-secondary  hover:bg-secondary-focus",
        neutral:
          "bg-neutral text-neutral-content focus:ring-neutral  hover:bg-neutral-focus",
        success:
          "bg-success text-success-content focus:ring-success  hover:bg-success-focus",
        warning:
          "bg-warning text-warning-content focus:ring-warning  hover:bg-warning-focus",
        danger:
          "bg-error text-error-content focus:ring-error  hover:bg-error-focus",
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

export const getClassesForIcon = cva("inline-block", {
  variants: {
    size: {
      small: "h-4 w-4",
      medium: "h-6 w-6",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof getClassesForButton> & {
    icon?: (props: TablerIconsProps) => JSX.Element;
    children?: JSX.Element;
  };

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      class={getClassesForButton({
        intent: props.intent,
        size: props.size,
        class: props.class,
      })}
      type={props.type ?? "button"}
    >
      {props.icon && (
        <props.icon
          class={getClassesForIcon({
            size: props.size,
            class: props.children ? "mr-2" : undefined,
          })}
        />
      )}
      {props.children}
    </button>
  );
}

// export const getClassesForIconButton = cva(
//   "inline-flex items-center align-middle justify-center whitespace-nowrap rounded border border-transparent font-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
//   {
//     variants: {
//       intent: {
//         primary:
//           "bg-primary text-primary-content focus:ring-primary  hover:bg-primary-focus",
//         secondary:
//           "bg-secondary text-secondary-content focus:ring-secondary  hover:bg-secondary-focus",
//         neutral:
//           "bg-neutral text-neutral-content focus:ring-neutral  hover:bg-neutral-focus",
//         success:
//           "bg-success text-success-content focus:ring-success  hover:bg-success-focus",
//         warning:
//           "bg-warning text-warning-content focus:ring-warning  hover:bg-warning-focus",
//         danger:
//           "bg-error text-error-content focus:ring-error  hover:bg-error-focus",
//       },
//       size: {
//         small: "text-sm py-1 px-1",
//         medium: "text-base py-2 px-2",
//       },
//     },
//     // compoundVariants: [
//     //   { intent: "primary", size: "medium", className: "uppercase" },
//     // ],
//     defaultVariants: {
//       intent: "primary",
//       size: "medium",
//     },
//   }
// );

// type IconButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> &
//   VariantProps<typeof getClassesForIconButton> & {
//     icon: (props: TablerIconsProps) => JSX.Element;
//   };

// export function IconButton(props: IconButtonProps) {
//   return (
//     <button
//       {...props}
//       class={getClassesForIconButton({
//         intent: props.intent,
//         size: props.size,
//         class: props.class,
//       })}
//       type={props.type ?? "button"}
//     >
//       <props.icon
//         class={getClassesForIcon({
//           size: props.size,
//         })}
//       />
//     </button>
//   );
// }
