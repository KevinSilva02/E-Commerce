const { config } = require('dotenv')
const { join } = require('path')
const { ok } = require('assert')

const env = process.env.NODE_ENV || "dev"
ok(env === 'prod' || env === 'dev', "a env é invalida, ou dev ou prod")

const configPath = join(__dirname, './config', `.env.${env}`)

config({
    path: configPath
})

const Hapi = require('@hapi/hapi');
const Postgres = require('./db/strategies/postgres/postgres')
const clienteSchema = require('./db/strategies/postgres/schemas/clienteSchema')
const produtoSchema = require('./db/strategies/postgres/schemas/produtoSchema')
const bannerSchema = require('./db/strategies/postgres/schemas/bannerSchema')
const mensagemSchema = require('./db/strategies/postgres/schemas/mensagemSchema')
const Context = require('./db/strategies/base/contextStrategy');
const ProdutoRoutes = require('./routes/produtosRoutes');
const authRoutes = require('./routes/authRoute');
const mensagemRoutes = require('./routes/mensagemRoutes')
const HapiJwt = require('hapi-auth-jwt2');

const JWT_SECRET = process.env.JWT_SECRET

const app = new Hapi.Server({
    port: process.env.PORT,
    routes: {
        cors: true
    }
})

function mapRoutes(instance, methods){
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = await Postgres.connect()
    const model = await Postgres.defineModel(connection, clienteSchema)
    const context = new Context(new Postgres(connection, model))

    const modelProduto = await Postgres.defineModel(connection, produtoSchema)
    const contextProduto = new Context(new Postgres(connection, modelProduto))

    const modelMensagem = await Postgres.defineModel(connection, mensagemSchema)
    const contextMensagem = new Context(new Postgres(connection, modelMensagem))


    await app.register([
        HapiJwt
    ])

    app.auth.strategy('jwt', 'jwt', {
         key: JWT_SECRET,

         validate: async (dado, request) => {
             const [result] = await context.read(dado.email)
             console.log('dado',dado)
             if(!result) {
                 return {
                     isValid: false
                 }
             }

             return {
                 isValid: true
             }
         }
     })

     app.auth.default('jwt')

    app.route([
            ...mapRoutes(new authRoutes(context, JWT_SECRET), authRoutes.methods()),
            ...mapRoutes(new ProdutoRoutes(contextProduto, JWT_SECRET), ProdutoRoutes.methods()),
            ...mapRoutes(new mensagemRoutes(contextMensagem, JWT_SECRET), mensagemRoutes.methods())
    ])
    await app.start()
    console.log('servidor rodando na porta', app.info.port)
    return app
}
main()