const DataTypes = require('sequelize');

module.exports = (client) => {
    const User =client.define(
        'User',
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
        },
        {
            tableName: 'users',
            timestamps: false
        }
    );
    return User;
}
