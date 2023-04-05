import { __awaiter, __generator } from "tslib";
import { createSignal, onMount } from "solid-js";
import { Button } from "./button";
import { InputWithLabel } from "./input";
export function LoginPage(p) {
    var _a = createSignal("signin"), loginViewState = _a[0], setLoginViewState = _a[1];
    return (<main class="flex h-screen w-full items-start justify-center">
      <div class="text-400 min-h-full w-full space-y-4 rounded bg-base-200 px-12 py-10 text-base-content sm:mt-24 sm:min-h-0 sm:w-96">
        {p.logoLinkElement && (<div class="w-full text-center">{p.logoLinkElement}</div>)}
        {p.type === "resetpasswordform" ? (<ResetPasswordForm changeLoginViewState={function (v) { return setLoginViewState(v); }} supabase={p.supabaseBrowserClient} afterResetPassword={p.afterResetPassword}/>) : (<>
            {loginViewState() === "signin" && (<SignInForm changeLoginViewState={function (v) { return setLoginViewState(v); }} supabase={p.supabaseBrowserClient}/>)}
            {loginViewState() === "register" && (<RegisterForm changeLoginViewState={function (v) { return setLoginViewState(v); }} supabase={p.supabaseBrowserClient}/>)}
            {loginViewState() === "resetpasswordrequest" && (<ResetPasswordRequest changeLoginViewState={function (v) { return setLoginViewState(v); }} supabase={p.supabaseBrowserClient} resetPasswordRedirectUrl={p.resetPasswordRedirectUrl}/>)}
          </>)}
      </div>
    </main>);
}
function SignInForm(p) {
    var _a = createSignal(false), loading = _a[0], setLoading = _a[1];
    var _b = createSignal(""), email = _b[0], setEmail = _b[1];
    var _c = createSignal(""), password = _c[0], setPassword = _c[1];
    var _d = createSignal(""), errorMsg = _d[0], setErrorMsg = _d[1];
    onMount(function () {
        focusFirstInput();
    });
    function submit(evt) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, data, error;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        evt.preventDefault();
                        setLoading(true);
                        setErrorMsg("");
                        return [4 /*yield*/, p.supabase.auth.signInWithPassword({
                                email: email(),
                                password: password(),
                            })];
                    case 1:
                        _b = _c.sent(), data = _b.data, error = _b.error;
                        if (error || !data.session) {
                            setErrorMsg((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Problem with sign in");
                            setLoading(false);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    return (<form id="signInForm" class="space-y-4">
      <FormHeader>Sign in to use the app</FormHeader>
      {loading() ? (<div class="text-center">Signing in...</div>) : (<>
          <InputWithLabel rootId="email" label="Email" type="email" autocomplete="email" value={email()} onInput={function (v) { return setEmail(v.currentTarget.value); }} autofocus/>
          <InputWithLabel rootId="password" label="Password" type="password" autocomplete="current-password" value={password()} onInput={function (v) { return setPassword(v.currentTarget.value); }}/>
          <Button class="w-full" type="submit" form="signInForm" onClick={submit}>
            Sign in
          </Button>
          {errorMsg() && <div class="text-center text-error">{errorMsg()}</div>}
          <div class="space-y-2">
            <SpanButton onClick={function () { return p.changeLoginViewState("register"); }}>
              Don't have an account?
            </SpanButton>
            <SpanButton onClick={function () { return p.changeLoginViewState("resetpasswordrequest"); }}>
              Forgot password?
            </SpanButton>
          </div>
        </>)}
    </form>);
}
function RegisterForm(p) {
    var _a = createSignal(false), loading = _a[0], setLoading = _a[1];
    var _b = createSignal(""), email = _b[0], setEmail = _b[1];
    var _c = createSignal(""), password = _c[0], setPassword = _c[1];
    var _d = createSignal(""), firstName = _d[0], setFirstName = _d[1];
    var _e = createSignal(""), lastName = _e[0], setLastName = _e[1];
    var _f = createSignal(""), errorMsg = _f[0], setErrorMsg = _f[1];
    onMount(function () {
        focusFirstInput();
    });
    function submit(evt) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, data, error;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        evt.preventDefault();
                        setLoading(true);
                        setErrorMsg("");
                        return [4 /*yield*/, p.supabase.auth.signUp({
                                email: email(),
                                password: password(),
                            })];
                    case 1:
                        _b = _c.sent(), data = _b.data, error = _b.error;
                        if (error || !data.session) {
                            setErrorMsg((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Problem creating an account");
                            setLoading(false);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    return (<form id="registerForm" class="space-y-4">
      <FormHeader>Create an account to use the app</FormHeader>
      {loading() ? (<div class="text-center">Creating an account...</div>) : (<>
          <InputWithLabel rootId="email" label="Email" type="email" autocomplete="email" value={email()} onInput={function (v) { return setEmail(v.currentTarget.value); }} autofocus/>
          <InputWithLabel rootId="password" label="Password" type="password" autocomplete="new-password" value={password()} onInput={function (v) { return setPassword(v.currentTarget.value); }}/>
          <InputWithLabel rootId="firstName" label="First name" type="text" autocomplete="given-name" value={firstName()} onInput={function (v) { return setFirstName(v.currentTarget.value); }}/>
          <InputWithLabel rootId="lastName" label="Last name" type="text" autocomplete="family-name" value={lastName()} onInput={function (v) { return setLastName(v.currentTarget.value); }}/>
          <Button class="w-full" type="submit" form="registerForm" onClick={submit}>
            Create account
          </Button>
          {errorMsg() && <div class="text-center text-error">{errorMsg()}</div>}
          <SpanButton onClick={function () { return p.changeLoginViewState("signin"); }}>
            Already have an account?
          </SpanButton>
        </>)}
    </form>);
}
function ResetPasswordRequest(p) {
    var _a = createSignal("userentry"), rprViewState = _a[0], setRprViewState = _a[1];
    var _b = createSignal(""), email = _b[0], setEmail = _b[1];
    var _c = createSignal(""), errorMsg = _c[0], setErrorMsg = _c[1];
    onMount(function () {
        focusFirstInput();
    });
    function submit(evt) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        evt.preventDefault();
                        setRprViewState("sending");
                        setErrorMsg("");
                        return [4 /*yield*/, p.supabase.auth.resetPasswordForEmail(email(), {
                                redirectTo: p.resetPasswordRedirectUrl,
                            })];
                    case 1:
                        error = (_b.sent()).error;
                        if (error) {
                            setRprViewState("userentry");
                            setErrorMsg((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Problem sending email");
                            return [2 /*return*/];
                        }
                        setRprViewState("finishedsending");
                        return [2 /*return*/];
                }
            });
        });
    }
    return (<form id="resetPasswordRequestForm" class="space-y-4">
      <FormHeader>Reset your password</FormHeader>
      {rprViewState() === "finishedsending" ? (<div class="text-center">
          Email sent! Check your email for a link to reset your password.
        </div>) : rprViewState() === "sending" ? (<div class="text-center">Sending email...</div>) : (<>
          <div class="text-sm text-base-content-lighter">
            Send a link to your email account, which you can use to reset your
            password.
          </div>
          <InputWithLabel rootId="email" label="Email" type="email" autocomplete="email" value={email()} onInput={function (v) { return setEmail(v.currentTarget.value); }} autofocus/>
          <Button class="w-full" onClick={submit} type="submit" form="resetPasswordRequestForm">
            Send email
          </Button>
          {errorMsg() && <div class="text-center text-error">{errorMsg()}</div>}
          <SpanButton onClick={function () { return p.changeLoginViewState("signin"); }}>
            Remember your password?
          </SpanButton>
        </>)}
    </form>);
}
function ResetPasswordForm(p) {
    var _a = createSignal(false), loading = _a[0], setLoading = _a[1];
    var _b = createSignal(""), password = _b[0], setPassword = _b[1];
    var _c = createSignal(""), linkErrorMsg = _c[0], setLinkErrorMsg = _c[1];
    var _d = createSignal(""), userErrorMsg = _d[0], setUserErrorMsg = _d[1];
    onMount(function () {
        focusFirstInput();
    });
    onMount(function () {
        // Try to get error message from url (i.e. from supabase)
        var hashParams = getHashParams();
        if (hashParams["error_description"]) {
            setLinkErrorMsg(hashParams["error_description"]);
        }
    });
    function submit(evt) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var hashParams, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        evt.preventDefault();
                        hashParams = getHashParams();
                        if (hashParams["error_description"]) {
                            setLinkErrorMsg(hashParams["error_description"]);
                            return [2 /*return*/];
                        }
                        setLoading(true);
                        setUserErrorMsg("");
                        return [4 /*yield*/, p.supabase.auth.updateUser({
                                password: password(),
                            })];
                    case 1:
                        error = (_b.sent()).error;
                        if (error) {
                            if ((error === null || error === void 0 ? void 0 : error.message) === "Auth session missing!") {
                                setLinkErrorMsg("Email link is invalid or has expired");
                                return [2 /*return*/];
                            }
                            setUserErrorMsg((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Problem resetting password");
                            setLoading(false);
                            return [2 /*return*/];
                        }
                        p.afterResetPassword();
                        return [2 /*return*/];
                }
            });
        });
    }
    return (<form id="resetPasswordForm" class="space-y-4">
      {linkErrorMsg() ? (<div class="text-center text-error">{linkErrorMsg()}</div>) : (<>
          <FormHeader>Enter a new password here</FormHeader>
          {loading() ? (<div class="text-center">Resetting password...</div>) : (<>
              <InputWithLabel rootId="newPassword" label="New password" type={"password"} autocomplete="new-password" value={password()} onInput={function (v) { return setPassword(v.currentTarget.value); }} autofocus/>
              <Button class="w-full" onClick={submit} type="submit" form="resetPasswordForm">
                Save
              </Button>
              {userErrorMsg() && (<div class="text-center text-error">{userErrorMsg()}</div>)}
            </>)}
        </>)}
    </form>);
}
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
function getHashParams() {
    if (typeof window === "undefined") {
        return {};
    }
    return window.location.hash
        .substring(1)
        .split("&")
        .map(function (a) { return a.split("="); })
        .reduce(function (params, val) {
        if (val[0] && val[1]) {
            params[val[0]] = val[1].replaceAll("+", " ");
        }
        return params;
    }, {});
}
function SpanButton(p) {
    return (<div class="text-center">
      <button class="inline-block cursor-pointer text-sm text-base-content-lighter hover:underline focus-visible:underline focus-visible:outline-none" onClick={p.onClick}>
        {p.children}
      </button>
    </div>);
}
function FormHeader(p) {
    return (<div class="text-center text-lg font-700 text-primary">{p.children}</div>);
}
function focusFirstInput() {
    var _a, _b;
    (_b = (_a = document.getElementsByTagName("input")) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.focus();
}
//# sourceMappingURL=login_page.jsx.map