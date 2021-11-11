const express =  require ('express');
const http = require ('http');
const morgan = require('morgan');
const rotaReceita = require('./routes/receitas');
const rotaLiders = require('./routes/liders')
const rotaPromo = require ('./routes/promocoes')

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(express.json()); // aqui body-parser anteriormente
app.use('/receitas', rotaReceita);
app.use('/liders', rotaLiders);
app.use('/promo', rotaPromo);

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
