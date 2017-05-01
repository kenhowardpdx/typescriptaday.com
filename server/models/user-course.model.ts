import * as Sequelize from 'sequelize';

const attributes: Sequelize.DefineAttributes = {}

const options: Sequelize.DefineOptions<any> = {
  createdAt: false,
  updatedAt: false
}

function associate(model: Sequelize.Model<any, any>, db: Sequelize.Sequelize) {
  // not implemented
}

export const UserCourse = {
  name: 'UserCourse',
  attributes,
  options,
  associate
}
