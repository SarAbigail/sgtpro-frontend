import api from "./api";

export const obtenerInsumos = async () => {
  const response = await api.get("/catalogoInsumos");
  return response.data;
};

export const crearInsumo = async (insumo) => {
  const response = await api.post("/catalogoInsumos", insumo);
  return response.data;
};

export const actualizarInsumo = async (id, insumo) => {
  const response = await api.put(`/catalogoInsumos/${id}`, insumo);
  return response.data;
};

export const eliminarInsumo = async (id) => {
  await api.delete(`/catalogoInsumos/${id}`);
};
