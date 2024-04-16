import { useEffect } from 'react';
import ProductFormEdit from '@/components/Product/Form/Edit';

function ScreensProductEdit() {
  useEffect(() => {
    document.title = 'Edit Product - Marketplace App';
  }, []);

  return (
    <div className="min-h-screen min-w-screen mt-12 mx-4 lg:mx-8 py-5">
      <div className="lg:w-3/4 bg-white mx-auto shadow-sm rounded-lg px-4 lg:px-12 py-6">
        <ProductFormEdit />
      </div>
    </div>
  );
}

export default ScreensProductEdit;
