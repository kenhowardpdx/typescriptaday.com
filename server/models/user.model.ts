import { BOOLEAN, STRING, DATE, INTEGER, DefineAttributes, DefineOptions, DataTypes, Sequelize, Model } from 'sequelize';
import { compareSync, hashSync, genSaltSync } from 'bcrypt-nodejs';
import { randomBytes } from 'crypto';

import { UserInstance, UserAttributes } from './user.model.d';

const attributes: DefineAttributes = {
  Id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  Active: { type: BOOLEAN, defaultValue: false },
  Email: { type: STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  FirstName: STRING,
  LastName: STRING,
  Password: { type: STRING, allowNull: false }
};

const options: DefineOptions<UserInstance> = {
  defaultScope: {
    attributes: [
      'Id',
      'Email',
      'FirstName',
      'LastName'
    ]
  },
  instanceMethods: {

    setPassword: function setPasswordFn(password: string) {
      const self: UserInstance = this;

      if (!password) {
        throw new Error('Password Can\'t Be Null!');
      }

      const salt = genSaltSync();
      const encrypted = hashSync(password, salt);

      self.setDataValue('Password', encrypted);

      return self.save();
    },

    validPassword: function validPasswordFn(password: string) {
      const self: UserInstance = this;
      return compareSync(password, self.getDataValue('Password'));
    }

  }
}

function associate(model: Model<UserInstance, UserAttributes>, db: Sequelize) {
  // not implemented
}

export const User = {
  name: 'User',
  attributes,
  options,
  associate
}