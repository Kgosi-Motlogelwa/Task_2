import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FaTag } from 'react-icons/fa6';

import Button from '@/components/UI/Button';
import { GET_PRODUCT } from '@/graphql/queries';
import { addItem } from '@/components/Cart/cart-helpers';

function ProductsDetails() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { data } = useQuery(GET_PRODUCT, {
    variables: { productId: productId },
  });

  const handleChangeQuantity = (type) => {
    if (type === 'increment')
      setQuantity((quantity) => (quantity = quantity + 1));

    if (type === 'decrement') {
      if (quantity > 1) setQuantity((quantity) => (quantity = quantity - 1));
    }
  };

  const addToCart = (product) => {
    const item = {
      product: {
        name: product.name,
        category: product.category,
        price: product.price,
        imageUrl: product.imageUrl,
      },
      quantity: quantity,
      shop: product.shop._id,
    };

    addItem(item, () => navigate('/cart'));
  };

  return (
    <div className="bg-white shadow-sm rounded-lg lg:px-16 px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* image */}
      <div className="flex items-center justify-center">
        <img
          className="w-[340px] h-[420px] object-center object-contain"
          src={data?.getProduct?.imageUrl}
          alt={data?.getProduct?.name}
        />
      </div>

      {/* details */}
      <div className="lg:ml-6 mt-6 flex flex-col">
        <div>
          <span className="flex items-center gap-2 opacity-75 text-sm font-semibold capitalize text-dark-light">
            <FaTag className="transform rotate-90" />
            {data?.getProduct.category}
          </span>
          <h1 className="font-bold text-2xl text-dark capitalize">
            {data?.getProduct.name}
          </h1>

          <div className="mt-3 flex items-center divide-x divide-light-dark">
            <span className="pr-5 font-bold text-dark text-3xl">
              ${data?.getProduct.price.toFixed(2)}
            </span>
            <span
              className={`px-5 capitalize opacity-75 text-sm font-semibold ${
                data?.getProduct.quantity > 0 ? 'text-success' : 'text-danger'
              }`}
            >
              {data?.getProduct.quantity > 0 ? 'In Stock' : 'Out Stock'}
            </span>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-sm text-dark-light font-semibold">
            {data?.getProduct.description}
          </p>
        </div>

        <div className="mt-10 flex items-center md:flex-row flex-col md:space-x-4 space-y-3 md:space-y-0">
          {/* quantity  */}
          <div className="flex-shrink-0 flex items-center w-[80%] md:w-40">
            <Button
              className="!p-3 text-dark bg-light hover:bg-light-dark !shadow-none !rounded-r-none"
              onClick={() => handleChangeQuantity('decrement')}
            >
              <svg className="w-5 h-5 text-current" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19,13H5V11H19V13Z" />
              </svg>
            </Button>
            <input
              type="number"
              className="w-full text-lg font-bold text-center bg-light py-2 text-dark"
              value={quantity}
            />
            <Button
              className="!p-3 text-dark bg-light hover:bg-light-dark !shadow-none !rounded-l-none"
              onClick={() => handleChangeQuantity('increment')}
            >
              <svg className="w-5 h-5 text-current" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                />
              </svg>
            </Button>
          </div>

          <Button
            className="text-white bg-primary leading-7 w-[80%] md:w-52 hover:bg-primary-dark"
            onClick={() => data && addToCart(data?.getProduct)}
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M11,9H13V6H16V4H13V1H11V4H8V6H11M7,18A2,2 0 0,0 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20A2,2 0 0,0 7,18M17,18A2,2 0 0,0 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20A2,2 0 0,0 17,18M7.17,14.75L7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.59 17.3,11.97L21.16,4.96L19.42,4H19.41L18.31,6L15.55,11H8.53L8.4,10.73L6.16,6L5.21,4L4.27,2H1V4H3L6.6,11.59L5.25,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42C7.29,15 7.17,14.89 7.17,14.75Z"
              />
            </svg>
            buy
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductsDetails;
