import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

function Select({ field, form, items }) {
  const handleChange = (value) => {
    form.setFieldValue(field.name, value);
  };

  return (
    <Listbox value={field.value} onChange={handleChange}>
      <div className="relative">
        <Listbox.Button className="relative w-full bg-white rounded-md pl-3 py-2.5 text-left cursor-pointer text-base font-sans shadow-sm text-dark-light">
          <span className="block truncate font-semibold capitalize">
            {field.value}
          </span>
          <span className="absolute inset-y-0 flex items-center pointer-events-none text-dark-light right-0 pr-3">
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full py-1 mt-1.5 overflow-y-auto bg-white rounded-md shadow-md max-h-60 text-base font-sans">
            {items?.map((item, index) => (
              <Listbox.Option
                className={({ active }) =>
                  `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                    active
                      ? 'hover:text-primary hover:bg-primary-light'
                      : 'text-dark-light'
                  }`
                }
                key={index}
                active={({ active }) => active}
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate capitalize ${
                        selected ? 'font-bold text-primary' : 'font-semibold'
                      }`}
                    >
                      {item}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 flex items-center pointer-events-none left-0 pl-3 ${
                          selected ? 'text-primary' : 'text-dark-light'
                        }`}
                      >
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          ></path>
                        </svg>
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

Select.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  items: PropTypes.array,
};

export default Select;
