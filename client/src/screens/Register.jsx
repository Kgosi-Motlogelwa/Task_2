import { useEffect } from 'react';
import AuthBase from '@/components/Auth/Base';
import AuthFormRegister from '@/components/Auth/Form/Register';

function ScreensRegister() {
  useEffect(() => {
    document.title = 'Register - Marketplace App';
  }, []);

  return (
    <AuthBase title={'Register'}>
      <AuthFormRegister />
    </AuthBase>
  );
}

export default ScreensRegister;
