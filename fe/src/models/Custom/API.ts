import axios, { AxiosInstance } from "axios";
import toggle from "../../decorator/toggle.ts";

let loaderStore = null;
let notificationStore = null;

export const stores = {
  setLoaderStore: (store) => (loaderStore = store()),
  setNotificationStore: (store) => (notificationStore = store()),
};

class API<T> {
  protected apiUrl: string;
  public axios: AxiosInstance;

  constructor(
    public path: string,
    public loader: boolean = true,
    public notification: boolean = true
  ) {
    this.apiUrl = import.meta.env.VITE_API_URL;
    this.axios = axios.create({
      baseURL: `${this.apiUrl}/${this.path}`,
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
    const response = await this.axios.get<T>(`${id}`);
    return response.data;
  }

  @toggle("notification", false)
  async getAll(): Promise<T[]> {
    const response = await this.axios.get<T[]>("");
    return response.data;
  }

  async create(data: T): Promise<T> {
    const response = await this.axios.post<T>("", data);
    return response.data;
  }

  async update(id: number, data: T): Promise<T> {
    const response = await this.axios.put<T>(`${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<any> {
    const response = await this.axios.delete(`${id}`);
    return response.data;
  }
}

export default API;
