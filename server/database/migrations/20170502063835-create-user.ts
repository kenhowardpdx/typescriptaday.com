import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface, dt: DataTypes) {
  await queryInterface.dropTable('Users');
  await queryInterface.createTable('Users', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: dt.INTEGER
      },
      Active: {
        type: dt.BOOLEAN,
        defaultValue: false
      },
      Email: {
        type: dt.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
      },
      FirstName: {
        type: dt.STRING
      },
      LastName: {
        type: dt.STRING
      },
      Password: {
        type: dt.STRING,
        allowNull: false
      },
      CreatedAt: {
        allowNull: false,
        type: dt.DATE
      },
      UpdatedAt: {
        allowNull: false,
        type: dt.DATE
      }
    });
}

export async function down(queryInterface: QueryInterface, dt: DataTypes) {
  await queryInterface.dropTable('Users');
}
