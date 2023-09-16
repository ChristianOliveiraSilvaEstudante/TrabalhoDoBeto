const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET;

function authenticateToken(req, res, next) {
  // Obtenha o token do cabeçalho de autorização
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }

  // Verifique o token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token de autenticação inválido' });
    }

    // Decodificado com sucesso, coloque o usuário no objeto de solicitação
    req.user = decoded;
    next();
  });
}

module.exports = authenticateToken;