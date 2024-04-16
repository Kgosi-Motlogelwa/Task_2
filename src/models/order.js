import { Schema, model } from 'mongoose';

// Define CartItem Schema
const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product' },

  quantity: Number,

  shop: { type: Schema.Types.ObjectId, ref: 'Shop' },

  status: {
    type: String,
    default: 'Not processed',
    enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
  },
});

const CartItem = model('CartItem', cartItemSchema);

// Define Order Schema
const orderSchema = new Schema(
  {
    customerName: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
    },

    customerEmail: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
    },

    deliveryAddress: {
      street: {
        type: String,
        required: [true, 'Street is required'],
        trim: true,
      },

      city: { type: String, required: [true, 'City is required'], trim: true },

      state: {
        type: String,
        required: [true, 'State is required'],
        trim: true,
      },

      zipcode: {
        type: String,
        required: [true, 'Zip Code is required'],
        trim: true,
      },

      country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true,
      },
    },

    paymentId: {},

    user: { type: Schema.Types.ObjectId, ref: 'User' },

    products: [cartItemSchema],
  },

  { timestamps: true }
);

orderSchema.pre('save', async function (next) {
  await this.populate('user')
    .populate('products.product')
    .populate('products.shop')
    .execPopulate();

  next();
});

orderSchema.pre(/^find/, function (next) {
  this.populate('user').populate('products.product').populate('products.shop');

  next();
});

const Order = model('Order', orderSchema);

export { Order, CartItem };
