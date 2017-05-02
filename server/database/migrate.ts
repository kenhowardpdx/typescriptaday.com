import * as Sequelize from 'sequelize';
import * as Umzug from 'umzug';
import logger from '../services/logger';

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT
  });

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize: sequelize,
  },

  // see: https://github.com/sequelize/umzug/issues/17
  migrations: {
    params: [
      sequelize.getQueryInterface(), // queryInterface
      sequelize.constructor, // DataTypes
      function () {
        throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
      }
    ],
    path: './migrations',
    pattern: /\.js$/
  },

  logging: function (...args) {
    logger.info(args.join(', '));
  },
});

export function migrate(dir: 'up' | 'down' = 'up', name?: string) {
  if (dir === 'up') {
    return umzug.up(name);
  } else {
    return umzug.down(name);
  }
}

export function reset() {
  return umzug.down(<any>{ to: 0 });
}
