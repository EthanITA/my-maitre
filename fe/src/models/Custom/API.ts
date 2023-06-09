import axios, { AxiosInstance } from "axios";
import notification from "../../store/notification";
import loader from "../../store/loader.ts";
import toggle from "../../decorator/toggle.ts";

const loaderStore = loader();
const notificationStore = notification();

class API<T> {
  apiUrl: string;
  axios: AxiosInstance;
  constructor(
    public path: string,
    public loader: boolean = true,
    public notification: boolean = true
  ) {
    this.apiUrl = import.meta.env.VITE_API_URL;
    this.axios = axios.create({
      baseURL: this.apiUrl,
    });

    this.setInterceptors();
  }

  private setInterceptors() {
    const errorHandler = (error: any) => {
      const errorCode = error.response?.status || error.code;

      if (this.loader) loaderStore.setLoading(false);
      notificationStore.addNotification({
        type: "danger",
        message: `status.${errorCode}`,
        timeout: 7000,
      });
      return Promise.reject(error);
    };

    this.axios.interceptors.request.use((config) => {
      if (this.loader) loaderStore.setLoading(true);
      return config;
    }, errorHandler);

    this.axios.interceptors.response.use((response) => {
      if (this.loader) loaderStore.setLoading(false);
      if (this.notification)
        notificationStore.addNotification({
          type: "success",
          message: `status.${response.status}`,
          timeout: 2000,
        });
      return response;
    }, errorHandler);
  }

  @toggle("notification", false)
  async get(id: number): Promise<T> {
    const response = await this.axios.get<T>(`${this.path}/${id}`);
    return response.data;
  }

  @toggle("notification", false)
  async getAll(): Promise<T[]> {
    const response = await this.axios.get<T[]>(`${this.path}`);
    return response.data;
  }
  async create(data: T): Promise<T> {
    const response = await this.axios.post<T>(`${this.path}`, data);
    return response.data;
  }

  async update(id: number, data: T): Promise<T> {
    const response = await this.axios.put<T>(`${this.path}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<any> {
    const response = await this.axios.delete(`${this.path}/${id}`);
    return response.data;
  }
}

export default API;
