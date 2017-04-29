import * as Sequelize from 'sequelize';
import { AuthTokenInstance, AuthTokenAttributes } from './auth-token.model.d';

export interface UserAttributes {
  Active?: boolean;
  Email: string;
  FirstName?: string;
  LastName?: string;
  Password: string;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes> {
  createAuthToken: Sequelize.BelongsToCreateAssociationMixin<AuthTokenAttributes>;
  getAuthToken: Sequelize.BelongsToGetAssociationMixin<AuthTokenInstance>;
  setAuthToken: Sequelize.BelongsToSetAssociationMixin<AuthTokenInstance, number>;
  setPassword(password: string): Promise<UserInstance>;
  validPassword(password: string): boolean;
}