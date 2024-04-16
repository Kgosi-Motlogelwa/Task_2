import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { isAuthenticated } from '@/components/Auth/auth-helpers';
import ShopDelete from '@/components/Shop/Delete';
import Button from '@/components/UI/Button';
import { GET_SHOPS } from '@/graphql/queries';

function ScreensShopMyList() {
  const [shops, setShops] = useState([]);
  const { loading, data, refetch } = useQuery(GET_SHOPS, {
    variables: { owner: isAuthenticated().user._id },
  });

  useEffect(() => {
    document.title = 'My Shops - Marketplace App';
  }, []);

  useEffect(() => {
    refetch();

    if (data && data.getShops && !loading) {
      setShops(data.getShops);
    }
  }, [data, loading, refetch]);

  if (!isAuthenticated().user.seller) return <Navigate to="/" />;

  // useEffect(() => {

  // }, []);

  return (
    <section className="mt-12 mx-4 lg:mx-8 py-5">
      <div className="flex items-center mb-10">
        <h1 className="text-3xl font-bold capitalize text-dark">Your shops</h1>
        <Link to="/seller/shop/create" className="ml-auto">
          <Button className="border border-primary text-primary hover:bg-primary-light leading-7">
            <svg className="w-5 h-5 fill-current mr-3" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"
              />
            </svg>
            Create Shop
          </Button>
        </Link>
      </div>

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

              {/*    update and delete shop */}
              <div className="mt-3 space-x-4">
                <Link to={`/seller/shop/${shop?._id}/edit`}>
                  <Button className="text-white bg-success hover:bg-success-dark">
                    <svg
                      className="h-5 w-5 fill-current mr-2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
                      />
                    </svg>
                    edit
                  </Button>
                </Link>

                {/* delete */}
                <ShopDelete shop={shop} reload={refetch} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ScreensShopMyList;
