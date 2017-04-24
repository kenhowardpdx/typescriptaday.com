import { Request, IReply } from 'hapi';
import { controller, get, config } from 'hapi-decorators';
import { BaseApiController } from './base.controller';

@controller('/')
export class MainApiController extends BaseApiController {

  constructor() {
    super();
  }

  @get('/')
  @config({ plugins: { sitemap: { include: true } } })
  index(request: Request, reply: IReply) {
    reply(this.apiResponse({ message: 'welcome' }));
  }
}