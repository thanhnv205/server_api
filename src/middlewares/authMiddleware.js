import jwt from 'jsonwebtoken'

const authUser = (req, res, next) => {
  const token = req.header('x-auth-token')

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Token không hợp lệ, đăng nhập để tiếp tục' })
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key') // Thay 'your_secret_key' bằng một secret key thực tế

    console.log('decoded', decoded)
    req.user = decoded.user
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token không hợp lệ' })
  }
}

export default authUser
