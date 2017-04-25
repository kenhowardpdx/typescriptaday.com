import { Request, IReply } from 'hapi';
import { controller, get, config } from 'hapi-decorators';
import { BaseApiController } from './base.controller';
import _dbContext from '../../database';

@controller('/users')
export class UserApiController extends BaseApiController {

  constructor() {
    super();
  }

  @get('/')
  @config({ plugins: { sitemap: { include: true } } })
  async index(request: Request, reply: IReply) {
    const { rows: users, count } = await _dbContext.User.findAndCountAll();
    console.log(`Found ${count} Users`);
    reply(this.apiResponse(users));
  }
}