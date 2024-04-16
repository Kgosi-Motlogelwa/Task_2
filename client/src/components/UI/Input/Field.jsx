import PropTypes from 'prop-types';
import cn from 'classnames';

function InputField({ label, logo, field, form, ...rest }) {
  // console.log(field);

  return (
    <div className="w-full mb-5">
      <label
        htmlFor={field.name}
        className="text-sm font-semibold px-1 capitalize text-dark-light"
      >
        {label}
      </label>
      <div className="flex my-1">
        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center text-dark-light">
          {logo}
        </div>
        <input
          className={cn(
            'w-full leading-7 -ml-10 pl-10 pr-3 py-2 rounded-md border-b-2 bg-light placeholder:text-dark-light text-dark',

            {
              'border-danger focus:border-primary':
                form.touched[field.name] && form.errors[field.name],
            },
            {
              'border-light focus:border-primary':
                !form.touched[field.name] || !form.errors[field.name],
            }
          )}
          {...field}
          {...rest}
        />
      </div>
      {form.touched[field.name] && form.errors[field.name] ? (
        <div className="text-xs text-danger font-semibold px-1 capitalize">
          {form.errors[field.name]}
        </div>
      ) : null}
    </div>
  );
}

InputField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  label: PropTypes.string,
  logo: PropTypes.element,
};

export default InputField;
