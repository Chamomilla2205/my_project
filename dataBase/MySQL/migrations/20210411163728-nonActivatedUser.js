const DataTypes = require('sequelize')

module.exports = {
  up: async (queryInterface) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(
        'non_activated_user',
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          name: {
            type: DataTypes.STRING
          },
          bornYear: {
            type: DataTypes.INTEGER
          },
          email: {
            type: DataTypes.STRING
          },
          password: {
            type: DataTypes.STRING
          },
          role: {
            type: DataTypes.STRING,
            default: 'user'
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
    await queryInterface.dropTable('non_activated_user')
  }
};
