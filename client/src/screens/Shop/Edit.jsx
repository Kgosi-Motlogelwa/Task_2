import { useEffect, useState } from 'react';
import ShopFormEdit from '@/components/Shop/Form/Edit';
import Button from '@/components/UI/Button';
import { Link, useParams } from 'react-router-dom';
import { LIST_PRODUCTS_BY_SHOP } from '@/graphql/queries';
import ProductDelete from '@/components/Product/Delete';
import { useQuery } from '@apollo/client';

function ScreensShopEdit() {
  const { shopId } = useParams();
  const [products, setProducts] = useState([]);
  const { loading, data, refetch } = useQuery(LIST_PRODUCTS_BY_SHOP, {
    variables: { shopId },
  });

  useEffect(() => {
    document.title = 'Edit Shop - Marketplace App';
  }, []);

  useEffect(() => {
    refetch();

    if (data && data.listProductsByShop && !loading) {
      setProducts(data.listProductsByShop);
    }
  }, [data, loading, refetch]);

  return (
    <div className="min-h-screen min-w-screen mt-12 mx-4 lg:mx-8 py-5">
      <div className="grid md:grid-cols-12 grid-cols-1 gap-4">
        {/* update shop */}
        <ShopFormEdit />

        {/* list products */}
        <div className="lg:col-span-7 md:col-span-6 lg:px-4 py-6">
          <div className="mb-10 flex items-center">
            <h1 className="font-bold text-xl text-dark capitalize">Products</h1>
            <Link to={`/seller/${shopId}/product/create`} className="ml-auto">
              <Button className="border-primary border text-primary hover:bg-primary-light">
                <svg className="w-5 h-5 fill-current mr-3" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"
                  />
                </svg>
                create product
              </Button>
            </Link>
          </div>

          {/* List Products */}
          <div className="flex flex-col space-y-4">
            {products.map((product, index) => (
              <div key={index}>
                <div className="bg-white shadow-sm rounded-lg">
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
                          <Link to={`/seller/${shopId}/${product._id}/edit`}>
                            <Button className="!px-4 text-white bg-success hover:bg-success-dark">
                              <svg
                                className="h-5 w-5 fill-current"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
                                />
                              </svg>
                            </Button>
                          </Link>

                          {/*  delete */}
                          <ProductDelete product={product} reload={refetch} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/*  fin */}
        </div>
      </div>
    </div>
  );
}

export default ScreensShopEdit;
