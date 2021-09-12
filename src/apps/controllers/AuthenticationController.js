const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const { encrypt } = require('../../utils/crypt');

class AuthenticationController {

  async authenticate(req, res) {
    try {

      const { email, password } = req.body;

      const user = await Users.findOne({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ error: 'User not found!' });
      }

      if (!await user.checkPassword(password)) {
        return res.status(401).json({ error: 'Password does not match!' });
      }

      const { id } = user;

      const { iv, content } = encrypt(id);

      const newId = `${iv}:${content}`;

      const token = jwt.sign({ userId: newId }, process.env.HASH_BCRYPT, {
        expiresIn: process.env.EXPIRE_IN,
      });

      return res.status(200).json({ user: { id }, token });
    } catch (error) {
      return res.status(400).json({ error: 'Something is wrong!' })
    }
  }
}

module.exports = new AuthenticationController();
