import axios from 'axios';

class ApiSrv {
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
  }

  async get<T>(path: string, param: Object): Promise<T> {
    const queryParam = Object.keys(param).map((key: keyof typeof param) => {
      const value = param[key];
      const cleanedValue = value instanceof Object ? JSON.stringify(value) : value;
      return `${key}=${cleanedValue}`;
    }).join('&');

    const response = await axios.get<T>(`${this.url}${path}?${queryParam}`);
    return response.data;
  }
}

export default ApiSrv;