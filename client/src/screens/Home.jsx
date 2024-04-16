import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_PRODUCTS } from '@/graphql/queries';
import ProductSearch from '@/components/Product/Search';
import ProductLatest from '@/components/Product/Latest';
import Button from '@/components/UI/Button';
import { addItem } from '@/components/Cart/cart-helpers';

function ScreensHome() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({});
  const { data, loading, refetch } = useQuery(GET_PRODUCTS, {
    variables: filter,
  });

  useEffect(() => {
    document.title = 'Home - Marketplace App';
  }, []);

  useEffect(() => {
    refetch();

    if (data && data.getProducts && !loading) {
      setProducts(data.getProducts);
    }
  }, [data, loading, refetch, filter]);

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
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-12 mx-4 lg:mx-8 py-5">
      <div className="lg:col-span-2">
        {/* search  */}
        <ProductSearch handleFilter={setFilter} />

        {/* List Product */}
        <div className="mt-10">
          <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4">
            {products.map((product, index) => (
              <div
                key={index}
                className="relative shadow-sm bg-white rounded-lg overflow-hidden z-10"
              >
                <Link to={`/product/${product._id}`}>
                  <div className="overflow-hidden rounded-t-lg flex items-center justify-center md:h-56 h-64 bg-gray-100 py-2">
                    <img
                      className="relative h-full object-contain object-center"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                  </div>
                </Link>

                {/* content  --text-center*/}
                <div className="py-5 lg:px-4 md:px-4 px-12 text-center">
                  <Link to={`/product/${product._id}`}>
                    <h3 className="font-bold lg:text-base md:text-base text-lg text-dark capitalize transition duration-500 hover:underline">
                      {product.name}
                    </h3>
                  </Link>
                  <span className="block opacity-75 text-sm font-semibold capitalize text-danger">
                    {product.category}
                  </span>

                  <div className="mt-3">
                    <span className="block font-bold text-dark text-3xl lg:text-2xl md:text-2xl transition duration-500">
                      {product.price.toFixed(2)}
                    </span>
                    <div className="mt-1">
                      <Button
                        className="border border-primary hover:bg-primary-light text-primary leading-5 md:w-32 w-36"
                        onClick={() => addToCart(product)}
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
              </div>
            ))}
          </div>
        </div>

        {/* ./ List Products */}
      </div>

      <ProductLatest />
    </section>
  );
}

export default ScreensHome;
