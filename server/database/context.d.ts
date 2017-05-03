import { Sequelize, ModelsHashInterface, Model } from 'sequelize';
import * as Models from '../models';

interface DbContext extends Sequelize {
  models: ModelsInterface;
}

interface ModelsInterface extends ModelsHashInterface {
  AuthToken: Models.AuthTokenModel;
  User: Models.UserModel;
  Course: Models.CourseModel;
  UserCourse: Model<any, any>;
  Lesson: Models.LessonModel;
}
