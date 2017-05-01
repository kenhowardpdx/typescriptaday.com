import { BOOLEAN, STRING, DATE, INTEGER, DefineAttributes, DefineOptions, DataTypes, Sequelize, Model, CreateOptions } from 'sequelize';
import { CourseInstance, CourseAttributes } from './course.model.d';

const attributes: DefineAttributes = {
  Id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  Name: { type: STRING, allowNull: false },
  Description: { type: STRING, allowNull: false },
  Public: { type: BOOLEAN, defaultValue: false }
}

const options: DefineOptions<CourseInstance> = {
  updatedAt: 'UpdatedAt',
  createdAt: 'CreatedAt'
}

function associate(model: Model<CourseInstance, CourseAttributes>, db: Sequelize) {
  model.belongsToMany(db.models['User'], { as: 'User', through: db.models['UserCourse'] });
}

export const Course = {
  name: 'Course',
  attributes,
  options,
  associate
}
