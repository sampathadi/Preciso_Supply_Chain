import axios from 'axios';

// Base URL for the backend API
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Add token to requests if it exists
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
  logout: () =>
    apiClient.post('/auth/logout'),
  register: (userData) =>
    apiClient.post('/auth/register', userData),
  getCurrentUser: () =>
    apiClient.get('/auth/me'),
};

// Asset API calls
export const assetAPI = {
  getAllAssets: (filters = {}) =>
    apiClient.get('/assets', { params: filters }),
  getAssetById: (id) =>
    apiClient.get(`/assets/${id}`),
  createAsset: (assetData) =>
    apiClient.post('/assets', assetData),
  updateAsset: (id, assetData) =>
    apiClient.put(`/assets/${id}`, assetData),
  deleteAsset: (id) =>
    apiClient.delete(`/assets/${id}`),
  searchAssets: (query) =>
    apiClient.get('/assets/search', { params: { query } }),
  getAssetStats: () =>
    apiClient.get('/assets/stats/summary'),
};

// Dashboard API calls
export const dashboardAPI = {
  getDashboardStats: () =>
    apiClient.get('/dashboard/stats'),
  getRecentActivity: (limit = 10) =>
    apiClient.get('/dashboard/activity', { params: { limit } }),
  getMetrics: () =>
    apiClient.get('/dashboard/metrics'),
  // warehouse-specific aggregation
  getWarehouse: (warehouseId) => apiClient.get(`/dashboard/warehouse/${warehouseId}`),
};

// Orders API calls
export const orderAPI = {
  getAllOrders: (filters = {}) =>
    apiClient.get('/orders', { params: filters }),
  getOrderById: (id) =>
    apiClient.get(`/orders/${id}`),
  createOrder: (orderData) =>
    apiClient.post('/orders', orderData),
  updateOrder: (id, orderData) =>
    apiClient.put(`/orders/${id}`, orderData),
  deleteOrder: (id) =>
    apiClient.delete(`/orders/${id}`),
  trackOrder: (id) =>
    apiClient.get(`/orders/${id}/track`),
};

// Shipment API calls
export const shipmentAPI = {
  getAllShipments: (filters = {}) =>
    apiClient.get('/shipments', { params: filters }),
  getShipmentById: (id) =>
    apiClient.get(`/shipments/${id}`),
  createShipment: (shipmentData) =>
    apiClient.post('/shipments', shipmentData),
  updateShipment: (id, shipmentData) =>
    apiClient.put(`/shipments/${id}`, shipmentData),
  deleteShipment: (id) =>
    apiClient.delete(`/shipments/${id}`),
  trackShipment: (id) =>
    apiClient.get(`/shipments/${id}/track`),
};

// Reports API calls
export const reportAPI = {
  getInventoryReport: (params = {}) =>
    apiClient.get('/reports/inventory', { params }),
  getShipmentReport: (params = {}) =>
    apiClient.get('/reports/shipment', { params }),
  getPerformanceReport: (params = {}) =>
    apiClient.get('/reports/performance', { params }),
  generateCustomReport: (reportConfig) =>
    apiClient.post('/reports/custom', reportConfig),
};

// Warehouse API calls
export const warehouseAPI = {
  getAll: () => apiClient.get('/warehouses'),
  getById: (id) => apiClient.get(`/warehouses/${id}`),
  create: (data) => apiClient.post('/warehouses', data),
  update: (id, data) => apiClient.put(`/warehouses/${id}`, data),
  remove: (id) => apiClient.delete(`/warehouses/${id}`),
};

// Box API
export const boxAPI = {
  getAll: () => apiClient.get('/boxes'),
  getById: (id) => apiClient.get(`/boxes/${id}`),
  create: (data) => apiClient.post('/boxes', data),
  update: (id, data) => apiClient.put(`/boxes/${id}`, data),
  remove: (id) => apiClient.delete(`/boxes/${id}`),
};

// Arrangement API
export const arrangementAPI = {
  create: (payload) => apiClient.post('/arrangements', payload),
  getLatest: (warehouseId) => apiClient.get(`/arrangements/latest/${warehouseId}`),
};

// (dashboardAPI merged above)

export default apiClient;

