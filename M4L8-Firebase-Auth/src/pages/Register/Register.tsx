import { useNavigate } from "react-router-dom";
import "./Register.css";
import { useState } from "react";
import { validateRegister } from "../../helpers/validateRegister";
import { getAuthErrorMessage } from "../../features/auth/authErrors";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";

export interface RegisterFormState {
    email: string;
    password: string;
}

type RegisterStatus = "idle" | "loading" | "success" | "error";

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState<RegisterFormState>({ email: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<RegisterStatus>("idle");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const validationError = validateRegister(form);

        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);
        setStatus("loading");

        try {
            await createUserWithEmailAndPassword(auth, form.email, form.password);
            navigate("/");
        } catch (err) {
            setStatus("error");
            setError(getAuthErrorMessage(err));
        }
    }

    return (
        <div className="register-card">
            <h2 className="register-title">Crear cuenta</h2>
            {status === "success" ? (
                <p className="register-success" role="status">Usuario registrado correctamente.</p>
            ) : (
                <form className="register-form" onSubmit={handleSubmit} noValidate>
                    <div className="register-form__field">
                        <input
                            className="register-form__input"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            disabled={status === "loading"}
                        />
                    </div>
                    <div className="register-form__field">
                        <input
                            className="register-form__input"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Contrasena"
                            disabled={status === "loading"}
                        />
                    </div>
                    {error && <p className="register-form__error" role="alert">{error}</p>}
                    <button
                        className={`register-btn${status === "loading" ? " register-btn--loading" : ""}`}
                        type="submit"
                        disabled={status === "loading"}
                    >
                        {status === "loading" ? "Registrando..." : "Registrarse"}
                    </button>
                </form>
            )}
            <p className="register-footer">
                ¿Ya tenes cuenta? <a href="/login">Inicia sesion</a>
            </p>
        </div>
    );
}

export default Register