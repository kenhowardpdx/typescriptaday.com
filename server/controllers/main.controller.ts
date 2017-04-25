import { Request, IReply } from 'hapi';
import { controller, get } from 'hapi-decorators';
import { BaseController } from './base.controller';

@controller('/')
export class MainController extends BaseController {

  @get('/')
  index(request: Request, reply: IReply) {
    reply.view('page', { title: 'Welcome' });
  }
  
}