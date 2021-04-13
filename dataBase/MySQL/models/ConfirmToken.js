const DataTypes = require('sequelize');

module.exports = (client) => {
    const confirmToken = client.define(
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
        },
        {
            tableName: 'confirmtoken',
            timestamps: false
        }
    );
    return confirmToken;
}

