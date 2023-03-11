
import {
  Dialog,
  DialogOverlay,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild
} from 'solid-headless';
import { Dynamic, Portal } from "solid-js/web";
import { createContext, createEffect, createSignal, JSX, onCleanup, Show, useContext } from "solid-js";
import { Button } from "./button";
import { Input, InputWithLabel } from "./input";

///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// Inputs ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

type OpenAlertInput = {
  title?: string;
  text: string;
  intent?: "danger";
  closeButtonLabel?: string;
};

type OpenConfirmInput = {
  title?: string;
  text: string | JSX.Element;
  intent?: "danger";
  confirmButtonLabel?: string;
};

type OpenPromptInput = {
  initialInputText: string;
  title?: string;
  text?: string;
  inputLabel?: string;
  inputType?: JSX.InputHTMLAttributes<HTMLInputElement>["type"];
  intent?: "danger";
  saveButtonLabel?: string;
};

export type AlertComponentProps<TProps, TReturn> = TProps & {
  close: (p: TReturn | undefined) => void;
};

type OpenComponentInput<TProps, TReturn> = {
  elementProps: TProps;
  element: (p: AlertComponentProps<TProps, TReturn>) => JSX.Element;
};

///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// States ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

type AlertStateType = OpenAlertInput & {
  stateType: "alert";
  alertResolver(): void;
};

type ConfirmStateType = OpenConfirmInput & {
  stateType: "confirm";
  confirmResolver(v: boolean): void;
};

type PromptStateType = OpenPromptInput & {
  stateType: "prompt";
  promptResolver(v: string | undefined): void;
};

type ACPStateType = AlertStateType | ConfirmStateType | PromptStateType;

type ComponentStateType<TProps, TReturn> = OpenComponentInput<
  TProps,
  TReturn
> & {
  stateType: "component";
  componentResolver(v: TReturn | undefined): void;
};

export type AlertContext = {
  openAlert(v: OpenAlertInput): Promise<void>;
  openConfirm(v: OpenConfirmInput): Promise<boolean>;
  openPrompt(v: OpenPromptInput): Promise<string | undefined>;
  openComponent<TProps, TReturn>(
    v: OpenComponentInput<TProps, TReturn>
  ): Promise<TReturn | undefined>;
};

const defaultContext: AlertContext = {
  openAlert: async (v: OpenAlertInput) => {},
  openConfirm: async (v: OpenConfirmInput) => false,
  openPrompt: async (v: OpenPromptInput) => undefined,
  openComponent: async (v: OpenComponentInput<any, any>) => undefined,
}

export const Context = createContext<AlertContext>(defaultContext);

