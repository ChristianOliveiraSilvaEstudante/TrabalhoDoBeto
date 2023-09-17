var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// Rota para criar um novo produto
router.post('/', async (req, res) => {
  const { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail } = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        thumbnail
      }
    });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para listar todos os produtos
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Página atual (padrão: 1)
  const pageSize = parseInt(req.query.pageSize) || 5; // Tamanho da página (padrão: 5)

  try {
    const products = await prisma.product.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        images: true, // Isso garante que as imagens sejam retornadas junto com os produtos
      },
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para obter detalhes de um produto específico
router.get('/:id', async (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
      },
    });

    if (!product) {
      res.status(404).json({ message: 'Produto não encontrado' });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para atualizar um produto
router.put('/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  const { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        thumbnail,
        images: {
          upsert: images.map((image) => ({
            where: { id: image.id || -1 },
            update: image,
            create: image,
          })),
        },
      },
      include: {
        images: true,
      },
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para excluir um produto
router.delete('/:id', async (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    res.json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
