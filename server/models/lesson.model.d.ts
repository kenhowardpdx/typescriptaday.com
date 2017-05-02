import * as Sequelize from 'sequelize';
import { CourseInstance, CourseAttributes } from './course.model.d';

export interface LessonAttributes {
  Name: string;
  Description: string;
  Order: number;
  VideoUrl: string;
}

export interface LessonInstance extends Sequelize.Instance<LessonAttributes> {
  createCourse: Sequelize.BelongsToCreateAssociationMixin<CourseAttributes>;
  getCourse: Sequelize.BelongsToGetAssociationMixin<CourseInstance>;
  setCourse: Sequelize.BelongsToSetAssociationMixin<CourseInstance, number>;
}

export interface LessonModel extends Sequelize.Model<LessonInstance, LessonAttributes> {
  // put class methods here
}
