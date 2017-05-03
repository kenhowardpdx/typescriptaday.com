import { QueryInterface, DataTypes } from 'sequelize';
import { hashSync, genSaltSync } from 'bcrypt-nodejs';

const salt = genSaltSync();

export async function up(queryInterface: QueryInterface, dt: DataTypes) {
  await queryInterface.bulkInsert('Users', [{
    Active: true,
    Email: 'testUser@typescriptaday.com',
    FirstName: 'Test',
    LastName: 'User',
    Password: hashSync('password', salt),
    CreatedAt: new Date(),
    UpdatedAt: new Date()
  }]);
}

export async function down(queryInterface: QueryInterface, dt: DataTypes) {
  await queryInterface.dropTable('Users');
}
