const express = require('express')
const routes = express.Router()
const produtos = []

routes.get('/api', (req, res) => {
    res.json({ mensagem: "Essa é minha primeira API" })
})

routes.post('/cadastrar', (req, res) => {
    const { id, nome_produto, categoria } = req.body
    console.log(`salvando no banco de dados as informações ${id} ${nome_produto} ${categoria}`)
    produtos.push(req.body)
    res.json(req.body)
})

routes.get('/produtos', (req, res) => {
    res.send(produtos)
})

routes.put('/produtos/alterar/:id', (req, res) => {
    let validacao = false
    let idx = 0
    const { id: alterar } = req.params
    const { nome_produto, categoria } = req.body
    console.log(alterar)
    for (let index = 0; index < produtos.length; index++) {
        const { id } = produtos[index];
        console.log(produtos[index])
        if (id == alterar) {
            validacao = true
            idx = index
        }
    }

    if (validacao == true) {
        produtos[idx].nome_produto = nome_produto
        produtos[idx].categoria = categoria
        res.send(produtos[idx])
    }
    else {
        res.json({
            mensagem:"Produto não encontrado"
        })
    }
})

routes.delete('/produtos/deletar/:id',(req,res) => {
  let validacao = false
  let idx = 0
  
    const { id: deletar } = req.params
    for (let index = 0; index < produtos.length; index++) {
        const { id } = produtos[index];
        console.log(produtos[index])
        if (id == deletar) {
            validacao = true
            idx = index
        }
    }
    if (validacao == true) {
     delete produtos[idx]
     res.json({
        mensagem:"Produto deletado com sucesso"
    })
    }
    else {
        res.json({
            mensagem:"Produto não encontrado"
        })
    }
})

module.exports = routes