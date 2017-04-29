import * as Sequelize from 'sequelize';
import * as Models from '../models';

interface ModelDefinition {
  name: string;
  attributes: Sequelize.DefineAttributes;
  options: Sequelize.DefineOptions<any>;
  associate: (model: Sequelize.Model<any, any>, db: Sequelize.Sequelize) => void;
}

export default class Context {
  constructor() {
    this.db = new Sequelize(
      process.env.DB_DATABASE,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT
      });
      
    /**
     * Define Models
     */
    for (let modelKey in Models) {
      let model: ModelDefinition = Models[modelKey];
      this[model.name] = this.db.define(model.name, model.attributes, model.options);
    }

    /**
     * Apply Associations
     * All Models Must Have Been Defined 
     */
    for (let modelKey in Models) {
      let model: ModelDefinition = Models[modelKey];
      model.associate(this[model.name], this.db);
    }
  }

  db: Sequelize.Sequelize;

  AuthToken: Sequelize.Model<Models.AuthTokenInstance, Models.AuthTokenAttributes>;
  User: Sequelize.Model<Models.UserInstance, Models.UserAttributes>;
}