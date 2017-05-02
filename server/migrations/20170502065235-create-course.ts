import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface, dt: DataTypes) {
  await queryInterface.dropTable('UserCourses');
  await queryInterface.dropTable('Courses');
  await queryInterface.createTable('Courses', {
    Id: { type: dt.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: dt.STRING, allowNull: false },
    Description: { type: dt.STRING, allowNull: false },
    Public: { type: dt.BOOLEAN, defaultValue: false },
    CreatedAt: { allowNull: false, type: dt.DATE },
    UpdatedAt: { allowNull: false, type: dt.DATE }
  });
  await queryInterface.createTable('UserCourses', {
    UserId: { type: dt.INTEGER, allowNull: false, references: { model: 'Users', key: 'Id' } },
    CourseId: { type: dt.INTEGER, allowNull: false, references: { model: 'Courses', key: 'Id' } }
  });
}

export async function down(queryInterface: QueryInterface, dt: DataTypes) {
  await queryInterface.dropTable('UserCourses');
  await queryInterface.dropTable('Courses');
}
