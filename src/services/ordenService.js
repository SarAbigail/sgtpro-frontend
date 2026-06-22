import api from "./api";

export const crearOrden = async (orden) => {
  const res = await api.post("/ordenes", orden);
  return res.data;
};

export const agregarRequerimiento = async (idOt, req) => {
  const res = await api.post(`/ordenes/${idOt}/requerimientos`, req);
  return res.data;
};

export const despacharRequerimiento = async (
  idRequerimiento,
  cantidadEntregada,
) => {
  const res = await api.patch(
    `/ordenes/requerimientos/${idRequerimiento}/despachar`,
    null,
    {
      params: { cantidadEntregada },
    },
  );
  return res.data;
};
