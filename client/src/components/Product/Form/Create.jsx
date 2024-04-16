import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { CREATE_PRODUCT } from '@/graphql/mutations';
import Button from '@/components/UI/Button';
import Alert from '@/components/UI/Alert';
import ProductForm from './Form';

const initialValues = {
  name: '',
  description: '',
  category: '',
  quantity: '',
  price: '',
  image: {},
};

const validationSchema = Yup.object().shape({
  name: Yup.string().min(10).required(),
  description: Yup.string().min(25).required(),
  category: Yup.string().required().min(3),
  quantity: Yup.number().required().min(0),
  price: Yup.number().required(),
  image: Yup.mixed(),
});

function ProductFormCreate() {
  const { shopId } = useParams();
  const [alert, setAlert] = useState({ message: '', variant: '' });
  const [createProduct] = useMutation(CREATE_PRODUCT);

  const handleSubmit = async (values, errors) => {
    try {
      if (!values.image?.type) {
        delete values.image;
      }

      const { data } = await createProduct({
        variables: { shopId: shopId, ...values },
      });

      if (data) {
        errors.resetForm();
        setAlert({
          message: 'Product Created successfully!',
          variant: 'success',
        });
      }
    } catch (err) {
      if (err.graphQLErrors[0]) {
        const { graphQLErrors } = err;
        const { extensions, message } = graphQLErrors[0];

        setAlert({ message: message, variant: 'danger' });

        console.log({ ...err });

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
          <div className="text-center mb-10">
            <h1 className="font-bold text-lg text-dark capitalize">
              Create Product
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
            {/* Save Changes && Cacel */}
            <ProductForm />

            <div className="flex items-center justify-end gap-3 w-full mt-6">
              <Button
                type="submit"
                className="bg-primary hover:bg-primay-dark text-white min-w-[150px]"
              >
                Create
              </Button>
              <Link to={`/seller/shop/${shopId}/edit`}>
                <Button
                  type="button"
                  className="border border-primary hover:bg-info-light text-primary min-w-[150px]"
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

export default ProductFormCreate;
