import { Field } from 'formik';

import InputField from '@/components/UI/Input/Field';
import Textarea from '@/components/UI/Textarea';
import UploadPhoto from '@/components/UI/UploadPhoto';

function ProductForm() {
  return (
    <>
      {/* Upload Image */}
      <UploadPhoto />

      {/* Name */}
      <Field name="name">
        {({ field, form }) => (
          <InputField
            field={field}
            form={form}
            label="Name"
            placeholder="A nice blue shirt for men..."
            type="text"
            logo={
              <svg className="w-5 h-5 text-dark-light" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z"
                />
              </svg>
            }
          />
        )}
      </Field>

      {/* Description */}
      <Field name="description">
        {({ field, form }) => (
          <Textarea
            field={field}
            form={form}
            label="Description"
            placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit..."
            logo={
              <svg className="w-5 h-5 text-dark-light" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M8,12H16V14H8V12M10,20H6V4H13V9H18V12.1L20,10.1V8L14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H10V20M8,18H12.1L13,17.1V16H8V18M20.2,13C20.3,13 20.5,13.1 20.6,13.2L21.9,14.5C22.1,14.7 22.1,15.1 21.9,15.3L20.9,16.3L18.8,14.2L19.8,13.2C19.9,13.1 20,13 20.2,13M20.2,16.9L14.1,23H12V20.9L18.1,14.8L20.2,16.9Z"
                />
              </svg>
            }
          />
        )}
      </Field>

      {/* Category */}
      <Field name="category">
        {({ field, form }) => (
          <InputField
            field={field}
            form={form}
            label="Category"
            placeholder="Shirt"
            type="text"
            logo={
              <svg className="w-5 h-5 text-dark-light" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M21.41 11.58L12.41 2.58A2 2 0 0 0 11 2H4A2 2 0 0 0 2 4V11A2 2 0 0 0 2.59 12.42L11.59 21.42A2 2 0 0 0 13 22A2 2 0 0 0 14.41 21.41L21.41 14.41A2 2 0 0 0 22 13A2 2 0 0 0 21.41 11.58M13 20L4 11V4H11L20 13M6.5 5A1.5 1.5 0 1 1 5 6.5A1.5 1.5 0 0 1 6.5 5Z"
                />
              </svg>
            }
          />
        )}
      </Field>

      {/* Quantity */}
      <Field name="quantity">
        {({ field, form }) => (
          <InputField
            field={field}
            form={form}
            label="Quantity"
            placeholder="100"
            type="number"
            logo={
              <svg className="w-5 h-5 text-dark-light" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M3 7H6V4H8V7H11V9H8V12H6V9H3V7M13 15H21V17H13V15M16.04 3H18.35L7.96 21H5.65L16.04 3Z"
                />
              </svg>
            }
          />
        )}
      </Field>

      {/* Price */}
      <Field name="price">
        {({ field, form }) => (
          <InputField
            field={field}
            form={form}
            label="Price"
            placeholder="99.99"
            type="number"
            logo={
              <svg className="w-5 h-5 text-dark-light" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z"
                />
              </svg>
            }
          />
        )}
      </Field>
    </>
  );
}

export default ProductForm;
