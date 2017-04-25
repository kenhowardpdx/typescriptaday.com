import * as hapi from 'hapi';
import logger from '../logger';

const good = require('good');

export function register(server: hapi.Server, options, next) {
    server.register({
        register: require('good'),
        options: {
            reporters: {
                winston: [{
                    module: 'good-winston',
                    args: [{
                      winston: logger,
                      level: {
                        request: 'debug'
                      }
                    }]
                }]
            }
        }
    });
    next();
};

register['attributes'] = {
    pkg: { name: 'logger' }
};