import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/UI/Button';

const ScreensNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Page Not Found - Marketplace App';
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="h-[200px] w-[400px]">
        <h1 className="text-dark text-6xl font-bold">404</h1>
        <p className="text-dark-light text-2xl ">Page not found</p>
        <div className="mt-[15px] w-full flex gap-2">
          <Button
            className="bg-primary hover:bg-primary-dark text-white min-w-[150px]"
            onClick={(e) => {
              navigate(-1);
              e.preventDefault();
            }}
          >
            Go Back
          </Button>
          <Button
            className="border border-primary hover:bg-primary-light text-primary min-w-[150px]"
            onClick={(e) => {
              navigate('/');
              e.preventDefault();
            }}
          >
            Go to Home Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScreensNotFound;
