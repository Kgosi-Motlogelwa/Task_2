import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';

import { LIST_LATEST_PRODUCTS } from '@/graphql/queries';
import Button from '@/components/UI/Button';
import { addItem } from '@/components/Cart/cart-helpers';

function ProductLatest() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { loading, data, refetch } = useQuery(LIST_LATEST_PRODUCTS);

  useEffect(() => {
    refetch();

    if (data && data.listLatestProducts && !loading) {
      setProducts(data.listLatestProducts);
    }
  }, [data, loading, refetch]);

  const addToCart = (product) => {
    const item = {
      product: {
        name: product.name,
        category: product.category,
        price: product.price,
        imageUrl: product.imageUrl,
      },
      quantity: 1,
      shop: product.shop._id,
    };

    addItem(item, () => navigate('/cart'));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm py-5 h-[850px]">
      {/* Title */}
      <h3 className="text-lg capitalize font-bold text-dark-light px-4 lg:px-8 mb-3">
        Latest products
      </h3>

      {/* List products  */}
      <div className="flex flex-col px-3 divide-y divide-light">
        {products.map((product, index) => (
          <div key={index}>
            <div className="py-3 px-2 flex items-center">
              <Link to={`/product/${product._id}`}>
                <div className="w-32 h-32 rounded-md overflow-hidden flex items-center justify-center flex-shrink-0 bg-gray-100 py-2">
                  <img
                    className="relative h-full object-contain object-center"
                    src={product.imageUrl}
                    alt={product.name}
                  />
                </div>
              </Link>

              {/* content  --text-center*/}
              <div className="ml-3">
                <Link to={`/product/${product._id}`}>
                  <h3 className="font-bold text-sm text-dark capitalize hover:underline">
                    {product.name}
                  </h3>
                </Link>
                <span className="block opacity-75 text-xs font-semibold capitalize text-dark-light">
                  {product.category}
                </span>

                <div className="mt-2">
                  <span className="block font-bold text-dark text-xl lg:text-lg md:text-lg">
                    {product.price.toFixed(2)}
                  </span>
                  <div className="mt-1 space-x-4">
                    <Button
                      className="px-4 text-white bg-primary hover:bg-primary-dark"
                      onClick={() => addToCart(product)}
                    >
                      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M11,9H13V6H16V4H13V1H11V4H8V6H11M7,18A2,2 0 0,0 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20A2,2 0 0,0 7,18M17,18A2,2 0 0,0 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20A2,2 0 0,0 17,18M7.17,14.75L7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.59 17.3,11.97L21.16,4.96L19.42,4H19.41L18.31,6L15.55,11H8.53L8.4,10.73L6.16,6L5.21,4L4.27,2H1V4H3L6.6,11.59L5.25,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42C7.29,15 7.17,14.89 7.17,14.75Z"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductLatest;
