import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IAxiosAdapter } from '../../domain/ports/axios.adapter.interface';

@Injectable()
export class AxiosAdapterImp implements IAxiosAdapter {
  async get<T>(url: string): Promise<T> {
    const response = await axios.get<T>(url);
    return response.data;
  }

  async post<T>(url: string, body: any): Promise<T> {
    const response = await axios.post<T>(url, body);
    return response.data;
  }

  async put<T>(url: string, body: any): Promise<T> {
    const response = await axios.put<T>(url, body);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await axios.delete<T>(url);
    return response.data;
  }
}
