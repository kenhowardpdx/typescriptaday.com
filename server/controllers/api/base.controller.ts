import { IRouteConfiguration } from 'hapi';
import { Controller } from 'hapi-decorators';
import * as boom from 'boom';

export class BaseApiController implements Controller {

  errorResponse = boom;

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