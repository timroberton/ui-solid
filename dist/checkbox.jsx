import { Checkbox as KCheckbox } from "@kobalte/core";
import { IconCheck } from "@tabler/icons-solidjs";
export function Checkbox(p) {
    return (
    // <input
    //   type="checkbox"
    //   class="flex cursor-pointer items-center"
    //   checked={p.checked}
    //   onChange={p.onChange}
    // />
    <KCheckbox.Root class="flex cursor-pointer items-center" checked={p.checked} onChange={p.onChange}>
      {/* <KCheckbox.Input class="bg-primary" /> */}
      <KCheckbox.Control class="h-5 w-5 bg-base-content">
        <KCheckbox.Indicator>
          <IconCheck class="h-5 w-5 p-0.5 text-base-100" stroke-width={3}/>
        </KCheckbox.Indicator>
      </KCheckbox.Control>
      <KCheckbox.Label class="ml-1.5 text-base-content">
        {p.label}
      </KCheckbox.Label>
    </KCheckbox.Root>);
}
//# sourceMappingURL=checkbox.jsx.map