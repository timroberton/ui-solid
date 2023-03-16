import { __assign, __awaiter, __generator } from "tslib";
import { createEffect, createSignal, onCleanup, Show } from "solid-js";
import { Dynamic, Portal } from "solid-js/web";
import { Button } from "./button";
import { Input, InputWithLabel } from "./input";
var _a = createSignal(undefined), alertState = _a[0], setAlertState = _a[1];
export function openAlert(v) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    setAlertState(__assign(__assign({}, v), { stateType: "alert", alertResolver: resolve }));
                })];
        });
    });
}
export function openConfirm(v) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    setAlertState(__assign(__assign({}, v), { stateType: "confirm", confirmResolver: resolve }));
                })];
        });
    });
}
export function openPrompt(v) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    setAlertState(__assign(__assign({}, v), { stateType: "prompt", promptResolver: resolve }));
                })];
        });
    });
}
export function openComponent(v) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    setAlertState(__assign(__assign({}, v), { stateType: "component", componentResolver: resolve }));
                })];
        });
    });
}
export default function AlertProvider(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    function cancelAny(evt) {
        var _a, _b, _c, _d;
        if (evt !== "keyboard_escape" &&
            (evt.target !== evt.currentTarget || evt.target !== downTarget)) {
            return;
        }
        if (((_a = alertState()) === null || _a === void 0 ? void 0 : _a.stateType) === "alert") {
            alertState().alertResolver();
        }
        if (((_b = alertState()) === null || _b === void 0 ? void 0 : _b.stateType) === "confirm") {
            alertState().confirmResolver(false);
        }
        if (((_c = alertState()) === null || _c === void 0 ? void 0 : _c.stateType) === "prompt") {
            alertState().promptResolver(undefined);
        }
        if (((_d = alertState()) === null || _d === void 0 ? void 0 : _d.stateType) === "component") {
            alertState().componentResolver(undefined);
        }
        setAlertState(undefined);
    }
    var focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    var modal;
    var downTarget;
    // This is from https://github.com/AdamAnSubtractM/SolidJS-Modal/blob/main/src/components/Modal/Modal.tsx
    createEffect(function () {
        var _a;
        if (alertState()) {
            var originalFocusedElement_1 = document.activeElement;
            var modalFocusableElements = modal.querySelectorAll(focusableElements);
            var firstFocusableElement_1 = modalFocusableElements === null || modalFocusableElements === void 0 ? void 0 : modalFocusableElements[0];
            var lastFocusableElement_1 = modalFocusableElements === null || modalFocusableElements === void 0 ? void 0 : modalFocusableElements[modalFocusableElements.length - 1];
            var focusTrap_1 = function (e) {
                var key = e.key, code = e.code, shiftKey = e.shiftKey;
                var isTabPressed = (key || code) === "Tab";
                var isEscapePressed = (key || code) === "Escape";
                if (!isTabPressed && !isEscapePressed)
                    return;
                if (isEscapePressed) {
                    cancelAny("keyboard_escape");
                    return;
                }
                if (shiftKey) {
                    // if shift key pressed for shift + tab combination
                    if (document.activeElement === firstFocusableElement_1) {
                        lastFocusableElement_1 === null || lastFocusableElement_1 === void 0 ? void 0 : lastFocusableElement_1.focus(); // add focus for the last focusable element
                        e.preventDefault();
                    }
                    // if tab key is pressed
                }
                else if (document.activeElement === lastFocusableElement_1) {
                    // if focused has reached to last focusable element then focus first focusable element after pressing tab
                    firstFocusableElement_1 === null || firstFocusableElement_1 === void 0 ? void 0 : firstFocusableElement_1.focus(); // add focus for the first focusable element
                    e.preventDefault();
                }
            };
            if (((_a = alertState()) === null || _a === void 0 ? void 0 : _a.stateType) === "confirm") {
                lastFocusableElement_1 === null || lastFocusableElement_1 === void 0 ? void 0 : lastFocusableElement_1.focus();
            }
            else {
                firstFocusableElement_1 === null || firstFocusableElement_1 === void 0 ? void 0 : firstFocusableElement_1.focus();
            }
            document.addEventListener("keydown", focusTrap_1);
            onCleanup(function () {
                document.removeEventListener("keydown", focusTrap_1);
                originalFocusedElement_1 === null || originalFocusedElement_1 === void 0 ? void 0 : originalFocusedElement_1.focus();
            });
        }
    });
    return (<>
      {props.children}

      <Show when={alertState()}>
        <Portal>
          <div role="presentation" class="fixed inset-0 z-10 flex min-h-screen items-center justify-center overflow-y-auto bg-black/30 px-4" onMouseDown={function (evt) {
            downTarget = evt.target;
        }} onClick={cancelAny}>
            <div role="dialog" class="my-8 max-w-lg rounded bg-white px-10 py-8 shadow-xl" ref={modal} onMouseDown={function (evt) {
            downTarget = evt.target;
        }}>
              {((_a = alertState()) === null || _a === void 0 ? void 0 : _a.stateType) === "component" ? (<Dynamic component={(_b = alertState()) === null || _b === void 0 ? void 0 : _b.element} close={function (p) {
                var _a;
                (_a = alertState()) === null || _a === void 0 ? void 0 : _a.componentResolver(p);
                setAlertState(undefined);
            }} {...(_c = alertState()) === null || _c === void 0 ? void 0 : _c.elementProps}/>) : (<>
                  {((_d = alertState()) === null || _d === void 0 ? void 0 : _d.title) && (<h2 class={"mb-2 text-lg font-700 ".concat(((_e = alertState()) === null || _e === void 0 ? void 0 : _e.intent) === "danger"
                    ? "text-error"
                    : "")}>
                      {(_f = alertState()) === null || _f === void 0 ? void 0 : _f.title}
                    </h2>)}
                  {((_g = alertState()) === null || _g === void 0 ? void 0 : _g.text) && (<p class="mb-4">{(_h = alertState()) === null || _h === void 0 ? void 0 : _h.text}</p>)}
                  {((_j = alertState()) === null || _j === void 0 ? void 0 : _j.stateType) === "alert" && (<div class="">
                      <Button onClick={function () {
                    var _a;
                    (_a = alertState()) === null || _a === void 0 ? void 0 : _a.alertResolver();
                    setAlertState(undefined);
                }} intent={(_k = alertState()) === null || _k === void 0 ? void 0 : _k.intent}>
                        {(_m = (_l = alertState()) === null || _l === void 0 ? void 0 : _l.closeButtonLabel) !== null && _m !== void 0 ? _m : "Close"}
                      </Button>
                    </div>)}
                  {((_o = alertState()) === null || _o === void 0 ? void 0 : _o.stateType) === "confirm" && (<div class="space-x-2">
                      <Button onClick={function () {
                    var _a;
                    (_a = alertState()) === null || _a === void 0 ? void 0 : _a.confirmResolver(true);
                    setAlertState(undefined);
                }} intent={(_p = alertState()) === null || _p === void 0 ? void 0 : _p.intent}>
                        {(_r = (_q = alertState()) === null || _q === void 0 ? void 0 : _q.confirmButtonLabel) !== null && _r !== void 0 ? _r : "Confirm"}
                      </Button>
                      <Button onClick={function () {
                    var _a;
                    (_a = alertState()) === null || _a === void 0 ? void 0 : _a.confirmResolver(false);
                    setAlertState(undefined);
                }} intent="neutral" autofocus>
                        Cancel
                      </Button>
                    </div>)}
                  {((_s = alertState()) === null || _s === void 0 ? void 0 : _s.stateType) === "prompt" && (<InnerForPrompt pst={alertState()} close={function (v) {
                    alertState().promptResolver(v);
                    setAlertState(undefined);
                }}/>)}
                </>)}
            </div>
          </div>
        </Portal>
      </Show>
    </>);
}
function InnerForPrompt(props) {
    var _a, _b, _c;
    var _d = createSignal(props.pst.initialInputText), promptInput = _d[0], setPromptInput = _d[1];
    return (<form id="promptForm" class="w-96">
      <div class="">
        {props.pst.inputLabel ? (<InputWithLabel rootId="prompt-input" label={props.pst.inputLabel} type={(_a = props.pst.inputType) !== null && _a !== void 0 ? _a : "text"} value={promptInput()} onInput={function (v) { return setPromptInput(v.currentTarget.value); }} autofocus/>) : (<Input type={(_b = props.pst.inputType) !== null && _b !== void 0 ? _b : "text"} value={promptInput()} onInput={function (v) { return setPromptInput(v.currentTarget.value); }} autofocus/>)}
      </div>
      <div class="mt-4 space-x-2">
        <Button type="submit" form="promptForm" onClick={function (evt) {
            evt.preventDefault();
            props.close(promptInput());
        }} intent={props.pst.intent}>
          {(_c = props.pst.saveButtonLabel) !== null && _c !== void 0 ? _c : "Confirm"}
        </Button>
        <Button type="button" onClick={function (evt) {
            evt.preventDefault();
            props.close(undefined);
        }} intent="neutral">
          Cancel
        </Button>
      </div>
    </form>);
}
//# sourceMappingURL=alert.jsx.map