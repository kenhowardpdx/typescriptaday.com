import { Server, Request, IReply } from 'hapi';
import * as Controllers from '../controllers';

export const register: any = function register(server: Server, options, next) {

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: './',
        redirectToSlash: true,
        listing: true
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/dashboard/{param*}',
    handler: {
      directory: {
        path: './dashboard',
        listing: false,
        index: ['index.html']
      }
    }
  });

  server.ext('onPostHandler', (request: Request, reply: IReply) => {
    const response = request.response;
    const isDashboard = request.path.startsWith('/dashboard');
    if (isDashboard && response.isBoom && response['output'].statusCode === 404) {
      return reply.file('../public/dashboard/index.html');
    }
    return reply.continue();
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
