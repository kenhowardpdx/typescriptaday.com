import { IRouteConfiguration } from 'hapi';
import { Controller } from 'hapi-decorators';

export class BaseController implements Controller {

  constructor() {
    console.log('initializing route:', this.baseUrl);
  }

  baseUrl: string;
  routes: () => IRouteConfiguration[];
}