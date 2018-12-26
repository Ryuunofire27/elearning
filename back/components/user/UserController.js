const Joi = require('joi');
const mongoose = require('mongoose');
const validator = require('validator');
const uDAO = require('./UserDAO');
const { AppError } = require('../error');

class UserController {
  static async getUsers(req, res) {
    try {
      const filters = {};

      if (req.query) {
        if (req.query.search) {
          Joi.assert(req.query.search, Joi.string().regex(/^[A-Z]+$/i), new AppError('Search validate', 'Error en el criterio de busqueda, solo se permiten valores alfabeticos', 400));
          filters.search = req.query.search;
        }
        if (req.query.limit) {
          Joi.assert(req.query.limit, Joi.number(), new AppError('Search validate', 'Error en la cantidad de usuarios por pagina, solo se permite valores numericos', 400));
          Joi.assert(req.query.limit, Joi.number().min(10).max(100), new AppError('Search validate', 'Error en la cantidad de usuarios por pagina, la cantidad maxima es 100 y la minima es 10', 400));
          filters.search = req.query.search;
        }
        if (req.query.page) {
          Joi.assert(req.query.page, Joi.number(), new AppError('Search validate', 'Error en el numero de pagina, solo se permiten valores numericos', 400));
          filters.page = req.query.page;
        }
      }

      const users = await uDAO.getUsers(filters);
      return res.json({ users });
    } catch (err) {
      if (err.isOperational) {
        return res.status(500).json({ message: 'Estamos teniendo dificultades tecnicas, intentelo mas tarde.' });
      }
      return res.status(err.status || 500).json({ message: err.message });
    }
  }

  static async createUser(req, res) {
    try {
      const { body } = req;

      if (!body) throw new AppError('UserController error', 'Error, todos los campos son requeridos', 400);
      else {
        Joi.assert(body.name, Joi.string().required(), new AppError('UserController Error', 'El campo de nombre es requerido', 400));
        Joi.assert(body.name, Joi.string().regex(/^[A-Z]+$/i), new AppError('UserController Error', 'El campo de nombre solo permite valores alfabeticos', 400));
        Joi.assert(body.lastName, Joi.string().required(), new AppError('UserController Error', 'El campo de apellido es requerido', 400));
        Joi.assert(body.lastName, Joi.string().regex(/^[A-Z]+$/i), new AppError('UserController Error', 'El campo de apellido solo permite valores alfabeticos', 400));
        Joi.assert(body.password, Joi.string().required(), new AppError('UserController Error', 'El campo de contraseña es requerido', 400));
        Joi.assert(body.confirmPassword, Joi.string().required(), new AppError('UserController Error', 'El campo de confirmar contraseña es requerido', 400));
        Joi.assert(body.email, Joi.string().required(), new AppError('UserController Error', 'El campo de correo es requerido', 400));
        if (!validator.isEmail(body.email)) throw new AppError('UserController Error', 'El campo de correo ingresado no es valido, por favor ingrese un correo valido', 400);
        if (body.password !== body.confirmPassword) throw new AppError('UserController Error', 'Las contraseñas no coinciden', 400);
      }

      const user = {
        email: body.email,
        password: body.password,
        profile: {
          name: body.name,
          lastName: body.lastName,
        },
      };
      const { newUser, token } = await uDAO.createUser(user);
      return res.status(201).json({ user: newUser, token });
    } catch (err) {
      if (err.isOperational) {
        return res.status(500).json({ message: 'Estamos teniendo dificultades tecnicas, intentelo mas tarde.' });
      }
      return res.status(err.status || 500).json({ message: err.message });
    }
  }

  static async getUser(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) throw new AppError('User id', 'Error, el id ingresado no es valido, por favor asegurese de ingresar el id correctamente', 400);

      const user = await uDAO.getUser(id);
      if (!user) return res.status(404).json({ message: 'El usuario seleccionado no existe' });
      return res.json({ user });
    } catch (err) {
      if (err.isOperational) {
        return res.status(500).json({ message: 'Estamos teniendo dificultades tecnicas, intentelo mas tarde.' });
      }
      return res.status(err.status || 500).json({ message: err.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError('User id', 'Error, el id ingresado no es valido, por favor asegurese de ingresar el id correctamente', 400);
      }

      if (req.jwtData.userId && id !== req.jwtData.userId) throw new AppError('Update User authorization error', 'Error, no tiene autorización para realizar esta acción');

      if (!body) {
        throw new AppError('UserController error', 'Error, todos los campos son requeridos', 400);
      } else {
        Joi.assert(body.name, Joi.string().required(), new AppError('UserController Error', 'El campo de nombre es requerido', 400));
        Joi.assert(body.name, Joi.string().regex(/^[A-Z]+$/i), new AppError('UserController Error', 'El campo de nombre solo permite valores alfabeticos', 400));
        Joi.assert(body.lastName, Joi.string().required(), new AppError('UserController Error', 'El campo de apellido es requerido', 400));
        Joi.assert(body.lastName, Joi.string().regex(/^[A-Z]+$/i), new AppError('UserController Error', 'El campo de apellido solo permite valores alfabeticos', 400));
      }

      const user = {
        id,
        name: body.name,
        lastName: body.lastName,
      };
      await uDAO.updateUser(user);
      return res.status(204).send();
    } catch (err) {
      if (err.isOperational) {
        return res.status(500).json({ message: 'Estamos teniendo dificultades tecnicas, intentelo mas tarde.' });
      }
      return res.status(err.status || 500).json({ message: err.message });
    }
  }

  static async login(req, res) {
    try {
      const { body } = req;
      if (!body) throw new AppError('UserController error', 'Error, todos los campos son requeridos', 400);
      else {
        Joi.assert(body.password, Joi.string().required(), new AppError('UserController Error', 'La contraseña es requerida', 400));
        Joi.assert(body.email, Joi.string().required(), new AppError('UserController Error', 'El correo es requerido', 400));
        if (!validator.isEmail(body.email)) throw new AppError('UserController Error', 'El correo ingresado no es valido, por favor ingrese un correo valido', 400);
      }

      const { user, token } = await uDAO.loginUser(body);
      return res.status(200).json({ user, token });
    } catch (err) {
      if (err.isOperational) {
        return res.status(500).json({ message: 'Estamos teniendo dificultades tecnicas, intentelo mas tarde.' });
      }
      return res.status(err.status || 500).json({ message: err.message });
    }
  }

  static async authenticate(req, res) {
    console.log('pasa')
    return res.status(200).send({ message: 'Autenticación correcta' });
  }
}

module.exports = UserController;
