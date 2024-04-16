import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/UI/Button';
import ProfileDelete from './Delete';
import { useQuery } from '@apollo/client';

import { GET_ME } from '@/graphql/queries';

function Profile() {
  const [user, setUser] = useState({});
  const { data } = useQuery(GET_ME);

  useEffect(() => {
    if (data) {
      setUser(data.getMe);
    }
  }, [data]);

  return (
    <>
      <div className="flex items-center mt-5 border-b border-light-dark py-3 px-2">
        {/* image profile */}
        <div className="bg-light-dark text-dark h-16 w-16 rounded-full flex items-center justify-center">
          {/* <img className="object-contain object-center rounded-full" alt="profil" src="https://i.pravatar.cc/150?img=66" /> */}
          <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
            />
          </svg>
        </div>

        {/* info profile */}
        <div className="flex items-center mx-4 flex-grow">
          <div className="flex flex-col">
            <h3 className="font-semibold text-dark capitalize">{user.name}</h3>
            <span className="text-sm text-dark-light lowercase -mt-1">
              {user.email}
            </span>
          </div>
          <div className="ml-auto space-x-3">
            <Link
              to="/profile/me/edit"
              className=" hover:bg-blue hover:text-white text-blue"
            >
              <Button className="text-success !p-4 hover:bg-success-light !rounded-full !shadow-none">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
                  />
                </svg>
              </Button>
            </Link>

            {/*  Delete Profile*/}
            <ProfileDelete />
          </div>
        </div>
      </div>

      {/* another info */}
      <div className="font-medium py-3 px-2">
        <p className="text-sm text-dark-light">{user.about}</p>
        <p className="text-xs text-dark-light mt-1 opacity-75">
          <span className="font-bold">Joined:</span>{' '}
          {new Date(+user.createdAt).toDateString()}
        </p>
      </div>
    </>
  );
}

export default Profile;
