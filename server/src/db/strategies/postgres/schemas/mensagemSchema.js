const Sequelize = require('sequelize')

const mensagemSchema = {
    name: 'Mensagem',
    schema: {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        nomeClienteMensagem: {
            type: Sequelize.STRING,
            required: true
        } ,
        emailClienteMensagem: {
            type: Sequelize.STRING,
            required: true
        },
        assuntoMensagem: {
            type: Sequelize.STRING,
            required: true
        },
        mensagem: {
            type: Sequelize.STRING,
            required: true
        }
    },
    options: {
        tableName: 'TB_Mensagem',
        freezeTableName: false,
        timestamps: false
    }
}

module.exports = mensagemSchema