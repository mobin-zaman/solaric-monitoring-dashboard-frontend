import { async } from "@firebase/util";
import { data } from "autoprefixer";
import axios from "axios";

//local url
export const BASE_URL = "http://localhost:3789"; // API URL
// export const BASE_URL = "http://localhost:3789"; // IMAGE URL

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
    companyName: data.companyName,
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

// Api calls for update project
export const updateProject = async (data) => {
  const id = data.id;
  const d = {
    name: data.name,
    fundingType: data.fundingType,
    tarrif: data.tarrif,
    dollarRate: data.dollarRate,
    exportMeterSerialNumber: data.exportMeterSerialNumber,
    importMeterSerialNumber: data.importMeterSerialNumber,
  };
  const response = await todoApi.put(`/project/${id}`, d, {
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
  const response = await todoApi.post(
    `/project/${projectId}/assign-user/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api calls for company add to project
export const addCompanyToProject = async (data) => {
  console.log({ data });
  const projectId = data.projectId;
  const companyData = {
    name: data.companyName,
    code: data.companyCode,
  };
  const response = await todoApi.post(
    `/project/${projectId}/companies`,
    companyData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api calls for company update to project
export const updateCompanyToProject = async (data) => {
  console.log({ data });
  const companyId = data.companyId;
  const companyData = {
    name: data.companyName,
    code: data.companyCode,
  };
  const response = await todoApi.put(`/company/${companyId}`, companyData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

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
};

// Api calls for delete company from project
export const deleteCompanyFromProject = async (data) => {
  const projectId = data.projectId;
  const companyId = data.companyId;
  const response = await todoApi.delete(
    `project/${projectId}/company/${companyId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api calls for project search
export const searchProject = async (data) => {
  const response = await todoApi.get(`/project?search=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api calls for get company data
export const getCompany = async (id) => {
  const response = await todoApi.get(`/company/get-one/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api calls for building add to company
export const addBuildingToCompany = async (data) => {
  const companyId = data.companyId;
  const buildingData = {
    name: data.buildingName,
    code: data.buildingCode,
  };
  const response = await todoApi.post(
    `/company/${companyId}/building`,
    buildingData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api calls for delete building from company
export const deleteBuildingFromCompany = async (data) => {
  const buildingId = data.buildingId;
  const response = await todoApi.delete(`/company/building/${buildingId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

//Api calls for company search
export const searchCompany = async (data) => {
  const searchValue = data.search;
  const projectId = data.projectId;
  const response = await todoApi.get(
    `/company/${projectId}?search=${searchValue}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api calls for get building data
export const getBuilding = async (id) => {
  const response = await todoApi.get(`/building/find-one/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api calls for building update
export const updateBuilding = async (data) => {
  const id = data.buildingId;
  const d = {
    name: data.buildingName,
    code: data.buildingCode,
  };
  const response = await todoApi.put(`/building/${id}`, d, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api calls for inverter add to building
export const addInverterToBuilding = async (data) => {
  const buildingId = data.buildingId;
  const inverterId = data.inverterId;
  const response = await todoApi.post(
    `/building/${buildingId}/inverter/${inverterId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api calls for delete inverter from building
export const deleteInverterFromBuilding = async (data) => {
  const inverterId = data.inverterId;
  const response = await todoApi.delete(`/building/inverter/${inverterId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

//Api calls for building search
export const searchBuilding = async (data) => {
  const searchValue = data.search;
  const companyId = data.companyId;
  const response = await todoApi.get(
    `/building/${companyId}?search=${searchValue}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api calls for get inverter data
export const getInverter = async (id) => {
  const response = await todoApi.get(`/inverter/find-one/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api calls for inverter search
export const searchInverterForBuilding = async (data) => {
  const searchValue = data.search;
  const buildingId = data.buildingId;
  const response = await todoApi.get(
    `/building/${buildingId}/inverter/search?search=${searchValue}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

//Api calls for search user as user-role
export const searchUserAsUserRole = async (data) => {
  const searchValue = data;
  const response = await todoApi.get(`/user/user-role?search=${searchValue}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

//Api calls for search inverter for assign in building
export const searchInverterForAssignInBuilding = async (data) => {
  const searchValue = data.search;
  const buildingId = data.buildingId;
  const response = await todoApi.get(
    `/building/inverter/${buildingId}/search?search=${searchValue}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

//Inverter

// Api calls for get inverters data
export const getInverters = async () => {
  const response = await todoApi.get(`/inverter`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api calls for inverter search
export const searchInverter = async (data) => {
  const searchValue = data;
  const response = await todoApi.get(`/inverter?search=${searchValue}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api calls for update inverter data
export const updateInverter = async (data) => {
  const inverterId = data.inverterId;
  const inverterData = {
    capacity: data.capacity,
    code: data.code,
    note: data.note,
  };
  const response = await todoApi.put(`/inverter/${inverterId}`, inverterData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api calls for get Historical Data For Project sun hrs bar chart data
export const getHistoricalDataForProjectSunHrsBarChartData = async (id) => {
  const response = await todoApi.get(
    `/dashboard/project/bar-chart-view/sun-hrs/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api calls for get Historical Data For Company
export const getHistoricalDataForCompany = async (id) => {
  const response = await todoApi.get(`/dashboard/company/historic-view/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api calls for get Historical Data For Company sun hrs bar chart data
export const getHistoricalDataForCompanySunHrsBarChartData = async (id) => {
  const response = await todoApi.get(
    `/dashboard/company/bar-chart-view/sun-hrs/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api calls for get Historical Data For Building
export const getHistoricalDataForBuilding = async (id) => {
  const response = await todoApi.get(
    `/dashboard/building/historic-view/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api calls for get Historical Data For Building sun hrs bar chart data
export const getHistoricalDataForBuildingSunHrsBarChartData = async (id) => {
  const response = await todoApi.get(
    `/dashboard/building/bar-chart-view/sun-hrs/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api calls for get Historical Data For Inverter
export const getHistoricalDataForInverter = async (id) => {
  const response = await todoApi.get(
    `/dashboard/inverter/historic-view/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api calls for get Historical Data For Inverter sun hrs bar chart data
export const getHistoricalDataForInverterSunHrsBarChartData = async (id) => {
  const response = await todoApi.get(
    `/dashboard/inverter/bar-chart-view/sun-hrs/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api calls for get impact data for project
export const getImpactDataForProject = async (id) => {
  const response = await todoApi.get(
    `/dashboard/project/environment-impact/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api calls for get impact data for company
export const getImpactDataForCompany = async (id) => {
  const response = await todoApi.get(
    `/dashboard/company/environment-impact/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api calls for get impact data for building
export const getImpactDataForBuilding = async (id) => {
  const response = await todoApi.get(
    `/dashboard/building/environment-impact/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api calls for get impact data for inverter
export const getImpactDataForInverter = async (id) => {
  const response = await todoApi.get(
    `/dashboard/inverter/environment-impact/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api calls for get daily View for project
export const getDailyViewForProject = async (id) => {
  const response = await todoApi.get(
    `/dashboard/project/power-line-view/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api calls for get daily View for company
export const getDailyViewForCompany = async (id) => {
  const response = await todoApi.get(
    `/dashboard/company/power-line-view/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api calls for get daily View for building
export const getDailyViewForBuilding = async (id) => {
  const response = await todoApi.get(
    `/dashboard/building/power-line-view/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api calls for get daily View for inverter
export const getDailyViewForInverter = async (id) => {
  const response = await todoApi.get(
    `/dashboard/inverter/power-line-view/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api call for get all meter data
export const getMeters = async () => {
  const response = await todoApi.get(`/meter`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api call for delete meter
export const deleteMeter = async (meterId) => {
  const response = await todoApi.delete(`/meter/${meterId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api call for search meter
export const searchMeter = async (data) => {
  const response = await todoApi.get(`/meter?search=${data}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api call for get meter
export const getMeter = async (meterId) => {
  const response = await todoApi.get(`/meter/${meterId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api call for update meter
export const updateMeter = async (data) => {
  const meterId = data?.meterId;
  const meterData = {
    importMeterCode: data?.importMeterCode,
    exportMeterCode: data?.exportMeterCode,
    importMeterSerialNumber: data?.importMeterSerialNumber,
    exportMeterSerialNumber: data?.exportMeterSerialNumber,
  };
  const response = await todoApi.put(`/meter/${meterId}`, meterData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api call for get meters for building
export const getMetersForBuilding = async (buildingId) => {
  const response = await todoApi.get(`/meter/building/${buildingId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  });
  return response.data;
};

// Api call for search meter for building
export const searchMeterForBuilding = async (data) => {
  const buildingId = data?.buildingId;
  const searchValue = data.search;
  const response = await todoApi.get(
    `/meter/building/${buildingId}?search=${searchValue}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api call for post meter for building
export const postMeterForBuilding = async (data) => {
  const buildingId = data?.buildingId;
  const meterData = {
    importMeterCode: data?.importMeterCode,
    exportMeterCode: data?.exportMeterCode,
    importMeterSerialNumber: data?.importMeterSerialNumber,
    exportMeterSerialNumber: data?.exportMeterSerialNumber,
  };
  const response = await todoApi.post(
    `/building/meter/${buildingId}`,
    meterData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api call for get collect time for inverter hourly data
export const getCollectTimeForInverterHourlyData = async (inverterId) => {
  const response = await todoApi.get(
    `/dashboard/inverter/collect-times/${inverterId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api call for get inverter hour data using collect time
export const getInverterHourData = async (data) => {
  const inverterId = data?.selectedOptionIdInverter;
  const collectTime =
    data?.dailyViewDataForProjectPowerLineChartDataDaySelected;
  const response = await todoApi.get(
    `/dashboard/inverter/frame-data/${inverterId}/${collectTime}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api call for get daily view collect time
export const getDailyViewCollectTime = async (collectionKey) => {
  const key = Object.keys(collectionKey)[0];
  const id = collectionKey[key];

  const response = await todoApi.get(
    `/dashboard/daily-view/${key}/collect-times/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api call for get Daily View Data
export const getDailyViewData = async (data) => {
  const key = Object.keys(data.collectionKey)[0];
  const id = data.collectionKey[key];
  const dateKey = data.dateKey;
  const response = await todoApi.get(
    `/dashboard/daily-view/${key}/frame-data/${id}/${dateKey}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api call for update inverters in project
export const updateInvertersInProject = async (data) => {
  const projectId = data?.projectId;
  const response = await todoApi.put(`/project/${projectId}/update-inverters`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    });
  return response.data;
};

// Api call for historical peak power data
export const getHistoricalPeakPowerData = async (data) => {
  const key = Object.keys(data.collectionKey)[0];
  const id = data.collectionKey[key];
  const dateKey = data.dateKey;
  const response = await todoApi.get(
    `/dashboard/historic-view/peak-power/${key}/${id}/${dateKey}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api call for historical peak power data
export const getHistoricalSunHours = async (data) => {
  const key = Object.keys(data.collectionKey)[0];
  const id = data.collectionKey[key];
  const dateKey = data.dateKey;
  const response = await todoApi.get(
    `/dashboard/${key}/bar-chart-view/sun-hrs/${id}/${dateKey}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api calls for get Historical Data
export const getHistoricalData = async (collectionKey) => {
  const key = Object.keys(collectionKey)[0];
  const id = collectionKey[key];

  const response = await todoApi.get(
    `/dashboard/${key}/historic-view/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api call for historical data with date key
export const getHistoricalDataWithDateKey = async (data) => {
  const key = Object.keys(data.collectionKey)[0];
  const id = data.collectionKey[key];
  const dateKey = data.dateKey;
  const response = await todoApi.get(
    `/dashboard/${key}/historic-view/${id}/${dateKey}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
};

// Api calls for get Impact Data
export const getImpactData = async (collectionKey) => {
  const key = Object.keys(collectionKey)[0];
  const id = collectionKey[key];

  const response = await todoApi.get(
    `/dashboard/${key}/environment-impact/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
}

// Api call for impact data with date key
export const getImpactDataWithDateKey = async (data) => {
  const key = Object.keys(data.collectionKey)[0];
  const id = data.collectionKey[key];
  const dateKey = data.dateKey;
  const response = await todoApi.get(
    `/dashboard/${key}/environment-impact/${id}/${dateKey}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
}

// Api call for get Live Power Flow Data
export const getLivePowerFlowData = async (collectionKey) => {
  const key = Object.keys(collectionKey)[0];
  const id = collectionKey[key];
  const response = await todoApi.get(
    `/dashboard/live-view/${key}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    }
  );
  return response.data;
}
