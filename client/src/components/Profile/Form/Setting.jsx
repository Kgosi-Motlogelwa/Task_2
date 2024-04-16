import { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Switch } from '@headlessui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { GET_ME } from '@/graphql/queries';
import { UPDATE_ME } from '@/graphql/mutations';
import InputField from '@/components/UI/Input/Field';
import Button from '@/components/UI/Button';
import Alert from '@/components/UI/Alert';
import Textarea from '@/components/UI/Textarea';
import { updateUser } from '@/components/Auth/auth-helpers';

const initialValues = {
  name: '',
  email: '',
  about: '',
  seller: false,
};

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).required(),
  email: Yup.string().email().required(),
  about: Yup.string().min(10),
  seller: Yup.bool(),
});

function ProfileFormSetting() {
  const formikRef = useRef();
  const [alert, setAlert] = useState({
    message: '',
    variant: '',
  });
  const { loading, data, refetch } = useQuery(GET_ME);
  const [updateMe] = useMutation(UPDATE_ME);

  useEffect(() => {
    const { current } = formikRef;
    if (data && data.getMe && !loading) {
      data.getMe.name && current.setFieldValue('name', data.getMe.name);
      data.getMe.email && current.setFieldValue('email', data.getMe.email);
      data.getMe.about && current.setFieldValue('about', data.getMe.about);
      data.getMe.seller && current.setFieldValue('seller', data.getMe.seller);
    }
  }, [data, loading]);

  const handleSubmit = async (values, errors) => {
    try {
      !values.about && delete values.about;

      const { data } = await updateMe({
        variables: {
          ...values,
        },
      });

      if (data) {
        setAlert({
          message: 'Setting Updated successfully!',
          variant: 'success',
        });

        refetch();
        updateUser(data.updateMe, () => {});
      }
    } catch (err) {
      if (err.graphQLErrors[0]) {
        const { graphQLErrors } = err;
        const { extensions, message } = graphQLErrors[0];

        setAlert({ message: message, variant: 'danger' });

        if (extensions) {
          const { error: validationError } = extensions;
          validationError && errors.setErrors(validationError);
        }
      }
    }
  };

  const handleChangeSwitch = (form) => {
    form.setFieldValue('seller', !form.values.seller);
  };

  return (
    <div className="py-3">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        innerRef={formikRef}
      >
        <Form>
          <div className="mb-10 lg:px-8">
            <h1 className="font-bold text-lg text-dark capitalize">
              your account setting
            </h1>
          </div>

          {alert.message && (
            <Alert
              message={alert.message}
              variant={alert.variant}
              closeAlert={() => setAlert({})}
            />
          )}

          <div className="lg:px-8 mt-2">
            {/* Name */}
            <Field name="name">
              {({ field, form }) => (
                <InputField
                  field={field}
                  form={form}
                  label="Name"
                  type="text"
                  placeholder="John Smith"
                  logo={
                    <svg
                      className="w-5 h-5 text-dark-light"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                      />
                    </svg>
                  }
                />
              )}
            </Field>

            {/* Email Address */}
            <Field name="email">
              {({ field, form }) => (
                <InputField
                  field={field}
                  form={form}
                  label="Email address"
                  type="email"
                  placeholder="johnsmith@example.com"
                  logo={
                    <svg
                      className="w-5 h-5 text-dark-light"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z"
                      />
                    </svg>
                  }
                />
              )}
            </Field>

            {/*  About */}
            <Field name="about">
              {({ field, form }) => (
                <Textarea
                  field={field}
                  form={form}
                  label="About"
                  placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit..."
                  logo={
                    <svg
                      className="w-5 h-5 text-dark-light"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M8,12H16V14H8V12M10,20H6V4H13V9H18V12.1L20,10.1V8L14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H10V20M8,18H12.1L13,17.1V16H8V18M20.2,13C20.3,13 20.5,13.1 20.6,13.2L21.9,14.5C22.1,14.7 22.1,15.1 21.9,15.3L20.9,16.3L18.8,14.2L19.8,13.2C19.9,13.1 20,13 20.2,13M20.2,16.9L14.1,23H12V20.9L18.1,14.8L20.2,16.9Z"
                      />
                    </svg>
                  }
                />
              )}
            </Field>

            {/* seller account */}
            <div className="flex">
              <div className="lg:px-8 mb-5 flex flex-col mx-auto items-center">
                <span className="text-sm font-semibold capitalize mb-2">
                  seller account
                </span>
                <div className="relative inline-block w-14 align-middle select-none">
                  <Field name="seller">
                    {({ field, form }) => (
                      <Switch
                        checked={field.value}
                        name={field.name}
                        onChange={() => handleChangeSwitch(form)}
                        className={`${
                          field.value === true ? 'bg-success' : 'bg-light-dark'
                        }
          relative inline-flex flex-shrink-0 h-[30px] w-[68px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                      >
                        <span
                          aria-hidden="true"
                          className={`${
                            field.value === true
                              ? 'translate-x-9'
                              : 'translate-x-0'
                          }
            pointer-events-none inline-block h-[26px] w-[26px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                        />
                      </Switch>
                    )}
                  </Field>
                </div>
              </div>
            </div>

            {/* Save Changes */}
            <div className="flex items-center justify-end mb-5 mt-6">
              <Button
                type="submit"
                className="flex bg-primary hover:bg-primary-dark text-white"
              >
                save changes
              </Button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default ProfileFormSetting;
