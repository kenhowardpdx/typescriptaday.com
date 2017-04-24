import { Request, IReply } from 'hapi';
import { controller, get, config } from 'hapi-decorators';
import { BaseController } from './base.controller';

@controller('/')
export class MainController extends BaseController {

  @get('/')
  @config({ plugins: { sitemap: { include: true } } })
  index(request: Request, reply: IReply) {
    reply.view('page', { title: 'Welcome' });
  }
  
}