import * as Sequelize from 'sequelize';
import * as Umzug from 'umzug';
import logger from '../services/logger';
import { dbContext, ready } from './';

let umzug: Umzug.Umzug;

function loadUmzug() {
  return new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize: dbContext,
    },

    // see: https://github.com/sequelize/umzug/issues/17
    migrations: {
      params: [
        dbContext.getQueryInterface(), // queryInterface
        dbContext.constructor, // DataTypes
        function () {
          throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
        }
      ],
      path: './database/migrations',
      pattern: /\.js$/
    },

    logging: function (...args) {
      logger.info(args.join(', '));
    },
  });
}

export function migrate(dir: 'up' | 'down' = 'up', name?: string) {
  return ready().then(() => {
    if (!umzug) {
      umzug = loadUmzug();
    }
    if (dir === 'up') {
      return umzug.up(name);
    } else {
      return umzug.down(name);
    }
  });
}

export function reset() {
  return umzug.down(<any>{ to: 0 });
}
