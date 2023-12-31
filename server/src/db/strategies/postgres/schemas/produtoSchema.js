const Sequelize  = require("sequelize");

const produtoSchema = {
    name: 'Produto',
    schema: {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        nomeProduto: {
            type: Sequelize.STRING,
            required: true
        },
        precoProduto: {
            type: Sequelize.FLOAT,
            required: true
        },
        detalheProduto: {
            type: Sequelize.STRING,
            required: true
        },
        marcaProduto: {
            type: Sequelize.STRING,
            required: true
        },
        tipoProduto: {
            type: Sequelize.STRING,
            required: true
        },
        imagemProduto: {
            type: Sequelize.STRING,
            required: true
        }
    },
    options: {
        tableName: 'TB_Produto',
        freezeTableName: false,
        timestamps: false
    }
}

module.exports = produtoSchema