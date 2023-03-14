import { SupabaseClient } from "@supabase/supabase-js";
import { JSX } from "solid-js";
export type LoginPageProps = LoginPagePropsSignInRegisterResetPasswordRequest | LoginPagePropsResetPasswordForm;
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
export declare function LoginPage(p: LoginPageProps): JSX.Element;
export {};
//# sourceMappingURL=login_page.d.ts.map