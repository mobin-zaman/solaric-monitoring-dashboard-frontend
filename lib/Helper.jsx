import axios from "axios";

//local url
export const BASE_URL = "http://localhost:3789"; // API URL

//axios instance for api calls with base url and headers
const todoApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "*", 
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

// Api calls for update user data
export const updateUser = async (data) => {

  const id = data.id;
  const d = {
    name: data.name,
    email: data.email,
    role: data.role,
    status: data.status,
    address: data.address,
  }

  console.log({d}, {id});

  const response = await todoApi.put(`/user/${id}`, d, {
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem("Token")}`,
    },
  });
  return response.data;
}

// Api calls for user search
export const searchUser = async (data) => {
  console.log({data});
  const response = await todoApi.get(`/user?search=${data}`, {
    headers: {
      "Authorization": `Bearer ${sessionStorage.getItem("Token")}`,
    },
  });
  return response.data;
}