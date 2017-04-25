import { Request, IReply } from 'hapi';
import { controller, get } from 'hapi-decorators';
import { BaseApiController } from './base.controller';

@controller('/')
export class MainApiController extends BaseApiController {

  constructor() {
    super();
  }

  @get('/')
  index(request: Request, reply: IReply) {
    reply(this.apiResponse({ message: 'welcome' }));
  }
}