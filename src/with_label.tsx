import { JSX } from "solid-js";

type WithLabelProps = {
  label: string;
  children?: JSX.Element;
};

export function WithLabel(props: WithLabelProps) {
  return (
    <div>
      <label class="mb-1 block text-sm text-base-content-lighter">
        {props.label}
      </label>
      <div class="">{props.children}</div>
    </div>
  );
}
