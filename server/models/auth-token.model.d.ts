import * as Sequelize from 'sequelize';
import { TokenType, getKeys } from '../enums';
import { UserInstance, UserAttributes } from './user.model.d';

export interface AuthTokenAttributes {
  Token?: string;
  TokenType: string;
  ValidUntil?: Date;
}

export interface AuthTokenInstance extends Sequelize.Instance<AuthTokenAttributes> {
  createUser: Sequelize.HasOneCreateAssociationMixin<UserAttributes>;
  getUser: Sequelize.HasOneGetAssociationMixin<UserInstance>;
  setUser: Sequelize.HasOneSetAssociationMixin<UserInstance, number>;
  generateToken: () => string;
}

export interface AuthTokenModel extends Sequelize.Model<AuthTokenInstance, AuthTokenAttributes> {
  generateToken: () => string;
}
