import { useEffect, useState } from "react";
import {
  obtenerInsumos,
  crearInsumo,
  actualizarInsumo,
  eliminarInsumo,
} from "../services/insumoService";
import { roles } from "../data/roles";
import Navbar from "../components/Navbar";

function Insumos() {
  const [insumos, setInsumos] = useState([]);

  const [idInsumo, setIdInsumo] = useState(0);
  const [codigoInterno, setCodigoInterno] = useState("");
  const [nombre, setNombre] = useState("");
  const [unidadMedida, setUnidadMedida] = useState("");
  const [costoUnitario, setCostoUnitario] = useState("");

  const [modoEdicion, setModoEdicion] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarInsumos();
  }, []);

  const cargarInsumos = async () => {
    try {
      const data = await obtenerInsumos();
      setInsumos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const limpiarFormulario = () => {
    setIdInsumo(0);
    setCodigoInterno("");
    setNombre("");
    setUnidadMedida("");
    setCostoUnitario("");
    setModoEdicion(false);
  };

  const guardarInsumo = async (e) => {
    e.preventDefault();

    const insumo = {
      idInsumo,
      codigoInterno,
      nombre,
      unidadMedida,
      costoUnitario: Number(costoUnitario),
    };

    try {
      if (modoEdicion) {
        await actualizarInsumo(idInsumo, insumo);
        alert("Insumo actualizado");
      } else {
        await crearInsumo(insumo);
        alert("Insumo registrado");
      }

      limpiarFormulario();
      await cargarInsumos();
    } catch (error) {
      console.error(error);
      alert("Error al guardar");
    }
  };

  const editarInsumo = (insumo) => {
    setModoEdicion(true);

    setIdInsumo(insumo.idInsumo);
    setCodigoInterno(insumo.codigoInterno);
    setNombre(insumo.nombre);
    setUnidadMedida(insumo.unidadMedida);
    setCostoUnitario(insumo.costoUnitario);
  };

  const borrarInsumo = async (id) => {
    const confirmar = window.confirm("¿Desea eliminar este insumo?");

    if (!confirmar) return;

    try {
      await eliminarInsumo(id);
      await cargarInsumos();

      alert("Insumo eliminado");
    } catch (error) {
      console.error(error);
      alert("Error al eliminar");
    }
  };
  return (
    <>
      <div className="container mt-4">
        <h2>Gestión de Insumos</h2>
        <form onSubmit={guardarInsumo} className="card p-3 mb-4">
          <h4>{modoEdicion ? "Editar Insumo" : "Nuevo Insumo"}</h4>
          <div className="row">
            <div className="col-md-3">
              <label>Código Interno</label>
              <input
                type="text"
                className="form-control"
                value={codigoInterno}
                onChange={(e) => setCodigoInterno(e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <label>Nombre</label>
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <label>Unidad Medida</label>
              <input
                type="text"
                className="form-control"
                value={unidadMedida}
                onChange={(e) => setUnidadMedida(e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <label>Costo Unitario</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                value={costoUnitario}
                onChange={(e) => setCostoUnitario(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success mt-3">
              {modoEdicion ? "Actualizar Insumo" : "Guardar Insumo"}
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
              <th>Código</th>
              <th>Nombre</th>
              <th>Unidad</th>
              <th>Costo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {insumos.map((insumo) => (
              <tr key={insumo.idInsumo}>
                <td>{insumo.idInsumo}</td>

                <td>{insumo.codigoInterno}</td>

                <td>{insumo.nombre}</td>

                <td>{insumo.unidadMedida}</td>

                <td>S/ {insumo.costoUnitario}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editarInsumo(insumo)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => borrarInsumo(insumo.idInsumo)}
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

export default Insumos;
