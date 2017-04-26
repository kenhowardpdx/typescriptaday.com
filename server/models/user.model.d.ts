import { Instance, Model } from 'sequelize';

export interface UserAttributes {
  Active?: boolean;
  Email: string;
  FirstName?: string;
  LastName?: string;
  Password: string;
}

export interface UserInstance extends Instance<UserAttributes> {
  setPassword(password: string): Promise<UserInstance>;
  validPassword(password: string): boolean;
}