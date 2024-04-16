import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import InputField from '@/components/UI/Input/Field';
import Button from '@/components/UI/Button';
import Alert from '@/components/UI/Alert';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '@/graphql/mutations';

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).required(),
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8),
  confirmPassword: Yup.string()
    .required('Confirm Password Is A Required Field')
    .oneOf([Yup.ref('password'), null], "Password doesn't match"),
});

function AuthFormRegister() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ message: '', variant: '' });
  const [register] = useMutation(REGISTER_USER);

  const handleSubmit = async (values, errors) => {
    try {
      const { data } = await register({
        variables: { ...values },
      });

      if (data) {
        errors.resetForm();
        navigate('/login');
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

  return (
    <>
      {alert.message && (
        <Alert
          message={alert.message}
          variant={alert.variant}
          closeAlert={() => setAlert({})}
        />
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className="py-5">
          {/* Name */}

          <Field name="name">
            {({ field, form }) => (
              <InputField
                field={field}
                form={form}
                label="Name"
                type="text"
                placeholder="John Doe"
                logo={
                  <svg className="w-5 h-5 text-dark-light" viewBox="0 0 24 24">
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
                placeholder="johndoe@example.com"
                logo={
                  <svg className="w-5 h-5 text-dark-light" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z"
                    />
                  </svg>
                }
              />
            )}
          </Field>

          {/* Password */}
          <Field name="password">
            {({ field, form }) => (
              <InputField
                field={field}
                form={form}
                label="Password"
                type="password"
                placeholder="********"
                name="password"
                logo={
                  <svg className="w-5 h-5 text-dark-light" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"
                    />
                  </svg>
                }
              />
            )}
          </Field>

          {/* Confirm Password */}
          <Field name="confirmPassword">
            {({ field, form }) => (
              <InputField
                field={field}
                form={form}
                label="Confirm Password"
                type="password"
                placeholder="********"
                logo={
                  <svg className="w-5 h-5 text-dark-light" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"
                    />
                  </svg>
                }
              />
            )}
          </Field>

          <div className="flex -mx-3">
            <div className="w-full px-3 mt-5">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary-dark w-full text-white !leading-7"
              >
                register
              </Button>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default AuthFormRegister;
