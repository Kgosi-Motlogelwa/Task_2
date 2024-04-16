import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_SHOPS } from '@/graphql/queries';

function ScreensShopList() {
  const [shops, setShops] = useState([]);
  const { data, loading, refetch } = useQuery(GET_SHOPS);

  useEffect(() => {
    document.title = 'All Shops - Marketplace App';
  }, []);

  useEffect(() => {
    refetch();

    if (data && data.getShops && !loading) {
      setShops(data.getShops);
    }
  }, [data, loading, refetch]);

  return (
    <section className="mt-12 mx-4 lg:mx-8 py-5">
      <h1 className="text-3xl font-bold capitalize text-dark mb-10">
        All shops
      </h1>

      {/*  List Shop */}
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-4 gap-y-8">
        {shops.map((shop, index) => (
          <div key={index}>
            <div className="cursor-pointer bg-white flex items-center justify-center flex-col py-8 rounded-lg shadow-sm">
              <Link to={`/shops/${shop?._id}`}>
                <div className="mb-4 w-36 h-36 rounded-full">
                  <img
                    className="w-full h-full object-contain object-center rounded-full"
                    src={shop.imageUrl}
                    alt={shop.name}
                  />
                </div>
              </Link>
              <div className="text-center">
                <Link to={`/shops/${shop?._id}`}>
                  <h2 className="text-xl font-bold text-dark">{shop.name}</h2>
                </Link>
                <p className="text-dark-light text-sm">{shop.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ScreensShopList;
