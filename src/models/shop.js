import { Schema, model } from 'mongoose';

import { BASE_URL } from '../config';

const shopSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
      unique: true,
    },

    image: String,

    description: {
      type: String,
      trim: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJson: { virtuals: true } }
);

shopSchema.virtual('imageUrl').get(function () {
  return (this.imageUrl = this.image && `${BASE_URL}/shop/${this.image}`);
});

shopSchema.pre('save', async function (next) {
  await this.populate('owner').execPopulate();

  next();
});

shopSchema.pre(/^find/, function (next) {
  this.populate('owner');

  next();
});

export default model('Shop', shopSchema);
