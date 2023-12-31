'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Goods', {
            goodsID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            goodsName: {
                allowNull: false,
                type: Sequelize.STRING
            },
            comment: {
                type: Sequelize.STRING
            },
            isAvailable: {
                allowNull: false,
                type: Sequelize.BOOLEAN
            },
            UserID: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'userID'
                },
                onDelete: 'CASCADE'
            },
            UserName: {
                allowNull: false,
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Goods')
    }
}
