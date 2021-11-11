const express = require('express');
const rotaPromo = express.Router();

const itemRouter = express.Router({mergeParams: true});

rotaPromo.use('/', itemRouter);

rotaPromo.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.end('Essas são todas as Promoções!');
    })
    .post((req, res) => {
        res.end('Vamos adiciona novo promoção com o nome: ' + req.body.nome + ' a essa descr: ' + req.body.descricao);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT - Operação não suportada em Promoções'); 
    })
    .delete((req, res) => {
        res.end('Deletando todas as promoções');
    });
 /// Aqui começa o item específico
itemRouter.route('/:promoId')
    .get((req,res) => {
        res.end('Mandaremos detalhes da promoção: ' + req.params.promoId +' pra ti!');
    })
    .post( (req, res) => {
        res.statusCode = 403;
        res.end('Requisição POST não suportada '+ req.params.promoId);
    })
    .put((req, res, next) => {
        res.write('Atualizando: ' + req.params.promoId + '\n');
        res.end('Vamos atualizar a promoção: ' + req.body.nome + 
              ' com esse descricao: ' + req.body.descricao);
      })
    .delete((req, res, next) => {
          res.end('Apagando promoção: ' + req.params.promoId);
      });
      
    module.exports = rotaPromo;