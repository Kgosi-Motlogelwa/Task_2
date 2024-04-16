import { useQuery } from '@apollo/client';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';

import { LIST_CATEGORIES } from '@/graphql/queries';
import Button from '@/components/UI/Button';
import InputSearch from '@/components/UI/Input/Search';
import Select from '@/components/UI/Select';

import PropTypes from 'prop-types';

const initialValues = {
  search: '',
  category: 'all',
};

function ProductSearch({ handleFilter }) {
  const [categories, setCategories] = useState([]);
  const { data, loading, refetch } = useQuery(LIST_CATEGORIES);

  useEffect(() => {
    refetch();

    if (data && data.listCategories && !loading) {
      setCategories(['all', ...data.listCategories]);
    }
  }, [data, loading, refetch]);

  const handleSubmit = (values) => {
    handleFilter({ ...values });
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className="flex md:items-center flex-col md:flex-row py-3 lg:space-x-4 md:space-x-2 space-y-2 md:space-y-0 z-50">
          <Field name="search">
            {({ field, form }) => (
              <InputSearch field={field} form={form} placeholder="Search..." />
            )}
          </Field>

          {/* Category */}
          <div className="flex items-center space-x-4 md:space-x-2">
            

            <Button
              tupe="submit"
              className="relative min-w-[150px] leading-7 bg-primary text-white hover:bg-primary-dark"
            >
              Search
            </Button>
          </div>

          {/*<input type="submit" value="" className="hidden" />*/}
        </Form>
      </Formik>
    </div>
  );
}

ProductSearch.propTypes = {
  handleFilter: PropTypes.func,
};

export default ProductSearch;
