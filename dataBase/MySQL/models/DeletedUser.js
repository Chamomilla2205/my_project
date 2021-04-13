const DataTypes = require('sequelize');

module.exports = (client) => {
    const DeletedUser = client.define(
        'DeletedUser',
        {
            id: {
                type: DataTypes.INTEGER,
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
            tableName: 'deletedUser',
            timestamps: false
        }
    );
    return DeletedUser;
}
