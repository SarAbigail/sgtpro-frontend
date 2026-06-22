import api from "./api";

export const login = async (correo, password) => {
  const response = await api.post("/auth/login", {
    correo,
    password,
  });

  console.log("LOGIN RESPONSE:", response.data);

  const token = response.data.token;

  localStorage.setItem("token", token);

  return token;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
