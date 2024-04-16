import { Schema, model } from 'mongoose';

import { BASE_URL } from '../config';

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
    },

    image: String,

    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },

    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },

    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, 'Price is required'],
      trim: true,
    },

    shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
  },
  { timestamps: true, toObject: { virtuals: true }, toJson: { virtuals: true } }
);

productSchema.virtual('imageUrl').get(function () {
  return (this.imageUrl = this.image && `${BASE_URL}/product/${this.image}`);
});

productSchema.pre('save', async function (next) {
  await this.populate('shop').execPopulate();

  next();
});

productSchema.pre(/^find/, function (next) {
  this.populate('shop');

  next();
});

export default model('Product', productSchema);
