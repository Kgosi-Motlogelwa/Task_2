import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LIST_RELATED_PRODUCTS } from '../../graphql/queries';

function ProductRelated() {
  const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const { loading, data, refetch } = useQuery(LIST_RELATED_PRODUCTS, {
    variables: { productId },
  });

  useEffect(() => {
    refetch();

    if (data && data.listRelatedProducts && !loading) {
      setProducts(data.listRelatedProducts);
    }
  }, [data, loading, refetch]);

  // if (!data) {
  //   return;
  // }

  return (
    <div
      className={`related-products bg-white rounded-lg shadow-sm py-10 mt-12 ${
        !products && 'hidden'
      }`}
    >
      <h2 className="text-start px-4 lg:px-8 text-dark-light font-bold text-xl capitalize">
        Related products
      </h2>

      <div className="flex items-center space-x-3 mt-8 w-full flex-row overflow-x-auto px-4">
        {/* 1 */}
        {products.map((product, index) => (
          <div
            key={index}
            className="w-full lg:w-1/5 md:w-1/3 sm:w-1/2 py-2 flex-shrink-0 cursor-pointer"
          >
            <div className="flex items-center justify-center h-52">
              <img
                className="relative h-full object-contain object-center"
                src={product.imageUrl}
                alt={product.name}
              />
            </div>

            <div className="text-center px-8">
              <h3 className="md:text-sm text-base font-bold text-dark capitalize">
                {product.name}
              </h3>
              <span className="block opacity-75 md:text-xs text-sm font-semibold capitalize text-dark-light">
                {product.category}
              </span>
              <span className="mt-2 block font-bold text-dark text-2xl">
                {product.price.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductRelated;
