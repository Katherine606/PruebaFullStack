import api from "./api";

export const obtenerFeedbacks = async () => {
  const response = await api.get("/api/Feedbacks");
  return response.data;
};

export const obtenerFeedbackPorId = async (id: number) => {
  const response = await api.get(`/api/Feedbacks/${id}`);
  return response.data;
};

export const crearFeedback = async (data: { titulo: string; descripcion: string; categoria: string; estado: string }) => {
  const response = await api.post("/api/Feedbacks", data);
  return response.data;
};
export const votarFeedback = async (id: number) => {

  const response = await api.patch(`/api/Feedbacks/${id}/votar`);
  return response.data; 
};

export const cambiarEstadoFeedback = async (id: number, nuevoEstado: string) => {
  const response = await api.patch(`/api/Feedbacks/${id}/estado`, { nuevoEstado });
  return response.data;
};