import { useEffect } from 'react';
import ShopFormCreate from '@/components/Shop/Form/Create';

function ScreensShopCreate() {
  useEffect(() => {
    document.title = 'Create Shop - Marketplace App';
  }, []);

  return (
    <div className="min-h-screen min-w-screen mt-12 mx-4 lg:mx-8 py-5">
      <div className="lg:w-3/4 bg-white mx-auto shadow-sm rounded-lg px-4 lg:px-12 py-6">
        <ShopFormCreate />
      </div>
    </div>
  );
}

export default ScreensShopCreate;
