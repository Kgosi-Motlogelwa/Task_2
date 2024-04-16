import { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { GET_PRODUCT } from '@/graphql/queries';
import { UPDATE_PRODUCT } from '@/graphql/mutations';
import Button from '@/components/UI/Button';
import ProductForm from './Form';
import Alert from '@/components/UI/Alert';

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

function ProductFormEdit() {
  const { shopId, productId } = useParams();
  const formikRef = useRef();
  const [alert, setAlert] = useState({ message: '', variant: '' });
  const { loading, data, refetch } = useQuery(GET_PRODUCT, {
    variables: { productId: productId },
  });
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  useEffect(() => {
    const { current } = formikRef;

    if (data && data.getProduct && !loading) {
      current.setFieldValue('name', data.getProduct.name);
      current.setFieldValue('description', data.getProduct.description);
      current.setFieldValue('category', data.getProduct.category);
      current.setFieldValue('quantity', data.getProduct.quantity);
      current.setFieldValue('price', data.getProduct.price);
      current.setFieldValue('image.name', data.getProduct.image);
    }
  }, [data, loading]);

  const handleSubmit = async (values, errors) => {
    try {
      if (!values.image?.type) {
        delete values.image;
      }

      const { data } = await updateProduct({
        variables: {
          shopId: shopId,
          productId: productId,
          ...values,
        },
      });

      if (data) {
        refetch();
        setAlert({
          message: 'Product Updated successfully!',
          variant: 'success',
        });
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
        innerRef={formikRef}
      >
        <Form>
          <div className="text-center mb-10">
            <h1 className="font-bold text-lg text-dark capitalize">
              Edit Product
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
            <ProductForm />

            {/* Save Changes */}
            <div className="flex items-center justify-end w-full mt-6">
              <Button
                type="submit"
                className="flex bg-primary hover:bg-primary-dark text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default ProductFormEdit;
