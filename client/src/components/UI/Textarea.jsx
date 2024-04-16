import PropTypes from 'prop-types';

function Textarea({ label, logo, field, form, ...rest }) {
  return (
    <div className="w-full mb-5">
      <label className="text-sm font-semibold px-1 capitalize text-dark-light">
        {label}
      </label>
      <div className="flex mt-1 items-start">
        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center text-dark-light pt-3">
          {logo}
        </div>
        <textarea
          rows="4"
          className={`resize-none w-full leading-7 -ml-10 pl-10 pr-3 py-2 rounded-lg border-b-2 bg-light placeholder:text-dark-light text-dark-darkest ${
            form.touched[field.name] && form.errors[field.name]
              ? '!border-danger focus:!border-info'
              : '!border-light focus:!border-info'
          }`}
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

Textarea.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  label: PropTypes.string,
  logo: PropTypes.element,
};

export default Textarea;
