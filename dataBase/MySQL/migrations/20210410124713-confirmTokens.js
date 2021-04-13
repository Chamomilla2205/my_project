const DataTypes = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(
        'confirmtoken',
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          confirm_token: {
            type: DataTypes.STRING
          },
          userId: {
            type: DataTypes.INTEGER
          },
          addTime: {
            type: DataTypes.STRING
          },
          newPass: {
              type: DataTypes.STRING
          }
        }
    )
  },

  down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('confirmtoken')
  }
};
