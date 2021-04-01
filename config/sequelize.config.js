const {ROOT_EMAIL,ROOT_EMAIL_PASSWORD} = require('./config')

module.exports = {
    "development": {
        "username": 'root',
        "password": 'root',
        "database": "test-task",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
}
