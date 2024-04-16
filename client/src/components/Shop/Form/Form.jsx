import { Field } from 'formik';
import InputField from '@/components/UI/Input/Field';
import Textarea from '@/components/UI/Textarea';
import UploadPhoto from '@/components/UI/UploadPhoto';

function ShopForm() {
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
            placeholder="ShopName123"
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
    </>
  );
}

export default ShopForm;
