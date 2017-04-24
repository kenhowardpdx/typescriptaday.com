import { Server } from 'hapi';
import * as Controllers from '../controllers';

export const register: any = function register(server: Server, options, next) {
  server.route({
    method: 'GET',
    path: '/javascripts/{param*}',
    handler: {
      directory: {
        path: './javascripts',
        redirectToSlash: true,
        listing: true
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/stylesheets/{param*}',
    handler: {
      directory: {
        path: './stylesheets',
        redirectToSlash: true,
        listing: true
      }
    }
  });

  for (let controllerKey in Controllers) {
    let controller = new Controllers[controllerKey]();
    server.route(controller.routes());
  }

  next();
};


register.attributes = {
  name: 'Routes',
  version: '1.0.0'
};