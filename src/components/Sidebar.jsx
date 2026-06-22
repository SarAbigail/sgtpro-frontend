import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="bg-light p-3"
      style={{ width: "220px", minHeight: "100vh" }}
    >
      <h5>Menú</h5>

      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/vehiculos">
            Vehículos
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/usuarios">
            Usuarios
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/insumos">
            Insumos
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/ordenes">Órdenes</Link>{" "}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
