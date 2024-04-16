import { useState } from 'react';
import Button from '@/components/UI/Button';
import { Link } from 'react-router-dom';
import CartItem from './Item';
import { getCart } from './cart-helpers';

function CartItems() {
  const [items, setItems] = useState(getCart());

  const totalPrice = () => {
    return items.reduce((a, b) => {
      return a + b.quantity * b.product.price;
    }, 0);
  };

  return (
    <>
      {items.map((item, index) => (
        <CartItem
          item={item}
          index={index}
          key={index}
          handleRemove={setItems}
        />
      ))}

      <div className="flex justify-between items-center mt-6 pt-6 border-t border-light-dark">
        <div className="flex items-center">
          <Link to="/">
            <Button className="bg-primary hover:bg-primary-dark text-white">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M21,11H6.83L10.41,7.41L9,6L3,12L9,18L10.41,16.58L6.83,13H21V11Z"
                />
              </svg>
              Continue Shopping
            </Button>
          </Link>
        </div>
        <div className="flex justify-center items-end">
          <span className="text-sm font-medium text-dark-light mr-2 capitalize">
            Subtotal:
          </span>
          <span className="text-lg font-bold text-dark">
            ${totalPrice().toFixed(2)}
          </span>
        </div>
      </div>
    </>
  );
}

export default CartItems;
