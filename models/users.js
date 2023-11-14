'use strict'
const {Model} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Goods, {
                sourceKey: 'userID',
                foreignKey: 'UserID'
            })
        }
    }
    Users.init(
        {
            userID: {
                allowNull: false,
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email: DataTypes.STRING,
            userName: DataTypes.STRING,
            hashPW: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'Users'
        }
    )
    return Users
}
