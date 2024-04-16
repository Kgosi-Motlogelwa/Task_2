import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
      minLength: [3, 'Name must be at least 3 characters.'],
    },

    about: {
      type: String,
      trim: true,
      minLength: [10, 'About must be at least 10 characters.'],
    },

    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
      unique: [true, 'Email already exists'],
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [8, 'Password must be at least 8 characters.'],
      select: false,
    },

    seller: { type: Boolean, default: false },

    stripeSeller: {},

    stripeCustomer: {},
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  // this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods = {
  comparePassword: async function (password) {
    return await bcrypt.compare(password, this.password);
  },
};

export default model('User', userSchema);
