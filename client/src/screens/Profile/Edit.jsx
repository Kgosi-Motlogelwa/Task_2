import { useEffect } from 'react';
import ProfileFormSetting from '@/components/Profile/Form/Setting';
import ProfileFormPassword from '@/components/Profile/Form/Password';

function ScreensProfileEdit() {
  useEffect(() => {
    document.title = 'Edit Profile - Marketplace App';
  }, []);

  return (
    <div className="min-h-screen min-w-screen mt-12 mx-4 lg:mx-8 py-5">
      <div className="lg:w-2/4 md:w-3/4 bg-white mx-auto shadow-sm rounded-lg px-4 py-6 divide-y divide-light-dark">
        {/* Change settings */}
        <ProfileFormSetting />

        {/* Change Password */}
        <ProfileFormPassword />
      </div>
    </div>
  );
}

export default ScreensProfileEdit;
