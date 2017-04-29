import { BOOLEAN, STRING, DATE, INTEGER, DefineAttributes, DefineOptions, DataTypes, Sequelize, Model, CreateOptions } from 'sequelize';
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
  scopes: {
    private: {
      attributes: [
        'Password'
      ]
    }
  },
  hooks: {
    beforeCreate: function beforeCreateFn(user: UserInstance, options: CreateOptions) {
      user.setPassword(user.get('Password'));
    }
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
    },

    validPassword: function validPasswordFn(password: string) {
      const self: UserInstance = this;
      return compareSync(password, self.getDataValue('Password'));
    }

  },
  updatedAt: 'UpdatedAt',
  createdAt: 'CreatedAt'
}

function associate(model: Model<UserInstance, UserAttributes>, db: Sequelize) {
  model.hasOne(db.models['AuthToken'], { as: 'AuthToken', foreignKey: 'UserId' });
}

export const User = {
  name: 'User',
  attributes,
  options,
  associate
}