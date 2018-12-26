const jwt = require('jsonwebtoken');
const User = require('./User');
const { AppError } = require('../error');

class UserDAO {
  static async getUsers(filters = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const users = await User.find(filters);
        return resolve(users);
      } catch (err) {
        if (err.isOperational !== undefined) {
          return reject(new AppError('DAO Error', err.message, err.status || 500, err.isOperational));
        }
        return reject(new AppError('DAO Error', err.message, err.status || 500, err.isOperational || true));
      }
    });
  }

  static async createUser(user) {
    return new Promise(async (resolve, reject) => {
      try {
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) throw new AppError('DAO Error', 'Ya existe un usuario registrado con el correo ingresado', 409);
        let newUser = new User(user);
        newUser = await newUser.save();
        const token = jwt.sign(
          {
            userId: newUser._id,
            email: newUser.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: 86400,
          },
        );
        return resolve({ newUser, token });
      } catch (err) {
        if (err.isOperational !== undefined) {
          return reject(new AppError('DAO Error', err.message, err.status || 500, err.isOperational));
        }
        return reject(new AppError('DAO Error', err.message, err.status || 500, true));
      }
    });
  }

  static async getUser(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findById(id);
        if (!user) throw new AppError('UserDAO getUser Error', 'No se ha encontrado el usuario seleccionado', 404);
        return resolve(user);
      } catch (err) {
        if (err.isOperational !== undefined) {
          return reject(new AppError('DAO Error', err.message, err.status || 500, err.isOperational));
        }
        return reject(new AppError('DAO Error', err.message, err.status || 500, err.isOperational || true));
      }
    });
  }

  static async updateUser(user) {
    return new Promise(async (resolve, reject) => {
      try {
        const existingUser = await User.findById(user.id);
        if (!existingUser) throw new AppError('UserDAO getUser Error', 'No se ha encontrado el usuario seleccionado', 404);

        existingUser.profile = {
          name: user.name || existingUser.name,
          lastName: user.lastName || existingUser.lastName,
        };

        await existingUser.save();
        return resolve();
      } catch (err) {
        if (err.isOperational !== undefined) {
          return reject(new AppError('DAO Error', err.message, err.status || 500, err.isOperational));
        }
        return reject(new AppError('DAO Error', err.message, err.status || 500, true));
      }
    });
  }

  static async loginUser(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const existingUser = await User.findOne({ email: data.email });
        if (!existingUser) throw new AppError('UserDAO loginUser Error', 'No existe ningun usuario registrado con el correo ingresado', 404);

        const isMatch = await existingUser.comparePassword(data.password);
        if (!isMatch) throw new AppError('UserDAO loginUser Error', 'Contraseña incorrecta', 401);

        const token = jwt.sign(
          {
            userId: existingUser._id,
            email: existingUser.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: 86400,
          },
        );
        return resolve({ user: existingUser, token });
      } catch (err) {
        if (err.isOperational !== undefined) {
          return reject(new AppError('DAO Error', err.message, err.status || 500, err.isOperational));
        }
        return reject(new AppError('DAO Error', err.message, err.status || 500, true));
      }
    });
  }
}

module.exports = UserDAO;
