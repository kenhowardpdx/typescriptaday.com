import { BOOLEAN, STRING, DATE, INTEGER, DefineAttributes, DefineOptions, DataTypes, Sequelize, Model, CreateOptions } from 'sequelize';
import { CourseInstance, CourseAttributes } from './course.model.d';

const attributes: DefineAttributes = {
  Id: { allowNull: false, autoIncrement: true, primaryKey: true, type: INTEGER },
  Name: { type: STRING, allowNull: false },
  Description: { type: STRING, allowNull: false },
  Order: { type: INTEGER, allowNull: false },
  VideoUrl: { type: STRING, allowNull: false }
}

const options: DefineOptions<any> = {
  updatedAt: 'UpdatedAt',
  createdAt: 'CreatedAt'
}

function associate(model: Model<any, any>, db: Sequelize) {
  model.belongsTo(db.models['Course']);
}

export const Lesson = {
  name: 'Lesson',
  attributes,
  options,
  associate
}
