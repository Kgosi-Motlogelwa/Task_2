import PropTypes from 'prop-types';
import authLogo from '@/assets/auth-logo.svg';

function AuthBase({ children, title }) {
  return (
    <section className="min-w-screen min-h-screen mt-12 mx-4 lg:mx-8 py-5">
      <div className="bg-white text-dark-light rounded-lg mx-auto shadow-sm w-full overflow-hidden max-w-[1100px]">
        <div className="md:flex w-full h-full">
          <div className="hidden md:flex items-center w-1/2 bg-primary py-10 px-10">
            <img src={authLogo} alt="auth logo" />
          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-5">
              <h1 className="font-bold text-3xl text-dark capitalize">
                {title}
              </h1>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

AuthBase.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default AuthBase;
