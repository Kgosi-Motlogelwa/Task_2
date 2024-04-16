import { useEffect } from 'react';
import AuthBase from '@/components/Auth/Base';
import AuthFormLogin from '@/components/Auth/Form/Login';

function ScreensLogin() {
  useEffect(() => {
    document.title = 'Login - Marketplace App';
  }, []);

  return (
    <AuthBase title={'Login'}>
      <AuthFormLogin />
    </AuthBase>
  );
}

export default ScreensLogin;
