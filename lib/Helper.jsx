import axios from "axios";

//local url
export const BASE_URL = "http://127.0.0.1:3789"; // API URL

//axios instance for api calls with base url and headers
const todoApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'multipart/form-data',
  },
});

// Api calls for  get users data from backend
export const getUsers = async () => {
  const response = await todoApi.get(`/user`, {
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem("Token")}`,
    },
  });
  return response.data;
}

// Api calls for post user to backend
export const postUser = async (data) => {
  console.log({data});
  const response = await todoApi.post(`/user`, data, {
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem("Token")}`,
    },
  });
  return response.data;
}

// Api calls for delete user from backend
export const deleteUser = async (id) => {
  const response = await todoApi.delete(`/user/${id}`, {
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem("Token")}`,
    },
  });
  return response.data;
}

// APi calls for current user data
export const getCurrentUser = async () => {
  const response = await todoApi.get(`/auth/current-user`, {
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem("Token")}`,
    },
  });
  return response.data;
}