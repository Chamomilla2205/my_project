const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (() => {
    let instance;

    const initConnection = () => {
        const client = new Sequelize('test-task', 'root', 'root', {dialect: 'mysql'});

        const models = {};
        const modelsPath = path.join(process.cwd(), 'dataBase', 'MySQL', 'models');

        const getModels = () => {
            fs.readdir(modelsPath, (err, files) => {
                files.forEach((file) => {
                    const [model] = file.split('.');
                    const modelFile = require(path.join(modelsPath, model));
                    models[model] = modelFile(client, DataTypes);
                })
            })
        };

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName],
            transactionInst: () =>  client.transaction()
        }
    }

    return {
        getInit: () => {
            if (!instance) {
                instance = initConnection();
            }
            return instance;
        }
    }
})()

