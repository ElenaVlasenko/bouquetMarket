import ApiService from "../framework/api-service.js";
import { auth, endPoint } from "./server-const.js";

export default class BouquetsApi extends ApiService {

  constructor() {
    super(endPoint, auth);
  }

  async getList() {
    const responce = await this._load({ url: 'flowers-shop/products' });
    return ApiService.parseResponse(responce);
  }

}
