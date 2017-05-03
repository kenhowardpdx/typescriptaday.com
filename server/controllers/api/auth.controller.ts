import { Request, IReply } from 'hapi';
import { controller, post, validate } from 'hapi-decorators';
import * as Joi from 'joi';
import * as jwt from 'jsonwebtoken';
import { BaseApiController } from './base.controller';
import { dbContext } from '../../database';
import { UserInstance } from '../../models';

@controller('/auth')
export class AuthApiController extends BaseApiController {

  constructor() {
    super();
  }

  @post('/')
  @validate({
    payload: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  })
  async index(request: Request, reply: IReply) {
    let { email, password } = request.payload;
    let user: UserInstance;
    let token: string;
    let subject: { email: string; name: string; };

    try {
      user = await dbContext.models.User.scope(['defaultScope', 'private']).findOne({ where: { Email: email } });

      if (user && user.validPassword(password)) {

        // generate the token

        subject = {
          email: user.get('Email'),
          name: `${user.get('FirstName')} ${user.get('LastName')}`
        };

        token = jwt.sign({ sub: subject }, process.env.AUTH_TOKEN_SECRET, { expiresIn: '100d' });

        reply(this.apiResponse({ token }));

      } else {

        reply(this.errorResponse.unauthorized());

      }

    } catch (error) {
      // error
      reply(this.errorResponse.create(500, error.message));
    }
  }
}
