import { useEffect } from 'react';
import { Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

const Alert = ({ message, variant, closeAlert }) => {
  let icon, color;

  switch (variant) {
    case 'success':
      color = 'success';
      icon = (
        <svg viewBox="0 0 40 40" className="w-5 h-5 fill-current">
          <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
        </svg>
      );
      break;

    case 'primary':
      color = 'primary';
      icon = (
        <svg viewBox="0 0 40 40" className="w-5 h-5 fill-current">
          <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
        </svg>
      );
      break;

    case 'warning':
      color = 'warning';
      icon = (
        <svg viewBox="0 0 40 40" className="w-5 h-5 fill-current">
          <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
        </svg>
      );
      break;

    case 'danger':
      color = 'danger';
      icon = (
        <svg viewBox="0 0 40 40" className="w-5 h-5 fill-current">
          <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
        </svg>
      );
      break;

    default:
      color = 'success';
      icon = (
        <svg viewBox="0 0 40 40" className="w-5 h-5 fill-current">
          <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
        </svg>
      );
  }

  useEffect(() => {
    if (message) {
      setTimeout(closeAlert, 3000);
    }
  }, [message, closeAlert]);

  return (
    <Transition
      show={!!message}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={`fixed right-3 bottom-3 w-96 z-50 text-white rounded bg-${color}`}
      >
        <div className="container flex items-center justify-between px-6 py-4 mx-auto">
          <div className="flex space-x-3">
            {icon}

            <p className="text-sm font-semibold">{message}</p>
          </div>

          <button
            className="p-1 transition-colors duration-200 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none"
            onClick={closeAlert}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 18L18 6M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  );
};

Alert.propTypes = {
  message: PropTypes.string,
  variant: PropTypes.string,
  closeAlert: PropTypes.fun,
};

export default Alert;
