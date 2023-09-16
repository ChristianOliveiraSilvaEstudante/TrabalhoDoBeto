var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const secretKey = process.env.SECRET;

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Buscar o usuário no banco de dados usando Prisma
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
  
      if (!user || user.password !== password) {
        res.status(401).json({ message: 'Credenciais inválidas' });
        return;
      }
  
      // Gerar um token JWT
      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Verificar se o email já está em uso
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
  
      if (existingUser) {
        res.status(400).json({ message: 'Este email já está em uso' });
        return;
      }
  
      // Criar um novo usuário
      const newUser = await prisma.user.create({
        data: {
          email: email,
          password: password,
        },
      });
  
      // Gerar um token JWT para o novo usuário
      const token = jwt.sign({ id: newUser.id }, secretKey, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

module.exports = router;
