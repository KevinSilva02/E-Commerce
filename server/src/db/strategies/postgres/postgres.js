const ICrud = require('../interface/interfaceCrud');
const Sequelize = require('sequelize');

class Postgres extends ICrud {
    constructor(connection, schema) {
        super()
        this._connection = connection
        this._schema = schema
    }
    async isConnected() {
        try {
            await this._connection.authenticate()
            return true            
        } catch (error) {
            console.log('error de conexão', error)
            return false
        }
    }
    static async defineModel(connection, schema) {
        
        const model = connection.define(
            schema.name, schema.schema, schema.options
        )
        await model.sync()
        return model
    }

    async create(item) {
        const { dataValues } = await this._schema.create(item)
        
        return dataValues
    }

    async read(query = {}) {
        console.log('query', query)
        return await this._schema.findAll({where: query, raw: true})
    }

    async update(id, item) {
        return await this._schema.update(item, {
            where: {id: id}
        })
    }

    async delete(id) {
        const query = id ? { id } : {}
        return this._schema.destroy({where: query})
    }

    static async connect() {
        const connection = new Sequelize(process.env.POSTGRES_URL, {
            quoteIndentifiers: false,
            operatorAliases: 0,
            logging: false,
            ssl: process.env.SSL_DB,
            dialectOptions: {
                ssl: process.env.SSL_DB
            }
        })
        return connection
    }
}




module.exports = Postgres