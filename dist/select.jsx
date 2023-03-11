import { __rest } from "tslib";
import { cva } from "class-variance-authority";
import { HeadlessDisclosureChild, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "solid-headless";
import { For } from "solid-js";
export var getClassesForSelect = cva("block rounded border border-base-300 focus-visible:ring-1 text-base-content cursor-pointer bg-white text-base py-2 pl-4 pr-10 text-left focus:outline-none w-full", {
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
export function Select(props) {
    var _a;
    var selectedFull = function () {
        return props.options.find(function (a) { return a.key === props.selected; });
    };
    return (<Listbox defaultOpen={false} value={props.selected} onSelectChange={props.onChange}>
      <div class={"relative w-full ".concat(props.class)}>
        <ListboxButton class={getClassesForSelect({
            intent: props.intent,
        })} name={props.name}>
          <span class="block truncate">{(_a = selectedFull()) === null || _a === void 0 ? void 0 : _a.text}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon class="text-gray-400 h-5 w-5" aria-hidden="true"/>
          </span>
        </ListboxButton>
        <HeadlessDisclosureChild>
          {function (_a) {
            var isOpen = _a.isOpen;
            return (<Transition show={isOpen()} enter="transition ease-in duration-100" enterFrom="opacity-0" enterTo="opacity-100" leave="transition ease-out duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <ListboxOptions class="rounded absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base text-base-content shadow-lg ring-1 ring-black ring-opacity-5">
                <For each={props.options}>
                  {function (opt) { return (<ListboxOption class="group focus:outline-none" value={opt.key}>
                      {function (_a) {
                        var isActive = _a.isActive, isSelected = _a.isSelected;
                        return (<div class={"".concat(isActive() ? "bg-base-200" : "hover:bg-base-200", " relative cursor-pointer select-none py-2 pl-10 pr-4")}>
                          <span class="block truncate">
                            {opt.text}
                          </span>
                          {isSelected() ? (<span class="absolute inset-y-0 left-0 flex items-center pl-4">
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
export function SelectWithLabel(_a) {
    var label = _a.label, rootId = _a.rootId, props = __rest(_a, ["label", "rootId"]);
    return (<div>
      <label html-for={rootId} class="mb-1 block text-sm text-base-content-lighter">
        {label}
      </label>
      <div class="">
        <Select name={rootId} {...props}/>
      </div>
    </div>);
}
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
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
//# sourceMappingURL=select.jsx.map