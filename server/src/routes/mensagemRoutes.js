const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

const failAction = (erro, headers, request) => {
    throw erro
}

class mensagemRoutes extends BaseRoute {
    constructor(db, secret) {
        super()
        this.db = db
        this.secret = secret
    }

    createMensagem() {
        return {
            path: '/createMensagem',
            method: 'POST',
            config: {
                auth: false,
                validate: {
                    failAction,
                    payload: Joi.object({
                        nomeClienteMensagem: Joi.string().required(),
                        emailClienteMensagem: Joi.string().required(),
                        assuntoMensagem: Joi.string().required(),
                        mensagem: Joi.string().required()
                    })
                }
            },
            handler: async (request) => {
                try {
                    const {nomeClienteMensagem, emailClienteMensagem, assuntoMensagem, mensagem} = request.payload

                    const result = await this.db.create({nomeClienteMensagem, emailClienteMensagem, assuntoMensagem, mensagem})

                    return {
                        mensagem: 'criado com sucesso'
                    }
                } catch (error) {
                    console.error('erro ao enviar mensagem',error)
                    return {
                        mensagem: 'erro ao enviar mensagem'
                    }
                }
            }
        }
    }

    readMensagem() {
        return {
            path: '/readMensagem',
            method: 'GET',
            config: {
                auth: false,
                validate: {
                    failAction
                }
            },
            handler: async (request) => {
                
                try {
                    const result = await this.db.read()
                
    
                    return {
                        result
                    }
                    
                } catch (error) {
                    console.error('erro ao listar mensagems', error)
                    return {
                        mensagem: 'erro mensaem'
                    }
                }
            }
        }
    }

    deleteMensagem() {
        return {
            path: '/deleteMensagem/{id}',
            method: 'DELETE',
            config: {
                auth: false,
                validate: {
                    failAction,
                    params: Joi.object({
                        id: Joi.string().required()
                    })
                }
            },
            handler: async (request) => {
                try {
                    const {id} = request.params
    
                    const result = await this.db.delete(id)
    
                    return {
                        mensagem: 'mensagem deletada com sucesso'
                    }
                    
                } catch (error) {
                    console.error('erro ao deletar mensagem', error)
                    return {
                        mensagem: 'erro ao deletar mensagem'
                    }
                }
            }
        }
    }
}

module.exports = mensagemRoutes