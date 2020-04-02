module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'DeliveryMan',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        freezeTableName: true,
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DeliveryMan');
  },
};
