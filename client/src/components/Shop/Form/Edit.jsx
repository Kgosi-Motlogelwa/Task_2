import { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { GET_SHOP } from '@/graphql/queries';
import { UPDATE_SHOP } from '@/graphql/mutations';
import Button from '@/components/UI/Button';
import Alert from '@/components/UI/Alert';
import ShopForm from './Form';
import { useParams } from 'react-router-dom';

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

function ShopFormEdit() {
  const formikRef = useRef();
  const { shopId } = useParams();
  const [alert, setAlert] = useState({ message: '', variant: '' });
  const { loading, data, refetch } = useQuery(GET_SHOP, {
    variables: { shopId: shopId },
  });
  const [updateShop] = useMutation(UPDATE_SHOP);

  useEffect(() => {
    const { current } = formikRef;
    if (data && data.getShop && !loading) {
      current.setFieldValue('name', data.getShop.name);
      current.setFieldValue('description', data.getShop.description);
      current.setFieldValue('image.name', data.getShop.image);
    }
  }, [data, loading]);

  const handleSubmit = async (values, errors) => {
    try {
      if (!values.image?.type) {
        delete values.image;
      }

      const { data } = await updateShop({
        variables: { shopId: shopId, ...values },
      });

      if (data) {
        setAlert({ message: 'Shop Updated successfully!', variant: 'success' });
        refetch();
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
    <div className="lg:col-span-5 md:col-span-6 bg-white shadow-sm rounded-lg px-4 py-6 flex  flex-col justify-center h-[600px]">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        innerRef={formikRef}
      >
        <Form>
          <div className="text-center mb-10">
            <h1 className="font-bold text-lg text-gray-400 capitalize">
              Edit Shop
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
            <ShopForm />

            {/* Save Changes */}
            <div className="flex items-center justify-end mt-8">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white"
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

export default ShopFormEdit;
