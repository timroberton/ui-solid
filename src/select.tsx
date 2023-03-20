import { cva, VariantProps } from "class-variance-authority";
import {
  HeadlessDisclosureChild,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "solid-headless";
import { For, JSX } from "solid-js";

export const getClassesForSelect = cva(
  "block rounded border border-base-300 focus-visible:ring-1 text-base-content cursor-pointer bg-white text-base py-2 pl-4 pr-10 text-left focus:outline-none w-full",
  {
    variants: {
      intent: {
        primary: "focus-visible:border-primary focus-visible:ring-primary",
        secondary:
          "focus-visible:border-secondary focus-visible:ring-secondary",
        success: "focus-visible:border-success focus-visible:ring-success",
        warning: "focus-visible:border-warning focus-visible:ring-warning",
        error: "focus-visible:border-error focus-visible:ring-error",
      },
    },
    // compoundVariants: [
    //   { intent: "primary", size: "medium", class: "uppercase" },
    // ],
    defaultVariants: {
      intent: "primary",
    },
  }
);

type SelectProps<T> = VariantProps<typeof getClassesForSelect> & {
  selected: T;
  options: { key: T; text: string }[];
  onChange: (v: T) => void;
  label?: string;
  class?: string;
  name?: string;
};

export function Select<T extends string | number>(props: SelectProps<T>) {
  const selectedFull = () =>
    props.options.find((a) => a.key === props.selected);

  return (
    <Listbox
      defaultOpen={false}
      value={props.selected}
      onSelectChange={props.onChange}
    >
      <div class={`relative w-full ${props.class}`}>
        <ListboxButton
          class={getClassesForSelect({
            intent: props.intent,
          })}
          name={props.name}
          type="button"
        >
          <span class="block truncate">{selectedFull()?.text}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon class="text-gray-400 h-5 w-5" aria-hidden="true" />
          </span>
        </ListboxButton>
        <HeadlessDisclosureChild>
          {({ isOpen }) => (
            <Transition
              show={isOpen()}
              enter="transition ease-in duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-out duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base text-base-content shadow-lg ring-1 ring-black ring-opacity-5">
                <For each={props.options}>
                  {(opt) => (
                    <ListboxOption
                      class="group focus:outline-none"
                      value={opt.key}
                    >
                      {({ isActive, isSelected }) => (
                        <div
                          class={`${
                            isActive() ? "bg-base-200" : "hover:bg-base-200"
                          } relative cursor-pointer select-none py-2 pl-10 pr-4`}
                        >
                          <span class="block truncate">{opt.text}</span>
                          {isSelected() ? (
                            <span class="absolute inset-y-0 left-0 flex items-center pl-4">
                              <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </div>
                      )}
                    </ListboxOption>
                  )}
                </For>
              </ListboxOptions>
            </Transition>
          )}
        </HeadlessDisclosureChild>
      </div>
    </Listbox>
  );
}

type SelectWithLabelProps<T> = SelectProps<T> & {
  rootId: string;
  label: string;
};

export function SelectWithLabel<T extends string | number>(
  props: SelectWithLabelProps<T>
) {
  return (
    <div>
      <label
        html-for={props.rootId}
        class="mb-1 block text-sm text-base-content-lighter"
      >
        {props.label}
      </label>
      <div class="">
        <Select name={props.rootId} {...props} />
      </div>
    </div>
  );
}

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

function CheckIcon(props: JSX.IntrinsicElements["svg"]): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function SelectorIcon(props: JSX.IntrinsicElements["svg"]): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
      />
    </svg>
  );
}
