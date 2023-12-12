import { Combobox as KCombobox } from "@kobalte/core";
import { IconCaretUpDownFilled, IconCheck } from "@tabler/icons-solidjs";

export function ComboBox<T>(p: {
  options: T[];
  optionValue: keyof T | ((option: T) => string | number);
  optionTextValue: keyof T | ((option: T) => string | number);
  optionLabel: keyof T | ((option: T) => string);
  optionDisabled: keyof T | ((option: T) => boolean);
  value: T;
  onChange: (v: T) => void;
  virtualized?: boolean;
  placeholder?: string;
}) {
  // const onInputChange = (value: string) => {
  //   // Remove selection when input is cleared.
  //   if (value === "") {
  //     p.onChange("");
  //   }
  // };

  return (
    <KCombobox.Root<T>
      options={p.options}
      optionValue={p.optionValue}
      optionLabel={p.optionLabel}
      optionTextValue={p.optionLabel}
      optionDisabled={p.optionDisabled}
      value={p.value}
      onChange={p.onChange}
      // onInputChange={onInputChange}
      placeholder={p.placeholder}
      virtualized={false}
      disallowEmptySelection={false}
      itemComponent={(props) => (
        <KCombobox.Item item={props.item} class="hover:bg-gray-200 flex">
          <KCombobox.ItemLabel>{props.item.textValue}</KCombobox.ItemLabel>
          <KCombobox.ItemIndicator>
            <IconCheck />
          </KCombobox.ItemIndicator>
        </KCombobox.Item>
      )}
    >
      <KCombobox.Control
        aria-label="Fruit"
        class="inline-flex items-center  border-2 border-base-300"
      >
        <KCombobox.Input class="rounded bg-white px-2 text-primary focus:outline-none" />
        <KCombobox.Trigger class="bg-base-200 px-1 py-1">
          <KCombobox.Icon>
            <IconCaretUpDownFilled class="h-5 w-5 text-white" />
          </KCombobox.Icon>
        </KCombobox.Trigger>
      </KCombobox.Control>
      <KCombobox.Portal>
        <KCombobox.Content>
          <KCombobox.Listbox class="max-h-96 overflow-auto rounded bg-white" />
        </KCombobox.Content>
      </KCombobox.Portal>
    </KCombobox.Root>
  );
}
