const express = require('express');
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

const prisma = new PrismaClient()
const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const authenticateToken = require('./middlewares/authenticateToken.js');
const cors = require('cors');

const app = express();

// CONFIGURAÇÕES DO SERVDOR
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MIDDLEWARES
app.use('/products', authenticateToken);

// ROTAS
app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/auth', authRouter);

async function main() {
    // primeiro verifica se o sistema ja possui produtos cadastrados, para nao reinseri-los 
    const existingProduct = await prisma.product.findUnique({
        where: { id: 1 },
    });
  
    if (existingProduct) {
        console.log('Produtos já incluidos no sistema');
        return
    }

    console.log('Inserindo Produtos no sistema');

    // buscar dados no dummyjson, use limit como 100 para trazer todos
    const apiUrl = 'https://dummyjson.com/products?limit=100';

    // Fazer a requisição GET
    axios.get(apiUrl)
        .then(async response => {
            await prisma.product.createMany({
                data: response.data.products.map(({ images, ...rest }) => rest) // ver como inserir images junto pq nn ta indo
            })
            .then(e => console.log('Todos os produtos foram inseridos'))
            .catch(e => console.log('Erro ao salvar produtos'));
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });
}
  
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

module.exports = app;
