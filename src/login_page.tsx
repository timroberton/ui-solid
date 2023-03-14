import { SupabaseClient } from "@supabase/supabase-js";
import { createSignal, JSX, onMount } from "solid-js";
import { Button } from "./button";
import { InputWithLabel } from "./input";

type LoginViewState = "signin" | "register" | "resetpasswordrequest";

export type LoginPageProps =
  | LoginPagePropsSignInRegisterResetPasswordRequest
  | LoginPagePropsResetPasswordForm;

type LoginPagePropsSignInRegisterResetPasswordRequest = {
  type: "login";
  supabaseBrowserClient: SupabaseClient<any>;
  logoLinkElement?: JSX.Element;
  resetPasswordRedirectUrl: string;
};

type LoginPagePropsResetPasswordForm = {
  type: "resetpasswordform";
  supabaseBrowserClient: SupabaseClient<any>;
  logoLinkElement?: JSX.Element;
  afterResetPassword: () => void;
};

export function LoginPage(p: LoginPageProps) {
  const [loginViewState, setLoginViewState] =
    createSignal<LoginViewState>("signin");

  return (
    <main class="flex h-screen w-full items-start justify-center">
      <div class="text-400 min-h-full w-full space-y-4 rounded bg-base-200 py-10 px-12 text-base-content sm:mt-24 sm:min-h-0 sm:w-96">
        {p.logoLinkElement && (
          <div class="w-full text-center">{p.logoLinkElement}</div>
        )}
        {p.type === "resetpasswordform" ? (
          <ResetPasswordForm
            changeLoginViewState={(v) => setLoginViewState(v)}
            supabase={p.supabaseBrowserClient}
            afterResetPassword={p.afterResetPassword}
          />
        ) : (
          <>
            {loginViewState() === "signin" && (
              <SignInForm
                changeLoginViewState={(v) => setLoginViewState(v)}
                supabase={p.supabaseBrowserClient}
              />
            )}
            {loginViewState() === "register" && (
              <RegisterForm
                changeLoginViewState={(v) => setLoginViewState(v)}
                supabase={p.supabaseBrowserClient}
              />
            )}
            {loginViewState() === "resetpasswordrequest" && (
              <ResetPasswordRequest
                changeLoginViewState={(v) => setLoginViewState(v)}
                supabase={p.supabaseBrowserClient}
                resetPasswordRedirectUrl={p.resetPasswordRedirectUrl}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

type LoginPageFormPropsSignInRegister = {
  changeLoginViewState: (v: LoginViewState) => void;
  supabase: SupabaseClient;
};

function SignInForm(p: LoginPageFormPropsSignInRegister) {
  const [loading, setLoading] = createSignal<boolean>(false);
  const [email, setEmail] = createSignal<string>("");
  const [password, setPassword] = createSignal<string>("");
  const [errorMsg, setErrorMsg] = createSignal<string>("");

  onMount(() => {
    focusFirstInput();
  });

  async function submit(evt: MouseEvent) {
    evt.preventDefault();
    setLoading(true);
    setErrorMsg("");
    const { data, error } = await p.supabase.auth.signInWithPassword({
      email: email(),
      password: password(),
    });
    if (error || !data.session) {
      setErrorMsg(error?.message ?? "Problem with sign in");
      setLoading(false);
    }
  }

  return (
    <form id="signInForm" class="space-y-4">
      <FormHeader>Sign in to use the app</FormHeader>
      {loading() ? (
        <div class="text-center">Signing in...</div>
      ) : (
        <>
          <InputWithLabel
            rootId="email"
            label="Email"
            type="email"
            autocomplete="email"
            value={email()}
            onInput={(v) => setEmail(v.currentTarget.value)}
            autofocus
          />
          <InputWithLabel
            rootId="password"
            label="Password"
            type="password"
            autocomplete="current-password"
            value={password()}
            onInput={(v) => setPassword(v.currentTarget.value)}
          />
          <Button
            class="w-full"
            type="submit"
            form="signInForm"
            onClick={submit}
          >
            Sign in
          </Button>
          {errorMsg() && <div class="text-center text-error">{errorMsg()}</div>}
          <div class="space-y-2">
            <SpanButton onClick={() => p.changeLoginViewState("register")}>
              Don't have an account?
            </SpanButton>
            <SpanButton
              onClick={() => p.changeLoginViewState("resetpasswordrequest")}
            >
              Forgot password?
            </SpanButton>
          </div>
        </>
      )}
    </form>
  );
}

function RegisterForm(p: LoginPageFormPropsSignInRegister) {
  const [loading, setLoading] = createSignal<boolean>(false);
  const [email, setEmail] = createSignal<string>("");
  const [password, setPassword] = createSignal<string>("");
  const [firstName, setFirstName] = createSignal<string>("");
  const [lastName, setLastName] = createSignal<string>("");
  const [errorMsg, setErrorMsg] = createSignal<string>("");

  onMount(() => {
    focusFirstInput();
  });

  async function submit(evt: MouseEvent) {
    evt.preventDefault();
    setLoading(true);
    setErrorMsg("");
    const { data, error } = await p.supabase.auth.signUp({
      email: email(),
      password: password(),
    });
    if (error || !data.session) {
      setErrorMsg(error?.message ?? "Problem creating an account");
      setLoading(false);
    }
  }

  return (
    <form id="registerForm" class="space-y-4">
      <FormHeader>Create an account to use the app</FormHeader>
      {loading() ? (
        <div class="text-center">Creating an account...</div>
      ) : (
        <>
          <InputWithLabel
            rootId="email"
            label="Email"
            type="email"
            autocomplete="email"
            value={email()}
            onInput={(v) => setEmail(v.currentTarget.value)}
            autofocus
          />
          <InputWithLabel
            rootId="password"
            label="Password"
            type="password"
            autocomplete="new-password"
            value={password()}
            onInput={(v) => setPassword(v.currentTarget.value)}
          />
          <InputWithLabel
            rootId="firstName"
            label="First name"
            type="text"
            autocomplete="given-name"
            value={firstName()}
            onInput={(v) => setFirstName(v.currentTarget.value)}
          />
          <InputWithLabel
            rootId="lastName"
            label="Last name"
            type="text"
            autocomplete="family-name"
            value={lastName()}
            onInput={(v) => setLastName(v.currentTarget.value)}
          />
          <Button
            class="w-full"
            type="submit"
            form="registerForm"
            onClick={submit}
          >
            Create account
          </Button>
          {errorMsg() && <div class="text-center text-error">{errorMsg()}</div>}
          <SpanButton onClick={() => p.changeLoginViewState("signin")}>
            Already have an account?
          </SpanButton>
        </>
      )}
    </form>
  );
}

type LoginPageFormPropsResetPasswordRequest = {
  changeLoginViewState: (v: LoginViewState) => void;
  supabase: SupabaseClient;
  resetPasswordRedirectUrl: string;
};

type ResetPasswordRequestViewState =
  | "userentry"
  | "sending"
  | "finishedsending";

function ResetPasswordRequest(p: LoginPageFormPropsResetPasswordRequest) {
  const [rprViewState, setRprViewState] =
    createSignal<ResetPasswordRequestViewState>("userentry");
  const [email, setEmail] = createSignal<string>("");
  const [errorMsg, setErrorMsg] = createSignal<string>("");

  onMount(() => {
    focusFirstInput();
  });

  async function submit(evt: MouseEvent) {
    evt.preventDefault();
    setRprViewState("sending");
    setErrorMsg("");
    const { error } = await p.supabase.auth.resetPasswordForEmail(email(), {
      redirectTo: p.resetPasswordRedirectUrl,
    });
    if (error) {
      setRprViewState("userentry");
      setErrorMsg(error?.message ?? "Problem sending email");
      return;
    }
    setRprViewState("finishedsending");
  }

  return (
    <form id="resetPasswordRequestForm" class="space-y-4">
      <FormHeader>Reset your password</FormHeader>
      {rprViewState() === "finishedsending" ? (
        <div class="text-center">
          Email sent! Check your email for a link to reset your password.
        </div>
      ) : rprViewState() === "sending" ? (
        <div class="text-center">Sending email...</div>
      ) : (
        <>
          <div class="text-sm text-base-content-lighter">
            Send a link to your email account, which you can use to reset your
            password.
          </div>
          <InputWithLabel
            rootId="email"
            label="Email"
            type="email"
            autocomplete="email"
            value={email()}
            onInput={(v) => setEmail(v.currentTarget.value)}
            autofocus
          />
          <Button
            class="w-full"
            onClick={submit}
            type="submit"
            form="resetPasswordRequestForm"
          >
            Send email
          </Button>
          {errorMsg() && <div class="text-center text-error">{errorMsg()}</div>}
          <SpanButton onClick={() => p.changeLoginViewState("signin")}>
            Remember your password?
          </SpanButton>
        </>
      )}
    </form>
  );
}

type LoginPageFormPropsRequestPasswordForm = {
  changeLoginViewState: (v: LoginViewState) => void;
  supabase: SupabaseClient;
  afterResetPassword: () => void;
};

function ResetPasswordForm(p: LoginPageFormPropsRequestPasswordForm) {
  const [loading, setLoading] = createSignal<boolean>(false);
  const [password, setPassword] = createSignal<string>("");
  const [linkErrorMsg, setLinkErrorMsg] = createSignal<string>("");
  const [userErrorMsg, setUserErrorMsg] = createSignal<string>("");

  onMount(() => {
    focusFirstInput();
  });

  onMount(() => {
    // Try to get error message from url (i.e. from supabase)
    const hashParams = getHashParams();
    if (hashParams["error_description"]) {
      setLinkErrorMsg(hashParams["error_description"]);
    }
  });

  async function submit(evt: MouseEvent) {
    evt.preventDefault();
    // Try to get error message from url (i.e. from supabase)
    const hashParams = getHashParams();
    if (hashParams["error_description"]) {
      setLinkErrorMsg(hashParams["error_description"]);
      return;
    }
    setLoading(true);
    setUserErrorMsg("");
    const { error } = await p.supabase.auth.updateUser({
      password: password(),
    });
    if (error) {
      if (error?.message === "Auth session missing!") {
        setLinkErrorMsg("Email link is invalid or has expired");
        return;
      }
      setUserErrorMsg(error?.message ?? "Problem resetting password");
      setLoading(false);
      return;
    }
    p.afterResetPassword();
  }

  return (
    <form id="resetPasswordForm" class="space-y-4">
      {linkErrorMsg() ? (
        <div class="text-center text-error">{linkErrorMsg}</div>
      ) : (
        <>
          <FormHeader>Enter a new password here</FormHeader>
          {loading() ? (
            <div class="text-center">Resetting password...</div>
          ) : (
            <>
              <InputWithLabel
                rootId="newPassword"
                label="New password"
                type={"password"}
                autocomplete="new-password"
                value={password()}
                onInput={(v) => setPassword(v.currentTarget.value)}
                autofocus
              />
              <Button
                class="w-full"
                onClick={submit}
                type="submit"
                form="resetPasswordForm"
              >
                Save
              </Button>
              {userErrorMsg() && (
                <div class="text-center text-error">{userErrorMsg()}</div>
              )}
            </>
          )}
        </>
      )}
    </form>
  );
}

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

function getHashParams(): Record<string, string> {
  if (typeof window === "undefined") {
    return {};
  }
  return window.location.hash
    .substring(1)
    .split("&")
    .map((a) => a.split("="))
    .reduce<Record<string, string>>((params, val) => {
      if (val[0] && val[1]) {
        params[val[0]] = val[1].replaceAll("+", " ");
      }
      return params;
    }, {});
}

function SpanButton(p: { onClick: () => void; children: JSX.Element }) {
  return (
    <div class="text-center">
      <button
        class="inline-block cursor-pointer text-sm text-base-content-lighter hover:underline focus-visible:underline focus-visible:outline-none"
        onClick={p.onClick}
      >
        {p.children}
      </button>
    </div>
  );
}

function FormHeader(p: { children: JSX.Element }) {
  return (
    <div class="text-center text-lg font-700 text-primary">{p.children}</div>
  );
}

function focusFirstInput() {
  document.getElementsByTagName("input")?.[0]?.focus();
}
