import { useState } from "react";
import {
  crearOrden,
  agregarRequerimiento,
  despacharRequerimiento,
} from "../services/ordenService";
import Navbar from "../components/Navbar";

function Ordenes() {
  const [idJefeTaller, setIdJefeTaller] = useState("");
  const [idMecanico, setIdMecanico] = useState("");
  const [idOt, setIdOt] = useState("");

  const [idRequerimiento, setIdRequerimiento] = useState("");
  const [cantidad, setCantidad] = useState(0);

  const handleCrearOrden = async () => {
    const orden = {
      idOt: 0,
      idJefeTaller: Number(idJefeTaller),
      idMecanico: Number(idMecanico),
      fechaInternamiento: new Date().toISOString(),
      fechaSalida: new Date().toISOString(),
      diagnosticoMecanico: "",
      fallasReparadas: "",
      costoTotal: 0,
      estado: "EN_REVISION",
      requerimientos: [],
    };

    try {
      const res = await crearOrden(orden);
      setIdOt(res.idOt);

      alert("OT creada: " + res.idOt);
    } catch (err) {
      console.error(err);
      alert("Error al crear OT");
    }
  };

  const handleAgregarReq = async () => {
    const req = {
      idRequerimiento: 0,
      idInsumo: 1,
      codigoInsumo: "",
      nombreInsumo: "",
      cantidadSolicitada: Number(cantidad),
      cantidadEntregada: 0,
      subTotal: 0,
    };

    try {
      const res = await agregarRequerimiento(idOt, req);
      alert("Requerimiento agregado");
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDespachar = async () => {
    try {
      const res = await despacharRequerimiento(idRequerimiento, cantidad);

      alert("Despachado correctamente");
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <h2>Órdenes de Trabajo</h2>

        {/* CREAR OT */}
        <div className="card p-3 mb-3">
          <h5>Crear Orden</h5>

          <input
            placeholder="ID Jefe Taller"
            value={idJefeTaller}
            onChange={(e) => setIdJefeTaller(e.target.value)}
          />

          <input
            placeholder="ID Mecánico"
            value={idMecanico}
            onChange={(e) => setIdMecanico(e.target.value)}
          />

          <button onClick={handleCrearOrden}>Crear OT</button>
        </div>

        {/* REQUERIMIENTO */}
        <div className="card p-3 mb-3">
          <h5>Agregar Requerimiento</h5>

          <input
            placeholder="ID OT"
            value={idOt}
            onChange={(e) => setIdOt(e.target.value)}
          />

          <input
            placeholder="Cantidad"
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />

          <button onClick={handleAgregarReq}>Agregar</button>
        </div>

        {/* DESPACHO */}
        <div className="card p-3">
          <h5>Despachar Insumo</h5>

          <input
            placeholder="ID Requerimiento"
            value={idRequerimiento}
            onChange={(e) => setIdRequerimiento(e.target.value)}
          />

          <input
            placeholder="Cantidad Entregada"
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />

          <button onClick={handleDespachar}>Despachar</button>
        </div>
      </div>
    </>
  );
}

export default Ordenes;
