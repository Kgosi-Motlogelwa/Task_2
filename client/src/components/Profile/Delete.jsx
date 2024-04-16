import { Fragment, useState } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import Button from '@/components/UI/Button';
import { useMutation } from '@apollo/client';
import { DELETE_ME } from '@/graphql/mutations';
import { clearJWT } from '@/components/Auth/auth-helpers';
import { useNavigate } from 'react-router-dom';

function ProfileDelete() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const [deleteMe] = useMutation(DELETE_ME);

  const handleRemove = async () => {
    try {
      const { data } = await deleteMe();

      if (data) {
        setIsOpen(false);
        clearJWT(() => navigate('/'));
      }
    } catch (err) {
      console.log({ ...err });
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        className="text-danger !p-4 hover:bg-danger-light !rounded-full !shadow-none"
        onClick={() => setIsOpen(true)}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"
          />
        </svg>
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen text-center flex items-center justify-center">
            <Dialog.Overlay className="fixed bg-dark inset-0 opacity-40" />

            {/* content */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="w-full h-full text-center">
                  <div className="flex h-full flex-col justify-between">
                    <svg
                      width="40"
                      height="40"
                      className="mt-4 w-12 h-12 m-auto text-danger"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M704 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm-544-992h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z" />
                    </svg>
                    <Dialog.Title
                      as="h3"
                      className="text-gray-800 dark:text-gray-200 text-xl font-bold mt-4"
                    >
                      Remove Profile
                    </Dialog.Title>
                    <Dialog.Description
                      as="p"
                      className="text-dark-light text-base py-2 px-6"
                    >
                      Are you sure you want to delete this profile ?
                    </Dialog.Description>
                    <div className="flex items-center justify-around gap-4 w-full mt-8">
                      <Button
                        type="button"
                        className="bg-danger hover:bg-danger-dark text-white w-1/3"
                        onClick={handleRemove}
                      >
                        Delete
                      </Button>
                      <Button
                        type="button"
                        className="text-danger border border-danger bg-white hover:bg-danger-light w-1/3"
                        onClick={closeModal}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default ProfileDelete;
