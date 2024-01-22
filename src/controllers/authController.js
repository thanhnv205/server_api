// Trong file controllers/authController.js
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Giả sử bạn có một model User để thực hiện xác thực, bạn cần thay thế User model bằng model thực tế của bạn
import { UserModel } from '../models/userModel';

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Kiểm tra xem người dùng có tồn tại không
		const user = await UserModel.findOne({ email });
		if (!user) {
			return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Email hoặc mật khẩu không đúng' });
		}

		// Kiểm tra mật khẩu
		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) {
			return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Email hoặc mật khẩu không đúng' });
		}

		// Tạo JWT token
		const token = jwt.sign({ user: { id: user._id } }, 'your_secret_key', { expiresIn: '1h' });

		res.status(StatusCodes.OK).json({ token });
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
	}
};

export { loginUser };
