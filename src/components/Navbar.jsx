import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          SGTpro
        </Link>

        <div className="navbar-nav">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>

          <Link className="nav-link" to="/vehiculos">
            Vehículos
          </Link>

          <Link className="nav-link" to="/usuarios">
            Usuarios
          </Link>
        </div>

        <button className="btn btn-danger" onClick={logout}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
