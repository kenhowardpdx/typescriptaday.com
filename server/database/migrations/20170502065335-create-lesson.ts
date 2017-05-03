import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface, dt: DataTypes) {
  await queryInterface.dropTable('Lessons');
  await queryInterface.createTable('Lessons', {
    Id: { type: dt.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: dt.STRING, allowNull: false },
    Description: { type: dt.STRING, allowNull: false },
    Order: { type: dt.INTEGER, allowNull: false },
    VideoUrl: { type: dt.STRING, allowNull: false },
    CreatedAt: { allowNull: false, type: dt.DATE },
    UpdatedAt: { allowNull: false, type: dt.DATE },
    CourseId: { type: dt.INTEGER, allowNull: false, references: { model: 'Courses', key: 'Id' } }
  });
}

export async function down(queryInterface: QueryInterface, dt: DataTypes) {
  await queryInterface.dropTable('Lessons');
}