export default function AlertProvider(props: {
  children: JSX.Element;
}) {
  const [alertState, setAlertState] = createSignal<
    | AlertStateType
    | ConfirmStateType
    | PromptStateType
    | ComponentStateType<any, any>
    | undefined
  >(undefined);

  async function openAlert(v: OpenAlertInput): Promise<void> {
    return new Promise((resolve: () => void, reject) => {
      setAlertState({
        ...v,
        stateType: "alert",
        alertResolver: resolve,
      });
    });
  }

  async function openConfirm(v: OpenConfirmInput): Promise<boolean> {
    return new Promise<boolean>((resolve: (p: boolean) => void, reject) => {
      setAlertState({
        ...v,
        stateType: "confirm",
        confirmResolver: resolve,
      });
    });
  }

  async function openPrompt(v: OpenPromptInput): Promise<string | undefined> {
    return new Promise<string | undefined>(
      (resolve: (p: string | undefined) => void, reject) => {
        // setPromptInput(v.initialInputText);
        setAlertState({
          ...v,
          stateType: "prompt",
          promptResolver: resolve,
        });
      }
    );
  }

  async function openComponent<TProps, TReturn>(
    v: OpenComponentInput<TProps, TReturn>
  ): Promise<TReturn | undefined> {
    return new Promise<TReturn | undefined>(
      (resolve: (p: TReturn | undefined) => void, reject) => {
        setAlertState({
          ...v,
          stateType: "component",
          componentResolver: resolve,
        });
      }
    );
  }

  function cancelAny(evt: MouseEvent) {
    if (evt.target !== evt.currentTarget) {
      return;
    }
    if (evt.target !== downTarget) {
      return;
    }
    if (alertState()?.stateType === "alert") {
      (alertState() as AlertStateType).alertResolver();
    }
    if (alertState()?.stateType === "confirm") {
      (alertState() as ConfirmStateType).confirmResolver(false);
    }
    if (alertState()?.stateType === "prompt") {
      (alertState() as PromptStateType).promptResolver(undefined);
    }
    if (alertState()?.stateType === "component") {
      (alertState() as ComponentStateType<any, any>).componentResolver(undefined);
    }
    setAlertState(undefined);
  }


  const focusableElements =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  let modal: HTMLDivElement;

  let downTarget: EventTarget;

  // This is from https://github.com/AdamAnSubtractM/SolidJS-Modal/blob/main/src/components/Modal/Modal.tsx
  createEffect(() => {
    if (alertState()) {
      const originalFocusedElement = document.activeElement as HTMLElement;
      const modalFocusableElements = modal.querySelectorAll(focusableElements);
      const firstFocusableElement = modalFocusableElements?.[0] as HTMLElement;
      const lastFocusableElement = modalFocusableElements?.[
        modalFocusableElements.length - 1
      ] as HTMLElement;
      const focusTrap = function (e: KeyboardEvent) {
        const { key, code, shiftKey } = e;
        const isTabPressed = (key || code) === 'Tab';
        const isEscapePressed = (key || code) === 'Escape';
        if (!isTabPressed && !isEscapePressed) return;
        if (isEscapePressed) return setAlertState(undefined);
        if (shiftKey) {
          // if shift key pressed for shift + tab combination
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement?.focus(); // add focus for the last focusable element
            e.preventDefault();
          }
          // if tab key is pressed
        } else if (document.activeElement === lastFocusableElement) {
          // if focused has reached to last focusable element then focus first focusable element after pressing tab
          firstFocusableElement?.focus(); // add focus for the first focusable element
          e.preventDefault();
        }
      };
      if (alertState()?.stateType === "confirm") {
        lastFocusableElement?.focus();

      } else {
      firstFocusableElement?.focus();
      }
      document.addEventListener('keydown', focusTrap);
      onCleanup(() => {
        document.removeEventListener('keydown', focusTrap);
        originalFocusedElement?.focus();
      });
    }
  });


  return (
    <Context.Provider
      value={{ openAlert, openConfirm, openPrompt, openComponent }}
    >

      {props.children}  

<Show when={alertState()} >
  <Portal>
      <div 
          role="presentation"
          class="fixed inset-0 bg-black/30 z-10 overflow-y-auto min-h-screen px-4 flex items-center justify-center"
          onMouseDown={(evt: MouseEvent) => {
            downTarget = evt.target
          }}
          onClick={cancelAny}
          onKeyPress={(e) =>
            (e.key || e.code) === 'Escape' ? setAlertState(undefined) : null
          }
          >
            
            <div role="dialog" class="max-w-lg px-10 py-8 my-8 bg-white shadow-xl rounded" ref={modal}
            onMouseDown={(evt: MouseEvent) => {
              downTarget = evt.target
            }}
            >
             
              {alertState()?.stateType === "component" ? (
                <Dynamic component={(alertState() as ComponentStateType<any, any>)?.element}
                close={(p: any) => {
                  (alertState() as ComponentStateType<any, any>)?.componentResolver(p);
                  setAlertState(undefined);
                }}
                {...(alertState() as ComponentStateType<any, any>)?.elementProps}
                />
            ) : (
              <>
                {(alertState() as ACPStateType)?.title && (
                  <DialogTitle
                    class={`mb-2 text-lg font-700 ${
                      (alertState() as ACPStateType)?.intent === "danger" ? "text-error" : ""
                    }`}
                  >
                    {(alertState() as ACPStateType)?.title}
                  </DialogTitle>
                )}
                {(alertState() as ACPStateType)?.text && <p class="mb-4">{(alertState() as ACPStateType)?.text}</p>}
                {(alertState() as ACPStateType)?.stateType === "alert" && (
                  <div class="">
                    <Button
                      onClick={() => {
                        (alertState() as AlertStateType)?.alertResolver();
                        setAlertState(undefined);
                      }}
                      intent={ (alertState() as AlertStateType)?.intent}
                    >
                      { (alertState() as AlertStateType)?.closeButtonLabel ?? "Close"}
                    </Button>
                  </div>
                )}
                {(alertState() as ACPStateType)?.stateType === "confirm" && (
                  <div class="space-x-2">
                    <Button
                      onClick={() => {
                        (alertState() as ConfirmStateType)?.confirmResolver(true);
                        setAlertState(undefined);
                      }}
                      intent={(alertState() as ConfirmStateType)?.intent}
                    >
                      {(alertState() as ConfirmStateType)?.confirmButtonLabel ?? "Confirm"}
                    </Button>
                    <Button
                      onClick={() => {
                        (alertState() as ConfirmStateType)?.confirmResolver(false);
                        setAlertState(undefined);
                      }}
                      intent="neutral"
                      autofocus
                    >
                      Cancel
                    </Button>
                  </div>
                )}
                {(alertState() as ACPStateType)?.stateType === "prompt" && (
                  <InnerForPrompt
                  pst={(alertState() as PromptStateType)}
                  close={(v: string | undefined) => {
                    (alertState() as PromptStateType).promptResolver(v);
                    setAlertState(undefined);
                  }}
                  />
                )}
              </>
            )}
          </div>
        </div>
        </Portal>
</Show>
    </Context.Provider>
  );
}

export const useAlert = () => useContext(Context);

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

type InnerForPromptProps = {
  pst: PromptStateType,
  close: (p: string | undefined) => void
}

function InnerForPrompt(props: InnerForPromptProps) {
  const [promptInput, setPromptInput] = createSignal<string>("");
  return  <form id="promptForm" class="w-96">
  <div class="">
    {props.pst.inputLabel ? (
      <InputWithLabel
        rootId="prompt-input"
        label={props.pst.inputLabel}
        type={props.pst.inputType ?? "text"}
        value={promptInput()}
        onChange={(v) => setPromptInput(v.currentTarget.value)}
        autofocus
      />
    ) : (
      <Input
        type={props.pst.inputType ?? "text"}
        value={promptInput()}
        onChange={(v) => setPromptInput(v.currentTarget.value)}
        autofocus
      />
    )}
  </div>
  <div class="mt-4 space-x-2">
    <Button
      type="submit"
      form="promptForm"
      onClick={(evt: MouseEvent) => { 
        evt.preventDefault();
        props.close(promptInput());
      }}
      intent={props.pst.intent}
    >
      {props.pst.saveButtonLabel ?? "Confirm"}
    </Button>
    <Button
      type="button"
      onClick={(evt: MouseEvent) => { 
        evt.preventDefault();
        props.close(undefined);
      }}
      intent="neutral"
    >
      Cancel
    </Button>
  </div>
</form>;
}