const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const _user = {};

_user.schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },

    // system generated
    createdAt: { type: Number, required: true },
    updatedAt: { type: Number },
  },
  { usePushEach: true },
  { runSettersOnQuery: true },
);

_user.hashPassword = function hashPassword(password) {
  const saltRounds = 5;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

_user.schema.pre('save', function(next) {
  const user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  user.password = _user.hashPassword(user.password);
  next();
});

_user.schema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

_user.model = mongoose.model('users', _user.schema);

module.exports = _user;
