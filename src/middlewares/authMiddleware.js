import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new Error('Authentication Invalid')
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: payload.userId }

    next()
  } catch (error) {
    res.status(401).json({ message: 'Algo deu errado' })
  }
}

export default authMiddleware
