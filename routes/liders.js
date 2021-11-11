const express = require('express');

const rotaLiders = express.Router();

const itemRouter = express.Router({mergeParams: true});

rotaLiders.use('/', itemRouter);

rotaLiders.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.end('Esses são todos os líderes!');
    })
    .post((req, res) => {
        res.end('Vamos adiciona novo lider com o nome: ' + req.body.nome + ' a essa descr: ' + req.body.descricao);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT - Operação não suportada em Lideres'); 
    })
    .delete((req, res) => {
        res.end('Deleting todos os líderes');
    });
 /// Aqui começa o item específico
itemRouter.route('/:liderId')
    .get((req,res) => {
        res.end('Mandaremos detalhes do lider: ' + req.params.liderId +' pra ti!');
    })
    .post( (req, res) => {
        res.statusCode = 403;
        res.end('Requisição POST não suportada '+ req.params.liderId);
    })
    .put((req, res, next) => {
        res.write('Atualizando: ' + req.params.liderId + '\n');
        res.end('Vamos atualizar o lider: ' + req.body.nome + 
              ' com esse descricao: ' + req.body.descricao);
      })
    .delete((req, res, next) => {
          res.end('Apagando lider: ' + req.params.liderId);
      });
      
    module.exports = rotaLiders;