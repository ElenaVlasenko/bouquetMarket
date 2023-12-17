import ApiService from '../framework/api-service.js';
import { auth, endPoint } from './server-const.js';

export default class CartApi extends ApiService {

  constructor() {
    super(endPoint, auth);
  }

  async add(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const response = await this._load({
      url: `flowers-shop/products/${id}`,
      method: 'PUT',
      headers
    });

    return response.json();
  }

  async get() {
    const responce = await this._load({ url: 'flowers-shop/cart' });
    return responce.json();
  }

  async delete(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    await this._load({
      url: `flowers-shop/products/${id}`,
      method: 'DELETE',
      headers
    });
  }

}
