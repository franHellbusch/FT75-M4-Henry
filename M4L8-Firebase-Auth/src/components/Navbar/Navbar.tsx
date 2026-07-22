import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return <nav className="navbar">
        <Link to="/" className="navbar-link">Mis tareas</Link>
        <Link to="/login" className="navbar-link">Cuenta</Link>
    </nav>
}

export default Navbar