import axios, { AxiosInstance } from "axios";

class API<T> {
  apiUrl: string;
  axios: AxiosInstance;
  constructor(public path: string) {
    this.apiUrl = import.meta.env.VITE_API_URL;
    this.axios = axios.create({
      baseURL: this.apiUrl,
    });
  }

  async get(id: number): Promise<T> {
    const response = await this.axios.get(`${this.path}/${id}`);
    return response.data;
  }

  async getAll(): Promise<T[]> {
    const response = await this.axios.get(`${this.path}`);
    return response.data;
  }

  async create(data: T): Promise<T> {
    const response = await this.axios.post(`${this.path}`, data);
    return response.data;
  }

  async update(id: number, data: T): Promise<T> {
    const response = await this.axios.put(`${this.path}/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<T> {
    const response = await this.axios.delete(`${this.path}/${id}`);
    return response.data;
  }
}

export default API;
