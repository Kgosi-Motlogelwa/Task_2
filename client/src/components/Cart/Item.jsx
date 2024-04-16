import { useState } from 'react';
import Button from '@/components/UI/Button';
import { removeItem, updateCart } from './cart-helpers';
import PropTypes from 'prop-types';

function CartItem({ item, index, handleRemove }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((quantity) => quantity - 1);
    updateCart(index, quantity - 1);
  };

  const handleIncrement = () => {
    setQuantity((quantity) => quantity + 1);
    updateCart(index, quantity + 1);
  };

  const handleRemoveItem = () => {
    let updatedCartItems = removeItem(index);

    //  disable check out button

    handleRemove(updatedCartItems);
  };

  return (
    <div className="flex justify-between md:items-center md:flex-row flex-col mt-6 md:space-y-0 space-y-2 pt-6">
      <div className="flex items-center">
        <img
          src={item.product.imageUrl}
          className="rounded-lg w-[60px]"
          alt={item.product.name}
        />
        <div className="flex flex-col ml-3">
          <span className="text-sm font-semibold w-auto text-dark capitalize">
            {item.product.name}
          </span>
          <span className="text-xs font-medium text-dark-light capitalize">
            {item.product.category}
          </span>
        </div>
      </div>
      <div className="flex md:justify-center justify-between items-center">
        <div className="lg:pr-8 pr-4 flex items-center">
          <Button
            className="!p-2 text-dark bg-light hover:bg-light-dark !rounded-r-none"
            onClick={handleDecrement}
          >
            <svg className="w-4 h-4 text-current" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,13H5V11H19V13Z" />
            </svg>
          </Button>
          <input
            type="number"
            className="w-12 text-base font-bold text-center py-1 bg-light text-dark"
            value={quantity}
            onChange={() => {}}
          />
          <Button
            className="!p-2 text-dark bg-light hover:bg-light-dark !rounded-l-none"
            onClick={handleIncrement}
          >
            <svg className="w-4 h-4 text-current" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
              />
            </svg>
          </Button>
        </div>

        <div className="pr-8">
          <span className="text-xs text-dark font-bold">
            ${item.product.price.toFixed(2)}
          </span>
        </div>

        <div>
          <Button
            className="bg-light hover:bg-light-dark !p-2 !rounded-full text-dark"
            onClick={handleRemoveItem}
          >
            <svg className="w-5 h-5 text-current" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  handleRemove: PropTypes.func,
};

export default CartItem;
