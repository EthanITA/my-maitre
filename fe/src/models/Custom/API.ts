import axios, { AxiosInstance } from "axios";
import loader from "../../decorator/loader.ts";

class API<T> {
  apiUrl: string;
  axios: AxiosInstance;
  constructor(public path: string) {
    this.apiUrl = import.meta.env.VITE_API_URL;
    this.axios = axios.create({
      baseURL: this.apiUrl,
    });
  }

  @loader
  async get(id: number): Promise<T> {
    const response = await this.axios.get(`${this.path}/${id}`);
    return response.data;
  }
  @loader
  async getAll(): Promise<T[]> {
    const response = await this.axios.get(`${this.path}`);
    return response.data;
  }
  @loader
  async create(data: T): Promise<T> {
    const response = await this.axios.post(`${this.path}`, data);
    return response.data;
  }
  @loader
  async update(id: number, data: T): Promise<T> {
    const response = await this.axios.put(`${this.path}/${id}`, data);
    return response.data;
  }
  @loader
  async delete(id: number): Promise<T> {
    const response = await this.axios.delete(`${this.path}/${id}`);
    return response.data;
  }
}

export default API;
