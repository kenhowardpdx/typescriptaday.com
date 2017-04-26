import { Server, Request } from 'hapi';
import * as jwt from 'jsonwebtoken';

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

    return callback(null, !!email, decoded.sub);
};