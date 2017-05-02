'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('UserCourses')
      .then(() => queryInterface.dropTable('Courses'))
      .then(() => {
        return queryInterface.createTable('Courses', {
          Id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
          Name: { type: Sequelize.STRING, allowNull: false },
          Description: { type: Sequelize.STRING, allowNull: false },
          Public: { type: Sequelize.BOOLEAN, defaultValue: false },
          CreatedAt: { allowNull: false, type: Sequelize.DATE },
          UpdatedAt: { allowNull: false, type: Sequelize.DATE }
      })
      .then(() => {
        return queryInterface.createTable('UserCourses', {
          UserId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Users', key: 'Id' } },
          CourseId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Courses', key: 'Id' } }
        })
      })
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('UserCourses')
      .then(() => queryInterface.dropTable('Courses'));
  }
};
