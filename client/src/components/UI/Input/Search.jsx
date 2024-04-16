import PropTypes from 'prop-types';

function InputSearch({ field, ...rest }) {
  return (
    <div className="w-full flex flex-grow">
      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
        <svg className="w-5 h-5 text-dark-light" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
          />
        </svg>
      </div>

      <input
        className="w-full -ml-10 pl-10 pr-3 py-2.5 rounded-md shadow-sm bg-white text-base placeholder:text-dark-light text-dark font-medium"
        type="search"
        {...field}
        {...rest}
      />
    </div>
  );
}

InputSearch.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object,
};

export default InputSearch;
