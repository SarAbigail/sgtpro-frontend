import api from "./api";

export const obtenerVehiculos = async () => {
  const response = await api.get("/vehiculos");
  return response.data;
};

export const crearVehiculo = async (vehiculo) => {
  const response = await api.post("/vehiculos", vehiculo);
  return response.data;
};

export const eliminarVehiculo = async (placa) => {
  await api.delete(`/vehiculos/${placa}`);
};

export const actualizarVehiculo = async (placa, vehiculo) => {
  const response = await api.put(`/vehiculos/${placa}`, vehiculo);
  return response.data;
};
