import { Field } from 'formik';

function UploadPhoto() {
  const handleFileChange = (event, form) => {
    form.setFieldValue('image', event.currentTarget.files[0]);
  };

  return (
    <>
      <Field name="image">
        {({ field, form }) => (
          <div className="mb-5 flex items-center justify-center w-full">
            <input
              id="icon-button-file"
              name="image"
              type="file"
              accept="image/*"
              onChange={(event) => handleFileChange(event, form)}
              hidden
            />

            <label
              htmlFor="icon-button-file"
              className="cursor-pointer bg-warning hover:bg-warning-dark text-white leading-7 inline-flex items-center justify-center px-6 py-2 text-xs font-bold uppercase transition  rounded shadow ripple hover:shadow-lg focus:outline-none tracking-wide"
            >
              <svg className="w-5 h-5 fill-current mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z"
                />
              </svg>
              Upload
            </label>
            <span className="ml-2 text-sm text-dark">
              {field.value ? field.value.name : ''}
            </span>
          </div>
        )}
      </Field>
    </>
  );
}

export default UploadPhoto;
