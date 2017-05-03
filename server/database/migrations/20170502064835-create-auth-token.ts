import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface, dt: DataTypes) {
  await queryInterface.dropTable('AuthTokens');
  await queryInterface.createTable('AuthTokens', {
    Id: { type: dt.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    Token: { type: dt.STRING, allowNull: false },
    TokenType: { type: dt.ENUM('Registration', 'ForgotPassword'), allowNull: false },
    ValidUntil: { type: dt.DATE, allowNull: false },
    UserId: { type: dt.INTEGER, allowNull: false, references: { model: 'Users', key: 'Id', onUpdate: 'cascade', onDelete: 'cascade' } }
  });
}

export async function down(queryInterface: QueryInterface, dt: DataTypes) {
  await queryInterface.dropTable('AuthTokens');
}
