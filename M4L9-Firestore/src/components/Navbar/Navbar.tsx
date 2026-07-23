import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../features/auth/Authenticator";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

function Navbar() {
    const { user } = useAuth();

    async function handleLogout() {
        await signOut(auth);
    }

    return <nav className="navbar">
        <Link to="/" className="navbar__brand">Todo App</Link>
        <div className="navbar__actions">
            {user ? (
                <>
                    <span className="navbar__user">{user.email}</span>
                    <button className="navbar__btn navbar__btn--logout" onClick={handleLogout}>
                        Cerrar sesion
                    </button>
                </>
            ) : (
                <Link to="/login" className="navbar__btn">Iniciar sesion</Link>
            )}
        </div>
    </nav>
}

export default Navbar