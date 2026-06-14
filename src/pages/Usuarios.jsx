import { useEffect, useState } from "react";
import {
  obtenerUsuarios,
  crearUsuario,
  eliminarUsuario,
  actualizarUsuario,
} from "../services/usuarioService";
import { roles } from "../data/roles";
import Navbar from "../components/Navbar";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [idUsuario, setIdUsuario] = useState(0);
  const [loading, setLoading] = useState(true);
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [rolSeleccionado, setRolSeleccionado] = useState(roles[0]);
  const [modoEdicion, setModoEdicion] = useState(false);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const data = await obtenerUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios", error);
    } finally {
      setLoading(false);
    }
  };
  const limpiarFormulario = () => {
    setIdUsuario(0);
    setNombreCompleto("");
    setCorreo("");
    setPassword("");
    setRolSeleccionado(roles[0]);
    setModoEdicion(false);
  };

  if (loading) {
    return <h3>Cargando usuarios...</h3>;
  }

  const guardarUsuario = async (e) => {
    e.preventDefault();

    const usuario = {
      idUsuario,
      rol: rolSeleccionado,
      nombreCompleto,
      correo,
      password,
    };

    try {
      if (modoEdicion) {
        await actualizarUsuario(idUsuario, usuario);
        alert("Usuario actualizado");
      } else {
        await crearUsuario(usuario);
        alert("Usuario registrado");
      }

      limpiarFormulario();

      await cargarUsuarios();
    } catch (error) {
      console.error(error);
      alert("Error al guardar usuario");
    }
  };

  const editarUsuario = (usuario) => {
    setModoEdicion(true);

    setIdUsuario(usuario.idUsuario);
    setNombreCompleto(usuario.nombreCompleto);
    setCorreo(usuario.correo);

    // Por seguridad no cargamos el hash
    setPassword("");

    setRolSeleccionado(usuario.rol);
  };

  const borrarUsuario = async (id) => {
    const confirmar = window.confirm(`¿Desea eliminar el usuario ${id}?`);

    if (!confirmar) return;

    try {
      await eliminarUsuario(id);
      await cargarUsuarios();

      alert("Usuario eliminado");
    } catch (error) {
      console.error(error);
      alert("Error al eliminar");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Gestión de Usuarios</h2>
        <form onSubmit={guardarUsuario} className="card p-3 mb-4">
          <h4>{modoEdicion ? "Editar Usuario" : "Nuevo Usuario"}</h4>
          <div className="row">
            <div className="col-md-3">
              <label>Nombre Completo</label>
              <input
                type="text"
                className="form-control"
                value={nombreCompleto}
                onChange={(e) => setNombreCompleto(e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <label>Correo</label>
              <input
                type="email"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <label>Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <label>Rol</label>
              <select
                className="form-select"
                value={rolSeleccionado.idRol}
                onChange={(e) =>
                  setRolSeleccionado(
                    roles.find((rol) => rol.idRol === Number(e.target.value)),
                  )
                }
              >
                {roles.map((rol) => (
                  <option key={rol.idRol} value={rol.idRol}>
                    {rol.nombre}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-success mt-3">
              {modoEdicion ? "Actualizar Usuario" : "Guardar Usuario"}
            </button>
            {modoEdicion && (
              <button
                type="button"
                className="btn btn-secondary mt-3 ms-2"
                onClick={limpiarFormulario}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.idUsuario}>
                <td>{usuario.idUsuario}</td>

                <td>{usuario.nombreCompleto}</td>

                <td>{usuario.correo}</td>

                <td>{usuario.rol.nombre}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editarUsuario(usuario)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => borrarUsuario(usuario.idUsuario)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Usuarios;
