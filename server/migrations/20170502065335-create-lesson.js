'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Lessons').then(() => {
      return queryInterface.createTable('Lessons', {
        Id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        Name: { type: Sequelize.STRING, allowNull: false },
        Description: { type: Sequelize.STRING, allowNull: false },
        Order: { type: Sequelize.INTEGER, allowNull: false },
        VideoUrl: { type: Sequelize.STRING, allowNull: false },
        CreatedAt: { allowNull: false, type: Sequelize.DATE },
        UpdatedAt: { allowNull: false, type: Sequelize.DATE },
        CourseId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Courses', key: 'Id' } }
    })});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Lessons');
  }
};
