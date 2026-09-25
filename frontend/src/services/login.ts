import api from "./api";

const loginUsuario = async (Correo: string, Password: string) => {
  const response = await api.post("/api/Auth/login", { Correo, Password});
  return response.data.token;
};

export default loginUsuario;
