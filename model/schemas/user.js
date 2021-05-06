const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const gravatar = require('gravatar');
const { Gender } = require('../../helper/constants');
const SALT_FACTOR = 6;
const bcrypt = require('bcryptjs');

const usersSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      default: 'Guest',
    },
    gender: {
      type: String,
      enum: {
        values: [Gender.MALE, Gender.FEMALE, Gender.NONE],
        message: 'It is not allowed',
      },
      default: Gender.NONE,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLocaleLowerCase());
      },
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250' }, true);
      },
    },
    idCloudAvatar: {
      type: String,
      default: null,
    },
  },

  {
    versionKey: false,
    timestamps: true,
  },
);

usersSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = bcrypt.genSaltSync(SALT_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

usersSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(String(password), this.password);
};

const User = model('user', usersSchema);

module.exports = User;
