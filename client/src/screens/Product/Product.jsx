import { useEffect } from 'react';
import ProductsDetails from '@/components/Product/Details';
import ProductRelated from '@/components/Product/Related';

function ScreensProduct() {
  useEffect(() => {
    document.title = 'Product - Marketplace App';
  }, []);

  return (
    <section className="mt-12 mx-4 lg:mx-8 py-5">
      {/*  Product Details  */}
      <ProductsDetails />

      {/*  Product Related */}
      <ProductRelated />
    </section>
  );
}

export default ScreensProduct;
