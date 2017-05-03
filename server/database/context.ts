import * as Sequelize from 'sequelize';
import { DbContext } from './context.d';
import * as Models from '../models';

interface ModelDefinition {
  name: string;
  attributes: Sequelize.DefineAttributes;
  options: Sequelize.DefineOptions<any>;
  associate: (model: Sequelize.Model<any, any>, db: Sequelize.Sequelize) => void;
}

export const dbContext = <DbContext>new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT
  });

export function ready(): Promise<any> {
  if (process.env.DB_SYNC === 'true') {
    return dbContext.drop().then(() => {
      let queryInterface = dbContext.getQueryInterface();
      return queryInterface.dropTable('SequelizeMeta');
    });
  }
  return Promise.resolve();
}

/**
 * Define Models
 */
for (let modelKey in Models) {
  let model: ModelDefinition = Models[modelKey];
  dbContext.define(model.name, model.attributes, model.options);
}

/**
 * Apply Associations
 * All Models Must Have Been Defined
 */
for (let modelKey in Models) {
  let model: ModelDefinition = Models[modelKey];
  model.associate(dbContext.models[model.name], dbContext);
}
