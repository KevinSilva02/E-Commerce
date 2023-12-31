const Sequelize = require('sequelize')

const bannerSchema = {
    name: 'Banner',
    schema: {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        nomeBanner: {
            type: Sequelize.STRING,
            required: true
        },
        imagemBanner: {
            type: Sequelize.STRING,
            required: true
        }
    },
    options: {
        tableName: 'TB_Banner',
        freezeTableName: false,
        timestamps: false
    }
}

module.exports = bannerSchema