import { Request, IReply } from 'hapi';
import { controller, get } from 'hapi-decorators';
import { BaseApiController } from './base.controller';
import _dbContext from '../../database';

@controller('/users')
export class UserApiController extends BaseApiController {

  constructor() {
    super();
  }

  @get('/')
  async index(request: Request, reply: IReply) {
    const { rows: users, count } = await _dbContext.User.findAndCountAll();
    console.log(`Found ${count} Users`);
    reply(this.apiResponse(users));
  }
}