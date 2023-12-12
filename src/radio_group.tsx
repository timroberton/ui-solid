import { RadioGroup as KRadioGroup } from "@kobalte/core";
import { IconCircle } from "@tabler/icons-solidjs";
import { For } from "solid-js";

export function RadioGroup(p: {
  label: string;
  selected: string;
  items: {
    label: string;
    value: string;
  }[];
  onChange: (value: string) => void;
}) {
  return (
    <KRadioGroup.Root
      value={p.selected}
      onChange={p.onChange}
      class="space-y-1 text-sm"
    >
      <KRadioGroup.Label class="font-700">{p.label}</KRadioGroup.Label>
      <For each={p.items}>
        {(item) => (
          <KRadioGroup.Item
            value={item.value}
            class="flex cursor-pointer items-center"
          >
            <KRadioGroup.ItemInput />
            <KRadioGroup.ItemControl class="h-5 w-5 rounded-full bg-base-content">
              <KRadioGroup.ItemIndicator>
                <IconCircle
                  class="h-5 w-5 text-base-100"
                  style={{ padding: "5px" }}
                  fill="white"
                  stroke-width={3}
                />
              </KRadioGroup.ItemIndicator>
            </KRadioGroup.ItemControl>
            <KRadioGroup.ItemLabel class="ml-1.5">
              {item.label}
            </KRadioGroup.ItemLabel>
            <KRadioGroup.ItemDescription />
          </KRadioGroup.Item>
        )}
      </For>
      <KRadioGroup.Description />
      <KRadioGroup.ErrorMessage />
    </KRadioGroup.Root>
  );
}
