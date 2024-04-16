import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SHOP, LIST_PRODUCTS_BY_SHOP } from '@/graphql/queries';
import { Link, useParams } from 'react-router-dom';
import Button from '@/components/UI/Button';

function ScreensShop() {
  const { shopId } = useParams();
  const [shop, setShop] = useState({});
  const [products, setProducts] = useState([]);
  const {
    data: shopData,
    loading: shopLoading,
    refetch: shopRefetch,
  } = useQuery(GET_SHOP, {
    variables: { shopId: shopId },
  });
  const {
    data: productsData,
    loading: productsLoading,
    refetch: productsRefetch,
  } = useQuery(LIST_PRODUCTS_BY_SHOP, {
    variables: { shopId: shopId },
  });

  useEffect(() => {
    document.title = 'Shop - Marketplace App';
  }, []);

  useEffect(() => {
    shopRefetch();

    if (shopData && shopData.getShop && !shopLoading) {
      setShop(shopData.getShop);
    }
  }, [shopData, shopLoading, shopRefetch]);

  useEffect(() => {
    productsRefetch();

    if (productsData && productsData.listProductsByShop && !productsLoading) {
      setProducts(productsData.listProductsByShop);
    }
  }, [productsData, productsLoading, productsRefetch]);

  return (
    <section className="mt-12 mx-4 lg:mx-8 py-5">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-x-4 gap-y-8">
        {/* shop info */}
        <div className="bg-white flex items-center justify-center flex-col py-16 rounded-md shadow-sm h-[460px]">
          <div className="mb-4 w-36 h-36 rounded-full">
            <img
              className="w-full h-full object-contain object-center rounded-full"
              src={shop.imageUrl}
              alt={shop.name}
            />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-dark">{shop.name}</h2>
            <p className="text-dark-light text-sm">{shop.description}</p>
          </div>
        </div>

        {/* list products */}
        <div className="lg:col-span-2">
          <div className="flex items-center mb-10">
            <h1 className="text-2xl font-bold capitalize text-dark">
              Products
            </h1>
          </div>

          {/* List Product */}
          <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="relative shadow-sm bg-white rounded-md overflow-hidden z-10"
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
                        <Button className="border border-primary hover:bg-primary-light text-primary !leading-5 md:w-32 w-36">
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
      </div>
    </section>
  );
}

export default ScreensShop;
