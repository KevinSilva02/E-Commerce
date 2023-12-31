const assert = require('assert')
const Postgres = require('./../db/strategies/postgres/postgres')
const ClienteSchema = require('./../db/strategies/postgres/schemas/clienteSchema')
const Context = require('./../db/strategies/base/contextStrategy')

let context = {}

CLIENTE_CREATE = {
    nome: 'Helena Silva',
    email: 'helena@gmail.com',
    passwordCriptografada: 'helena123'
}

describe('Postregres strategy', function() {
    this.timeout(Infinity)
    this.beforeAll(async function() {
        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, ClienteSchema)
        console.log('model', model)
        context = new Context(new Postgres(connection, model))
    })

    it('Postgres Connection', async function() {
        const result = await context.isConnected()

        assert.deepEqual(result, true)
    })

    it('create item', async function () {
        const result = await context.create(CLIENTE_CREATE)
        delete result.id
        assert.deepEqual(result, CLIENTE_CREATE)
    })

    it.only('read items ', async function() {
        const result = await context.read()
        delete result.id
        console.log('result read', result)
        assert.deepEqual(result, result )
    })
    
    it('delete item', async function() {
        const [item] = await context.read()
        const result = await context.delete(item.id)

        assert.deepEqual(result, 1)
    })

    it('update item', async function() {
        const [ITEM_ATUALIZAR] = await context.read(CLIENTE_CREATE.nome)
        const NOVO_CLIENTE = {
            ...ITEM_ATUALIZAR,
            password: 'helena123'
        }
        const result = await context.update(ITEM_ATUALIZAR.id, NOVO_CLIENTE)
        const [ITEM_ATUALIZADO] = await context.read(CLIENTE_CREATE.nome)
        console.log('id', NOVO_CLIENTE)

        assert.deepEqual(ITEM_ATUALIZADO, NOVO_CLIENTE)
    })

})