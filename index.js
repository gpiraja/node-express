const bodyParser = require('body-parser');
const express =  require ('express');
const http = require ('http');
const morgan = require('morgan');
//const bodyParser = require ('body-parser'); o componente foi preterido e o express o substitui

//const receitaRoutes = 
const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(express.json()); // aqui body-parser anteriormente


app.all('/receita', (req, res, next)=>{
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    next();
});

app.get('/receitas', (req, res, next)=>{
    res.end('Requisição GET recebida. Todas as receitas serão enviadas');
});

app.post('/receitas', (req, res, next)=>{
    res.end('Requisição POST recebida. A receita ' + req.body.nome + ' com as seguintes propriedades :' 
    + req.body.descricao + 'será incluída');
});

app.put ('/receitas', (req, res, next)=>{
    res.statusCode = 403;
    res.end('Operação não permitida');
});

app.delete ('/receitas', (req, res, next)=>{
    res.end('Requisição DELETE recebida. Todas as receitas serão apagadas');
});

app.get('/receitas/:dishId', (req,res,next) => {
    res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});

app.post('/receitas/:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
  });
  
  app.put('/receitas/:dishId', (req, res, next) => {
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + 
          ' with details: ' + req.body.description);
  });
  
  app.delete('/receitas/:dishId', (req, res, next) => {
      res.end('Deleting dish: ' + req.params.dishId);
  });


app.use (express.static (__dirname+'/public'));

app.use ((req, res, next) => {
    console.log(req.headers);
    console.log ('Control+C para encerrar servidor');

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Esse eh um servidor express!</h1></body></html>');
    
});

const server = http.createServer(app);

server.listen(port, hostname, () =>{
     console.log(`Servidor rodando em http://${hostname}:${port}/`);
     console.log ('Control+C para encerrar o servidor');
});
