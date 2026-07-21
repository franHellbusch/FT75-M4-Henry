import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

interface LocationState {
    from?: { pathname: string };
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


    function handleLogin() {
        onLogin({ email: "alumno@henry.com", uid: "user-123" });

        const destino = state?.from?.pathname || "/";
        navigate(destino, { replace: true })
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
            <button className="login-btn" onClick={handleLogin}>
                Iniciar sesion
            </button>
        </div>
    )
}

export default Login