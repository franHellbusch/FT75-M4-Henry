import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { validateLogin } from "../../helpers/validateLogin";

interface LocationState {
    from?: { pathname: string };
}

type LoginStatus = "idle" | "loading" | "success" | "error";

export interface LoginFormState {
    email: string;
    password: string;
}

interface LoginProps {
    user: { email: string; uid: string } | null;
    onLogin: (user: { email: string; uid: string }) => void;
    onLogout: () => void;
}

function Login({ user, onLogin, onLogout }: LoginProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState | null;

    const [form, setForm] = useState<LoginFormState>({ email: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<LoginStatus>("idle");

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        const validationError = validateLogin(form);

        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);
        setStatus("loading");

        await new Promise(res => setTimeout(res, 800));

        if (form.email === "fail@henry.com") {
            setStatus("error");
            setError("Credenciales invalidas. Intentalo de nuevo.");
            return;
        }

        setStatus("success");
        onLogin({ email: form.email, uid: "mock-uid-123" });

        const destino = state?.from?.pathname || "/";
        navigate(destino, { replace: true })
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    if (user) {
        return (
            <div className="login-card">
                <p className="login-info">
                    Sesion activa: <strong>{user.email}</strong>
                </p>
                <button className="login-btn logout" onClick={onLogout}>
                    Cerrar sesion
                </button>
            </div>
        );
    }

    return (
        <div className="login-card">
            {state?.from && (
                <p className="login-redirect">
                    Necesitas iniciar sesion para acceder a {state.from.pathname}
                </p>
            )}
            <form className="login-form" onSubmit={handleSubmit} noValidate>
                <div className="login-form__field">
                    <input
                        className="login-form__input"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        disabled={status === "loading"}
                    />
                </div>
                <div className="login-form__field">
                    <input
                        className="login-form__input"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Contrasena"
                        disabled={status === "loading"}
                    />
                </div>
                {error && <p className="login-form__error" role="alert">{error}</p>}
                <button
                    className={`login-btn${status === "loading" ? " login-btn--loading" : ""}`}
                    type="submit"
                    disabled={status === "loading"}
                >
                    {status === "loading" ? "Iniciando sesion..." : "Iniciar sesion"}
                </button>
                {status === "success" && (
                    <p className="login-form__success" role="status">Sesion iniciada correctamente.</p>
                )}
                <p className="login-form__register">
                    ¿No tenes cuenta?{" "}
                    <Link to="/register">Registrate</Link>
                </p>
            </form>
        </div>
    )
}

export default Login