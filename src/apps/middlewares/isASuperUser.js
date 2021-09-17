const Users = require('../models/Users');

const validateSuperUser = async (req, res, next) => {

  try {

    const { user_type } = await Users.findOne({
      attributes: ['user_type'],
      where: {
        id: req.userId
      }
    });

    if (user_type !== 'admin') {
      return res.status(401).json({ message: 'Failed to continue...' });
    }

    return next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Failed to continue...!' });
  }
};

module.exports = validateSuperUser;

