import {
  BOOLEAN, STRING, DATE, INTEGER, ENUM,
  DefineAttributes, DefineOptions, DataTypes,
  Sequelize, Model, CreateOptions, literal } from 'sequelize';
import { compareSync, hashSync, genSaltSync } from 'bcrypt-nodejs';
import { randomBytes } from 'crypto';

import { TokenType, getKeys } from '../enums';

import { AuthTokenInstance, AuthTokenAttributes } from './auth-token.model.d';

const attributes: DefineAttributes = {
  Token: { type: STRING, allowNull: false },
  TokenType: { type: ENUM(...getKeys(TokenType)), allowNull: false },
  ValidUntil: { type: DATE, allowNull: false, defaultValue: literal('CURRENT_TIMESTAMP') }
}

const options: DefineOptions<any> = {
  instanceMethods: {
    generateToken: function generateTokenFn(this: AuthTokenInstance) {
      let token = randomBytes(16).toString('hex');
      this.set('Token', token);
      return token;
    }
  },
  hooks: {
    beforeCreate: function beforeCreateFn(authToken: AuthTokenInstance, options: CreateOptions) {
      let date = new Date();
      date.setDate(date.getDate() + 2);
      authToken.setDataValue('ValidUntil', date); // set ValidDate ahead two days from now
    }
  },
  updatedAt: false,
  createdAt: false
}

function associate(model: Model<any, any>, db: Sequelize) {
  model.belongsTo(db.models['User'], { as: 'User', foreignKey: 'UserId' });
}

export const AuthToken = {
  name: 'AuthToken',
  attributes,
  options,
  associate
}