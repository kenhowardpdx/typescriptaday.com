import * as Sequelize from 'sequelize';
import { UserInstance, UserAttributes } from './user.model.d';

export interface CourseAttributes {
  Name: string;
  Description: string;
  Public: boolean;
}

export interface CourseInstance extends Sequelize.Instance<CourseAttributes> {
    getUsers: Sequelize.HasManyGetAssociationsMixin<UserInstance>;
    setUsers: Sequelize.HasManySetAssociationsMixin<UserInstance, number>;
    addUsers: Sequelize.HasManyAddAssociationsMixin<UserInstance, number>;
    addUser: Sequelize.HasManyAddAssociationMixin<UserInstance, number>;
    createUser: Sequelize.HasManyCreateAssociationMixin<UserAttributes>;
    removeUser: Sequelize.HasManyRemoveAssociationMixin<UserInstance, number>;
    hasUser: Sequelize.HasManyHasAssociationMixin<UserInstance, number>;
    hasUsers: Sequelize.HasManyHasAssociationsMixin<UserInstance, number>;
    countUsers: Sequelize.HasManyCountAssociationsMixin;
}

export interface CourseModel extends Sequelize.Model<CourseInstance, CourseAttributes> {
  // put class methods here
}
