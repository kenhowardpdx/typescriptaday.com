'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('AuthTokens').then(() => {
      return queryInterface.createTable('AuthTokens', {
        Id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
        Token: { type: Sequelize.STRING, allowNull: false },
        TokenType: { type: Sequelize.ENUM('Registration', 'ForgotPassword'), allowNull: false },
        ValidUntil: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        UserId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Users', key: 'Id', onUpdate: 'cascade', onDelete: 'cascade' } }
    })});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('AuthTokens');
  }
};
