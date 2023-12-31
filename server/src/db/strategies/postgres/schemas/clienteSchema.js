const Sequelize = require('sequelize')

const clienteSchema = {
    name: 'Cliente',
    schema: {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: Sequelize.STRING,
            required: true
        },
        email: {
            type: Sequelize.STRING,
            required: true
        },
        passwordCriptografada: {
            type: Sequelize.STRING,
            required: true
        }
    },
    options: {
        tableName: 'TB_Cliente',
        freezeTableName: false,
        timestamps: false
    }
}

module.exports = clienteSchema