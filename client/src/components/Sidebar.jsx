import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from './UI/Button';
import { NavLink, Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function Sidebar({ closeSidebar, isOpen }) {
  const { pathname } = useLocation();

  return (
    <Transition as="aside" show={isOpen}>
      <Dialog
        as="div"
        className="fixed top-0 left-0 w-full h-full z-50 overflow-y-auto"
        onClose={closeSidebar}
      >
        <div className="min-h-screen flex">
          <Dialog.Overlay className="fixed bg-dark inset-0 opacity-40" />

          {/* content */}
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative bg-dark">
              <div className="flex flex-col sm:flex-row sm:justify-around">
                <div className="w-72 h-screen">
                  <nav className="py-2 flex flex-col h-full">
                    {/* Brand */}
                    <div className="font-sans inline-flex items-center py-2 px-2.5">
                      {/*<FaStoreAlt className="text-danger" size="25" />*/}
                      <span className="text-2xl font-bold tracking-wide text-light-dark capitalize">
                        marketplace
                      </span>

                      <Button
                        className="!p-4 text-white ml-auto hover:bg-dark-light !shadow-none !rounded-full"
                        onClick={closeSidebar}
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z"
                          />
                        </svg>
                      </Button>
                    </div>

                    {/* nav items */}
                    <ul className="flex flex-col space-y-3 mt-24 px-3">
                      <li>
                        <Link to="/">
                          <Button
                            className={`w-full !leading-7 opacity-75 text-white !font-normal !justify-start !capitalize !text-base !shadow-none ${
                              pathname === '/'
                                ? 'opacity-100 bg-dark-light'
                                : 'hover:opacity-100 hover:bg-dark-light'
                            }`}
                            onClick={closeSidebar}
                          >
                            home
                          </Button>
                        </Link>
                      </li>
                      <li>
                        <NavLink to="/shops/all">
                          <Button
                            className={`w-full !leading-7 opacity-75 text-white !font-normal !justify-start !capitalize !text-base !shadow-none ${
                              pathname === '/shops/all'
                                ? 'opacity-100 bg-dark-light'
                                : 'hover:opacity-100 hover:bg-dark-light'
                            }`}
                            onClick={closeSidebar}
                          >
                            all shops
                          </Button>
                        </NavLink>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

Sidebar.propTypes = {
  closeSidebar: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default Sidebar;
