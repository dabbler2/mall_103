'use strict'
const {Model} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Goods extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Users, {
                targetKey: 'userID',
                foreignKey: 'UserID'
            })
        }
    }
    Goods.init(
        {
            goodsID: {
                allowNull: false,
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            goodsName: DataTypes.STRING,
            comment: DataTypes.STRING,
            isAvailable: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            UserID: DataTypes.INTEGER,
            UserName: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'Goods'
        }
    )
    return Goods
}
