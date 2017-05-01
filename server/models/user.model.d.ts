import * as Sequelize from 'sequelize';
import { AuthTokenInstance, AuthTokenAttributes } from './auth-token.model.d';
import { CourseInstance, CourseAttributes } from './course.model.d';

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
  getCourses: Sequelize.HasManyGetAssociationsMixin<CourseInstance>;
  setCourses: Sequelize.HasManySetAssociationsMixin<CourseInstance, number>;
  addCourses: Sequelize.HasManyAddAssociationsMixin<CourseInstance, number>;
  addCourse: Sequelize.HasManyAddAssociationMixin<CourseInstance, number>;
  createCourse: Sequelize.HasManyCreateAssociationMixin<CourseAttributes, CourseInstance>;
  removeCourse: Sequelize.HasManyRemoveAssociationMixin<CourseInstance, number>;
  hasCourse: Sequelize.HasManyHasAssociationMixin<CourseInstance, number>;
  hasCourses: Sequelize.HasManyHasAssociationsMixin<CourseInstance, number>;
  countCourses: Sequelize.HasManyCountAssociationsMixin;
  setPassword(password: string): Promise<UserInstance>;
  validPassword(password: string): boolean;
}