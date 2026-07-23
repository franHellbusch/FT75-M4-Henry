import type { LoginFormState } from "../pages/Login/Login";

export function validateLogin(form: LoginFormState): string | null {

    if (!form.email.includes("@") || !form.email.includes(".")) return "Email invalido.";

    if (form.password.length < 6) return "La contrasena debe tener al menos 6 caracteres.";

    return null;
}