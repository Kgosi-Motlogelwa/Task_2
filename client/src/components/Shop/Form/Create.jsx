import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { CREATE_SHOP } from '@/graphql/mutations';
import Button from '@/components/UI/Button';
import Alert from '@/components/UI/Alert';
import ShopForm from './Form';

const initialValues = {
  name: '',
  description: '',
  image: {},
};

const validationSchema = Yup.object().shape({
  name: Yup.string().min(10).required(),
  description: Yup.string().min(25).required(),
  image: Yup.mixed(),
});

function ShopFormCreate() {
  const [alert, setAlert] = useState({ message: '', variant: '' });
  const [createShop] = useMutation(CREATE_SHOP);

  const handleSubmit = async (values, errors) => {
    try {
      if (!values.image?.type) {
        delete values.image;
      }

      const { data } = await createShop({ variables: { ...values } });

      if (data) {
        errors.resetForm();
        setAlert({ message: 'Shop Created successfully!', variant: 'success' });
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
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="text-center mb-5">
            <h1 className="font-bold text-lg text-dark capitalize">
              Create Shop
            </h1>
          </div>

          {alert.message && (
            <Alert
              message={alert.message}
              variant={alert.variant}
              closeAlert={() => setAlert({})}
            />
          )}

          <div className="mt-2">
            {/*  Inputs */}
            <ShopForm />

            {/* Save Changes && Cacel */}
            <div className="flex items-center justify-end w-full gap-3 mt-6">
              <Button
                type="submit"
                className="flex bg-primary hover:bg-primary-dark min-w-[150px] text-white"
              >
                Create
              </Button>
              <Link to="/seller/shops">
                <Button
                  type="button"
                  className="flex border min-w-[150px] border-primary hover:bg-primary-light text-primary"
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default ShopFormCreate;
