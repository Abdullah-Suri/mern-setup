import axios from "axios";
import { goToLogin, goTo403 } from "@/utils/Navigation";

const SERVER_IP = import.meta.env.VITE_APP_BASE_URL;

const apiService = axios.create({
  baseURL: SERVER_IP,
  withXSRFToken: true,
  withCredentials: true,
  origin: true
});


apiService.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    if (token && !config.url.endsWith("/login")) {
      config.headers.Authorization = `Bearer ${token}`;
    } 
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
    if (config.isPdf) {
      config.headers['Accept'] = 'application/pdf';
      config.headers['Content-Type'] = 'application/pdf';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // For Access Restrictoin
  if (error.request.status === 403) {
    const response = JSON.parse(error?.request?.response) 
    // Inactive User
    if(response.message === 'Your account is inactive. Please contact support.') {
      return Promise.reject({ customMessage: response.message });
    };
    // Inactive Role
    if(response.message === 'Your role is inactive. Contact admin.') {
      return Promise.reject({ customMessage: response.message });
    };
    goTo403()
  }
  // For unAuthorized
  if ([401, 419].includes(error.request.status)) {
      localStorage.removeItem("access_token");
      sessionStorage.removeItem("access_token");
      localStorage.removeItem("user");
      goToLogin()
  }
  return Promise.reject(error);
});

export default apiService;
