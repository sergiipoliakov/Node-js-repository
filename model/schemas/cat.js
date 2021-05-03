const mongoose = require('mongoose');
const { Schema, model, SchemaTypes } = mongoose;

const catSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, 'Set name for cat'],
    },
    age: {
      type: Number,
      min: 1,
      max: 45,
    },
    isVaccinated: {
      type: Boolean,
      default: false,
    },
    features: {
      type: Array,
      set: data => (!data ? [] : data),
      get: data => data.sort(),
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.name;
        return ret;
      },
    },
  },
);

catSchema.path('name').validate(value => {
  const re = /[A-Z]\w+/;
  return re.test(String(value));
});

catSchema.virtual('nick').get(function () {
  return `${this.name}`;
});

const Cat = model('cat', catSchema);

module.exports = Cat;
