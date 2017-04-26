import { Request, IReply } from 'hapi';
import { controller, get, post, validate, config } from 'hapi-decorators';
import * as Joi from 'joi';
import { BaseApiController } from './base.controller';
import _dbContext from '../../database';
import { UserInstance } from "../../models";

@controller('/users')
export class UserApiController extends BaseApiController {

  constructor() {
    super();
  }

  @get('/')
  @config({
    auth: 'jwt'
  })
  async index(_, reply: IReply) {
    let query;
    let users: UserInstance[];
    let count: number;
    
    try {
      query = await _dbContext.User.findAndCountAll();
      users = query['rows'];
      count = query['count'];

      console.log(`Found ${count} Users`);
      reply(this.apiResponse(users));
    } catch (error) {
      reply(this.errorResponse.create(500, error.message));
    }
  }

  @post('/')
  @config({
    auth: 'jwt'
  })
  @validate({
    payload: Joi.object({
      email: Joi.string().email().required(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      password: Joi.string().required()
    })
  })
  async create(request: Request, reply: IReply) {
    let { email, firstName, lastName, password } = request.payload;
    let user: UserInstance;
    
    try {
      user = await _dbContext.User.create({ Email: email, FirstName: firstName, LastName: lastName, Password: password });
      const json = user.toJSON();
      delete json.Password;
      reply(this.apiResponse(json));
    } catch (error) {
      reply(this.errorResponse.create(500, error.message));
    }
  }
}