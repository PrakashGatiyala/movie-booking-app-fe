import axios from "axios";

export const apiInstance = axios.create({
  baseURL: "http://localhost:8000",
  responseType: "json",
});

apiInstance.interceptors.request.use((reqPlayload) => {
  const token = localStorage.getItem("token");
  if (token) {
    reqPlayload.headers.Authorization = `Bearer ${token}`;
  }
  return reqPlayload;
});
