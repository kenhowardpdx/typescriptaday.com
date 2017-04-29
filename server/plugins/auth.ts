import { Server, Request } from 'hapi';
import * as jwt from 'jsonwebtoken';
import logger from '../services/logger';

export function register(server: Server, options, next) {
    server.register(require('hapi-auth-jwt2'));
    server.auth.strategy('jwt', 'jwt', false,
        {
            key: process.env.AUTH_TOKEN_SECRET,
            validateFunc: validate,
            verifyOptions: { algorithms: ['HS256'] }
        });

    next();
};

register['attributes'] = {
    name: 'Auth',
    version: '1.0.0'
};

function validate(decoded, request: Request, callback) {

    const { email, name } = decoded.sub;
    const valid = !!email;

    if (valid) {
      logger.info(`Authenticated user: ${email}`);
    } else {
      logger.info('Invalid auth attempt');
    }

    return callback(null, valid, decoded.sub);
};