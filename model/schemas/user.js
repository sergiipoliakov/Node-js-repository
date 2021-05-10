const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const gravatar = require('gravatar');
const { Gender } = require('../../helper/constants');
const bcrypt = require('bcryptjs');
const SALT_FACTOR = 6;
const userSchema = new Schema(
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
        message: "It's not allowed",
      },
      default: Gender.NONE,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLowerCase());
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

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.validPassword = async function (password) {
  console.log('🚀 ~ file: user.js ~ line 54 ~ password', password);
  return await bcrypt.compare(String(password), this.password);
};

const User = model('user', userSchema);

module.exports = User;
