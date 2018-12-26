const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { AppError } = require('../error/');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  profile: {
    name: String,
    lastName: String,
    picture: String,
  },
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  return bcrypt.genSalt(10, (err, salt) => {
    if (err) throw new Error(err.message);
    return bcrypt.hash(user.password, salt, null, (err1, hash) => {
      if (err1) throw new Error(err1.message);
      user.password = hash;
      return next();
    });
  });
});

userSchema.methods.comparePassword = function comparePassword(password) {
  return new Promise((resolve, reject) => {
    if (this === undefined) return reject(new AppError('User error', { msg: 'Ha ocurrido un error en el servidor' }, false));
    return bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) return reject(new AppError('User error', { msg: 'Ha ocurrido un error en el servidor' }, false));
      return resolve(isMatch);
    });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
