import { useEffect } from 'react';
import CartItems from '@/components/Cart/Items';

function ScreensCart() {
  useEffect(() => {
    document.title = 'Shopping Cart - Marketplace App';
  }, []);

  return (
    <section className="min-w-screen min-h-screen mt-12 mx-4 lg:mx-8 py-5">
      <div className="w-full bg-white shadow-sm rounded-lg">
        <div className="md:flex">
          <div className="w-full p-4 px-5 py-5">
            <div className="md:grid md:grid-cols-3 gap-2 ">
              <div className="col-span-2 p-5">
                <h1 className="text-xl font-semibold text-dark capitalize">
                  Shopping Cart
                </h1>

                {/* items */}
                <CartItems />
              </div>

              {/* shopping cart */}
              {/* <div className="bg-light">shopping cart</div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScreensCart;
