const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const failAction = (request, headers, erro) => {
    throw erro;
} 

class ProdutoRoutes extends BaseRoute {
    constructor(db, secret){
        super()
        this.db = db
        this.secret = secret
    }

    createProduto() {
        return {
            path: '/createProduto',
            method: 'POST',
            config: {
                auth: false,
                validate: {
                    failAction,
                    payload: Joi.object({
                        nomeProduto: Joi.string().required(),
                        precoProduto: Joi.number().required(),
                        marcaProduto: Joi.string().required(),
                        detalheProduto: Joi.string().required(),
                        tipoProduto: Joi.string().required(),
                        imagemProduto: Joi.string().required()
                    })
                    
                },
                handler: async (request) => {
                    const {nomeProduto, precoProduto, marcaProduto, detalheProduto ,tipoProduto, imagemProduto} = request.payload
                    
                    const result = await this.db.create({nomeProduto, precoProduto, marcaProduto, detalheProduto ,tipoProduto, imagemProduto})

                    console.log('result',result)
                   return { mensagem: 'Cadastrado com sucesso'}
                }
            }
        }
    }

    readProduto() {
        return {
            path: '/readProduto',
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

                    return {result}    

                } catch (error) {
                    console.error('erro ao listar Produtos',error)
                    return { mensagem: 'erro'}
                }
                
            }
        }
    }

    updateProduto() {
        return {
            path: '/updateProduto/{id}',
            method: 'PATCH',
            config: {
                auth: false,
                validate:{
                    failAction,
                    params: Joi.object({
                        id: Joi.string().required()
                    }),
                    payload: Joi.object({
                        nomeProduto: Joi.string(),
                        precoProduto: Joi.number(),
                        marcaProduto: Joi.string(),
                        tipoProduto: Joi.string(),
                        imagemProduto: Joi.string(),
                    })
                },
                handler: async (request) => {
                    try {
                        const {id} = request.params
                        const payload = request.payload
    
                        const result = await this.db.update(id, payload)
    
                        return {
                            mensagem: 'produto atualizado com sucesso'
                        }
                        
                    } catch (error) {
                        console.error('erro ao atualizar', error)
                        return 
                    }
                }
            }
        }
    }

    deleteProduto() {
        return {
            path: '/deleteProduto/{id}',
            method: 'DELETE',
            config: {
                auth: false,
                validate: {
                    failAction,
                    params: Joi.object({
                        id: Joi.string().required()
                    })
                },
                handler: async (request) => {
                    try {
                        const {id} = request.params
                        const result = await this.db.delete(id)    

                        return {
                            mensagem: 'exluido com sucesso'
                        }
                    } catch (error) {
                        console.error('erro',error)
                        return {
                            mensagem: 'erro ao excluir'
                        }
                    }
                    
                }
            }
        }
    }
}

module.exports = ProdutoRoutes