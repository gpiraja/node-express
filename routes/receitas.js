const express = require('express');

const rotaReceita = express.Router();

const itemRouter = express.Router({mergeParams: true});

rotaReceita.use('/', itemRouter);

rotaReceita.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.end('Will send all the dishes to you!');
    })
    .post((req, res) => {
        res.end('Will add the dish: ' + req.body.nome + ' with details: ' + req.body.descricao);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes'); 
    })
    .delete((req, res) => {
        res.end('Deleting all dishes');
    });
 /// Aqui começa o item específico
itemRouter.route('/:dishId')
    .get((req,res) => {
        res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
    })
    .post( (req, res) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/'+ req.params.dishId);
    })
    .put((req, res, next) => {
        res.write('Updating the dish: ' + req.params.dishId + '\n');
        res.end('Will update the dish: ' + req.body.nome + 
              ' with details: ' + req.body.descricao);
      })
    .delete((req, res, next) => {
          res.end('Deleting dish: ' + req.params.dishId);
      });
      
    module.exports = rotaReceita;
    