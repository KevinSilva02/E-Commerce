const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Jwt = require('jsonwebtoken')
const failAction = (request, headers, erro) => {
    throw erro;
}

const PasswordHelper = require('./../helpers/helperPassword')

class authRoutes extends BaseRoute {
    constructor(db, secret) {
        super()
        this.db = db;
        this.secret = secret
    }    

    
    singUp() { 
        return {
            path: '/singUp',
            method: 'Post',
            config: {
                auth: false,
                validate: {
                    failAction,
                    payload: Joi.object({
                        nome: Joi.string().required(),
                        email: Joi.string().required(),
                        password: Joi.string().required()
                    })
                }
            },
            handler: async (request) => {
                try {
                    const {nome, email, password} = request.payload

                    const passwordCriptografada = await PasswordHelper.hashPassword(password)
                    
                    const result = await this.db.create({nome, email, passwordCriptografada})
                    
                    return {
                        mensagem: 'cliente cadastrado com sucesso'
                    }
                } catch (error) {
                    console.error('erro no cadastro', error)
                }
            }
        }
    }

    login() {
        return {
            path: '/login',
            method: 'POST',
            config: {
                auth: false,
                validate: {
                    failAction,
                    payload: Joi.object({
                        email: Joi.string().required(),
                        password: Joi.string().required()
                    })
                },
                handler: async (request) => {
                    
                    try {
                        const {email, password} = request.payload
    
                        const [cliente] = await this.db.read({email})
                        
                        if(!cliente){
                            return {
                                mensagem: 'email invalido'
                            }
                        }

                        const match = await PasswordHelper.compare(password, cliente.passwordCriptografada)
                        
                        if(!match){
                            return {
                                mensagem: 'email ou senha invalido'
                            }
                        }

                        const clienteNome = cliente.nome
                        const clienteId = cliente.id
                        const clienteEmail = cliente.email

                        const token = Jwt.sign({
                            nome: cliente.nome,
                            id: cliente.id,
                        }, this.secret)

                        return {
                            token,
                            clienteId,
                            clienteNome,
                            clienteEmail
                        }
                    } catch (error) {
                        console.log(error)
                        return{
                            mensagem: 'erro'
                        }
                    }
                }
            }
        }
    }
}

module.exports = authRoutes