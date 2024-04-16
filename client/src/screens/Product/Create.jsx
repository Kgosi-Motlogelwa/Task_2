import { useEffect } from 'react';
import ProductFormCreate from '@/components/Product/Form/Create';

function ScreensProductCreate() {
  useEffect(() => {
    document.title = 'Create Product - Marketplace App';
  }, []);

  return (
    <div className="min-h-screen min-w-screen mt-12 mx-4 lg:mx-8 py-5">
      <div className="lg:w-3/4 bg-white mx-auto shadow-sm rounded-lg px-4 lg:px-12 py-6">
        <ProductFormCreate />
      </div>
    </div>
  );
}

export default ScreensProductCreate;
