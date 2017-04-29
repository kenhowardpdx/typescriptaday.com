import { Request, IReply } from 'hapi';
import { controller, get, post, validate, config } from 'hapi-decorators';
import * as Joi from 'joi';
import * as jwt from 'jsonwebtoken';
import { BaseApiController } from './base.controller';
import _dbContext from '../../database';
import { UserInstance, AuthTokenInstance } from '../../models';
import { sendMail } from '../../services/mailer';
import { TokenType } from '../../enums';

@controller('/register')
export class RegisterApiController extends BaseApiController {

  constructor() {
    super();
  }

  @post('/')
  @validate({
    payload: Joi.object().keys({
      email: Joi.string().email().required(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      password: Joi.string().required()
    })
  })
  async index(request: Request, reply: IReply) {
    let { email, firstName, lastName, password } = request.payload;
    let user: UserInstance;
    let authToken: AuthTokenInstance;
    let token: string;

    const urlBase = `${process.env.BASE_URL}/api/register?token=`;
    
    try {
      user = await _dbContext.User.create({ Email: email, FirstName: firstName, LastName: lastName, Password: password });
      authToken = _dbContext.AuthToken.build({ TokenType: TokenType[TokenType.Registration] });

      // set the user
      authToken.setUser(user);

      // generate the token
      token = authToken.generateToken();

      // save the token
      await authToken.save();

      const json = user.toJSON();
      delete json.Password;

      // send email
      await sendMail(
        [email],
        'Confirm Email',
        `Thank you for signing up for TypeScript A Day.
        Please confirm your email address (${email}) by clicking this link:
        ${urlBase}${token}
        `,
        `<h1>Confirm Email</h1>
        <p>Thank you for signing up for TypeScript A Day.</p>
        <p>Please confirm your email address (${email}) by clicking this link:</p>
        <p><a href="${urlBase}${token}">Confirm Email Address</a></p>
        `);

      reply(this.apiResponse(json));
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        reply(this.errorResponse.notAcceptable('Email Address Already Registered'));
      } else {
        reply(this.errorResponse.create(500, error.message));
      }
    }
  }

  @get('/')
  @validate({
    query: Joi.object({
      token: Joi.string().required()
    })
  })
  @config({
    response: {
      emptyStatusCode: 204
    }
  })
  async confirm(request: Request, reply: IReply) {
    const { token } = request.query;
    let user: UserInstance;
    let authToken: AuthTokenInstance;

    try {
      authToken = await _dbContext.AuthToken.findOne({
        where: {
          Token: token,
          TokenType: TokenType[TokenType.Registration],
          ValidUntil: { $gt: new Date() }
        }
      });

      if (!authToken) {
        return reply(this.errorResponse.forbidden());
      }
      user = await authToken.getUser();

      await user.update({ Active: true }, { fields: ['Active'] }); // The user has confirmed their email address
      await authToken.destroy(); // The token is not needed anymore
      reply(undefined); // response status code 204 (no content)
    } catch (error) {
        reply(this.errorResponse.create(500, error.message));
    }
  }

  async sendRegistrationEmail(email: string) {
    let token = '';
    let confirmUrl = `${process.env.BASE_URL}/registration/confirm?token=${token}`;
    let text = ``;
    let html = ``;
    await sendMail([email], 'Account Information', text, html);
  }
}