const DataTypes = require('sequelize');

module.exports = (client) => {
    const NonActivatedUser =client.define(
        'NonActivatedUser',
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
            tableName: 'non_activated_user',
            timestamps: false
        }
    );
    return NonActivatedUser;
}
