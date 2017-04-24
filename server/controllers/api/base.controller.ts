import { IRouteConfiguration } from 'hapi';
import { Controller } from 'hapi-decorators';

export class BaseApiController implements Controller {

  constructor() {
    this.baseUrl = `/api${this.baseUrl}`;
    console.log('initializing route:', this.baseUrl);
  }

  baseUrl: string;
  routes: () => IRouteConfiguration[];

  apiResponse(data: any) {
    return { data };
  }
}