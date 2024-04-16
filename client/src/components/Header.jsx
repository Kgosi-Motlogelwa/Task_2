import { Fragment } from 'react';
import cn from 'classnames';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Button from './UI/Button';
import { Menu, Transition } from '@headlessui/react';
import { clearJWT, isAuthenticated } from './Auth/auth-helpers';
import PropTypes from 'prop-types';

const Header = ({ openSidebar }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <header>
      <nav className="px-4 py-2 lg:px-8 flex-wrap items-center grid lg:grid-cols-3 grid-cols-2 w-full bg-dark">
        {/* Left List items */}
        <ul className="space-x-1 items-center lg:flex hidden">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  'font-sans w-full lg:w-auto font-medium tracking-wide inline-flex items-center justify-center px-5 text-white transition duration-200 capitalize',
                  {
                    'opacity-100': isActive,
                    'opacity-75 hover:opacity-100': !isActive,
                  }
                )
              }
            >
              home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/shops/all"
              className={({ isActive }) =>
                cn(
                  'font-sans w-full lg:w-auto font-medium tracking-wide inline-flex items-center justify-center px-5 text-white transition duration-200 capitalize',
                  {
                    'opacity-100': isActive,
                    'opacity-75 hover:opacity-100': !isActive,
                  }
                )
              }
            >
              all shops
            </NavLink>
          </li>
        </ul>

        {/* Button Menu */}
        <div className="lg:hidden">
          <Button
            className="!p-3 text-white bg-dark-light hover:bg-danger !rounded-full"
            onClick={openSidebar}
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
              />
            </svg>
          </Button>
        </div>

        {/* sidebar */}

        {/* Logo */}
        <Link
          to="/"
          className="font-sans lg:inline-flex hidden items-center mx-auto"
        >
          {/*<FaStoreAlt className="text-danger" size="25" />*/}
          <span className="ml-2 text-xl font-bold tracking-wide text-light-dark capitalize">
            marketplace
          </span>
        </Link>

        {/* Right List items */}
        <ul className="space-x-3 flex items-center ml-auto">
          <li>
            <Link to="/cart">
              <Button
                className={`!p-3 text-white bg-dark-light hover:bg-danger !rounded-full ${
                  pathname === '/cart' && '!bg-danger'
                }`}
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z"
                  />
                </svg>
              </Button>
            </Link>
          </li>
          <li>
            <Menu as="div" className="relative inline-block text-left">
              {({ open }) => (
                <>
                  <Menu.Button
                    as={Button}
                    className={`!p-3 text-white bg-dark-light hover:bg-danger !rounded-full ${
                      open && '!bg-danger'
                    }`}
                  >
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                      />
                    </svg>
                  </Menu.Button>

                  <Transition
                    open={open}
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      static
                      className="absolute z-[100] py-4 right-0 w-56 mt-3 origin-top-right bg-white divide-y divide-light-dark rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none "
                    >
                      {!isAuthenticated() && (
                        <div className="px-1 py-1">
                          <Menu.Item>
                            <Link to="/login">
                              <Button
                                className={`w-full !capitalize !justify-start !shadow-none mb-1
                            ${
                              pathname === '/login'
                                ? 'bg-primary-light text-primary'
                                : 'hover:bg-primary-light hover:text-primary'
                            }
                            `}
                              >
                                <svg
                                  className="h-5 w-5 text-current mr-2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z"
                                  />
                                </svg>
                                Login
                              </Button>
                            </Link>
                          </Menu.Item>
                          <Menu.Item>
                            <Link to="/register">
                              <Button
                                className={`w-full !capitalize !justify-start !shadow-none  mb-1
                            ${
                              pathname === '/register'
                                ? 'bg-primary-light text-primary'
                                : 'hover:bg-primary-light hover:text-primary'
                            }
                            `}
                              >
                                <svg
                                  className="h-5 w-5 text-current mr-2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z"
                                  />
                                </svg>
                                Register
                              </Button>
                            </Link>
                          </Menu.Item>
                        </div>
                      )}

                      {isAuthenticated() && (
                        <>
                          <div className="px-1 py-1 space-y-2">
                            <Menu.Item>
                              <Link to="/profile/me">
                                <Button
                                  className={`w-full !capitalize !justify-start !shadow-none  mb-1
                            ${
                              pathname === '/profile/me'
                                ? 'bg-primary-light text-primary'
                                : 'hover:bg-primary-light hover:text-primary'
                            }
                            `}
                                >
                                  <svg
                                    className="h-5 w-5 text-current mr-2"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                                    />
                                  </svg>
                                  My Profile
                                </Button>
                              </Link>
                            </Menu.Item>

                            {isAuthenticated().user.seller && (
                              <Menu.Item>
                                <Link to="/seller/shops">
                                  <Button
                                    className={`w-full !capitalize !justify-start !shadow-none  mb-1
                                      ${
                                        pathname === '/seller/shops'
                                          ? 'bg-primary-light text-primary'
                                          : 'hover:bg-primary-light hover:text-primary'
                                      }
                                      `}
                                  >
                                    <svg
                                      className="h-5 w-5 text-current mr-2"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M5.06 3C4.63 3 4.22 3.14 3.84 3.42C3.46 3.7 3.24 4.06 3.14 4.5L2.11 8.91C1.86 10 2.06 10.92 2.69 11.73C2.81 11.85 2.93 11.97 3.04 12.07C3.63 12.64 4.28 13 5.22 13C6.16 13 6.91 12.59 7.47 12.05C8.1 12.67 8.86 13 9.8 13C10.64 13 11.44 12.63 12 12.07C12.68 12.7 13.45 13 14.3 13C15.17 13 15.91 12.67 16.54 12.05C17.11 12.62 17.86 13 18.81 13C19.76 13 20.43 12.65 21 12.06C21.09 11.97 21.18 11.87 21.28 11.77C21.94 10.95 22.14 10 21.89 8.91L20.86 4.5C20.73 4.06 20.5 3.7 20.13 3.42C19.77 3.14 19.38 3 18.94 3M18.89 4.97L19.97 9.38C20.06 9.81 19.97 10.2 19.69 10.55C19.44 10.86 19.13 11 18.75 11C18.44 11 18.17 10.9 17.95 10.66C17.73 10.43 17.61 10.16 17.58 9.84L16.97 5M5.06 5H7.03L6.42 9.84C6.3 10.63 5.91 11 5.25 11C4.84 11 4.53 10.86 4.31 10.55C4.03 10.2 3.94 9.81 4.03 9.38M9.05 5H11V9.7C11 10.05 10.89 10.35 10.64 10.62C10.39 10.88 10.08 11 9.7 11C9.36 11 9.07 10.88 8.84 10.59C8.61 10.3 8.5 10 8.5 9.66V9.5M13 5H14.95L15.5 9.5C15.58 9.92 15.5 10.27 15.21 10.57C14.95 10.87 14.61 11 14.2 11C13.89 11 13.61 10.88 13.36 10.62C13.11 10.35 13 10.05 13 9.7M3 14.03V19C3 20.11 3.89 21 5 21C9.67 21 14.33 21 19 21C20.1 21 21 20.11 21 19V14.05C20.45 14.63 19.75 14.96 19 15C18 15.03 17.25 14.74 16.54 14.05C15.94 14.65 15.14 15 14.3 15C13.4 15 12.6 14.64 12 14.07C11.43 14.64 10.65 15 9.78 15C8.87 15 8.07 14.65 7.47 14.05C6.89 14.64 6.1 15 5.23 15C4.33 15 3.66 14.65 3 14.03Z"
                                      />
                                    </svg>
                                    My Shops
                                  </Button>
                                </Link>
                              </Menu.Item>
                            )}
                          </div>

                          <div className="px-1 py-1 space-y-2">
                            <Menu.Item>
                              {() => (
                                <Button
                                  to="/logout"
                                  className="w-full !capitalize !justify-start !shadow-none hover:bg-primary-light hover:text-primary mt-1"
                                  onClick={() =>
                                    clearJWT(() => {
                                      navigate('/');
                                    })
                                  }
                                >
                                  <svg
                                    className="h-5 w-5 text-current mr-2"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"
                                    />
                                  </svg>
                                  Logout
                                </Button>
                              )}
                            </Menu.Item>
                          </div>
                        </>
                      )}
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </li>
        </ul>
      </nav>
    </header>
  );
};

Header.propTypes = {
  openSidebar: PropTypes.func,
};

export default Header;
