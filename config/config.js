require('dotenv').config()

const development = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql'
}

module.exports = {development}
