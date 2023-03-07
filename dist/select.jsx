"use client";
import { HeadlessDisclosureChild, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition, } from "solid-headless";
import { cva } from "class-variance-authority";
import { For } from "solid-js";
export var getClassesForSelect = cva("rounded border border-base-300 w-full cursor-pointer bg-white py-2 relative text-base-content pl-3 pr-10 text-left focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none", {
    variants: {
        intent: {
            primary: "focus-visible:border-primary focus-visible:ring-primary",
            secondary: "focus-visible:border-secondary focus-visible:ring-secondary",
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
});
function CheckIcon(props) {
    return (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M5 13l4 4L19 7"/>
    </svg>);
}
function SelectorIcon(props) {
    return (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
    </svg>);
}
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(" ");
}
export function Select(props) {
    var _a;
    var selectedFull = function () {
        return props.options.find(function (a) { return a.key === props.selected; });
    };
    return (<Listbox defaultOpen={false} value={props.selected} onSelectChange={props.onChange}>
      <div class="relative mt-1">
        <ListboxButton class="rounded-lg focus-visible:ring-offset-orange-300 focus-visible:border-indigo-500 relative w-full cursor-default bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm">
          <span class="block truncate">{(_a = selectedFull()) === null || _a === void 0 ? void 0 : _a.text}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon class="text-gray-400 h-5 w-5" aria-hidden="true"/>
          </span>
        </ListboxButton>
        <HeadlessDisclosureChild>
          {function (_a) {
            var isOpen = _a.isOpen;
            return (<Transition show={isOpen()} enter="transition ease-in duration-100" enterFrom="opacity-0" enterTo="opacity-100" leave="transition ease-out duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <ListboxOptions class="rounded-md absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <For each={props.options}>
                  {function (opt) { return (<ListboxOption class="group focus:outline-none" value={opt.key}>
                      {function (_a) {
                        var isActive = _a.isActive, isSelected = _a.isSelected;
                        return (<div class={classNames(isActive()
                                ? "text-amber-900 bg-amber-100"
                                : "text-gray-900", "group-hover:text-amber-900 group-hover:bg-amber-100", "relative cursor-default select-none py-2 pl-10 pr-4")}>
                          <span class={classNames(isSelected() ? "font-medium" : "font-normal", "block truncate")}>
                            {opt.text}
                          </span>
                          {isSelected() ? (<span class={classNames(isActive()
                                    ? "text-amber-600"
                                    : "text-amber-600", "group-hover:text-amber-600", "absolute inset-y-0 left-0 flex items-center pl-3")}>
                              <CheckIcon class="h-5 w-5" aria-hidden="true"/>
                            </span>) : null}
                        </div>);
                    }}
                    </ListboxOption>); }}
                </For>
              </ListboxOptions>
            </Transition>);
        }}
        </HeadlessDisclosureChild>
      </div>
    </Listbox>);
}
//# sourceMappingURL=select.jsx.map