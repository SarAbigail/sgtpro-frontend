import { useEffect, useState } from "react";
import {
  obtenerVehiculos,
  crearVehiculo,
  eliminarVehiculo,
  actualizarVehiculo,
} from "../services/vehiculoService";
import Navbar from "../components/Navbar";

function Vehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placa, setPlaca] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [kilometrajeActual, setKilometrajeActual] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [placaOriginal, setPlacaOriginal] = useState("");

  useEffect(() => {
    cargarVehiculos();
  }, []);

  const cargarVehiculos = async () => {
    try {
      const data = await obtenerVehiculos();
      setVehiculos(data);
    } catch (error) {
      console.error("Error al cargar vehículos", error);
    } finally {
      setLoading(false);
    }
  };
  const limpiarFormulario = () => {
    setPlaca("");
    setMarca("");
    setModelo("");
    setKilometrajeActual("");
    setModoEdicion(false);
  };

  if (loading) {
    return <h3>Cargando vehículos...</h3>;
  }

  const guardarVehiculo = async (e) => {
    e.preventDefault();

    try {
      const vehiculo = {
        placa,
        marca,
        modelo,
        kilometrajeActual: Number(kilometrajeActual),
      };

      if (modoEdicion) {
        await actualizarVehiculo(placaOriginal, vehiculo);

        alert("Vehículo actualizado");
      } else {
        await crearVehiculo(vehiculo);

        alert("Vehículo registrado");
      }

      setPlaca("");
      setMarca("");
      setModelo("");
      setKilometrajeActual("");

      setModoEdicion(false);

      await cargarVehiculos();
    } catch (error) {
      console.error(error);
      alert("Error al guardar");
    }
  };

  const editarVehiculo = (vehiculo) => {
    setModoEdicion(true);

    setPlacaOriginal(vehiculo.placa);

    setPlaca(vehiculo.placa);
    setMarca(vehiculo.marca);
    setModelo(vehiculo.modelo);
    setKilometrajeActual(vehiculo.kilometrajeActual);
  };

  const borrarVehiculo = async (placa) => {
    const confirmar = window.confirm(`¿Desea eliminar el vehículo ${placa}?`);

    if (!confirmar) return;

    try {
      await eliminarVehiculo(placa);

      await cargarVehiculos();

      alert("Vehículo eliminado");
    } catch (error) {
      console.error(error);
      alert("Error al eliminar");
    }
  };

  return (
    <>
      <div className="container mt-4">
        <h2>Gestión de Vehículos</h2>

        <form onSubmit={guardarVehiculo} className="card p-3 mb-4">
          <h4>Nuevo Vehículo</h4>

          <div className="row">
            <div className="col-md-3">
              <label>Placa</label>
              <input
                type="text"
                className="form-control"
                value={placa}
                onChange={(e) => setPlaca(e.target.value)}
                required
              />
            </div>

            <div className="col-md-3">
              <label>Marca</label>
              <input
                type="text"
                className="form-control"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                required
              />
            </div>

            <div className="col-md-3">
              <label>Modelo</label>
              <input
                type="text"
                className="form-control"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                required
              />
            </div>

            <div className="col-md-3">
              <label>Kilometraje</label>
              <input
                type="number"
                className="form-control"
                value={kilometrajeActual}
                onChange={(e) => setKilometrajeActual(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-success mt-3">
            {modoEdicion ? "Actualizar Vehículo" : "Guardar Vehículo"}
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
        </form>

        <table className="table table-striped table-bordered mt-3">
          <thead>
            <tr>
              <th>Placa</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Kilometraje</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {vehiculos.map((vehiculo) => (
              <tr key={vehiculo.placa}>
                <td>{vehiculo.placa}</td>
                <td>{vehiculo.marca}</td>
                <td>{vehiculo.modelo}</td>
                <td>{vehiculo.kilometrajeActual.toLocaleString()} km</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editarVehiculo(vehiculo)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => borrarVehiculo(vehiculo.placa)}
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

export default Vehiculos;
