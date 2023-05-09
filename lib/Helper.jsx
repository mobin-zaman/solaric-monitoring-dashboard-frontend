import axios from "axios";

//local url
export const BASE_URL = "http://localhost:3789"; // API URL

//axios instance for api calls with base url and headers
const todoApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Api calls for get user data
export const getUser = async (id) => {
  const response = await todoApi.get(`/user/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api calls for  get users data
export const getUsers = async () => {
  const response = await todoApi.get(`/user`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api calls for post user
export const postUser = async (data) => {
  console.log({ data });
  const response = await todoApi.post(`/user`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api calls for delete user
export const deleteUser = async (id) => {
  const response = await todoApi.delete(`/user/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// APi calls for current user data
export const getCurrentUser = async () => {
  const response = await todoApi.get(`/auth/current-user`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api calls for update user data
export const updateUser = async (data) => {
  const id = data.id;
  const d = {
    name: data.name,
    email: data.email,
    role: data.role,
    status: data.status,
    address: data.address,
  };

  const response = await todoApi.put(`/user/${id}`, d, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api calls for user search
export const searchUser = async (data) => {
  console.log({ data });
  const response = await todoApi.get(`/user?search=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api calls for get project data
export const getProject = async (id) => {
  const response = await todoApi.get(`/project/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api calls for get projects data
export const getProjects = async () => {
  const response = await todoApi.get(`/project`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api calls for post project
export const postProject = async (data) => {
  console.log({ data });
  const response = await todoApi.post(`/project`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api calls for delete project
export const deleteProject = async (id) => {
  const response = await todoApi.delete(`/project/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api calls for user add to project
export const addUserToProject = async (data) => {

  const projectId = data.projectId;
  const userId = data.userId;
  const response = await todoApi.post(`/project/${projectId}/assign-user/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
}

// Api calls for company add to project
export const addCompanyToProject = async (data) => {
  console.log({ data });
  const projectId = data.projectId;
  const companyData = {
    name: data.companyName,
    code: data.companyCode,
  };
  const response = await todoApi.post(`/project/${projectId}/companies`, companyData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
}

// Api calls for delete user from project
export const deleteUserFromProject = async (data) => {
  console.log({ data });
  const projectId = data.projectId;
  const userId = data.userId;
  const response = await todoApi.delete(`project/${projectId}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
}

// Api calls for delete company from project
export const deleteCompanyFromProject = async (data) => {
  const projectId = data.projectId;
  const companyId = data.companyId;
  const response = await todoApi.delete(`project/${projectId}/company/${companyId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
}