export default (rawErrors) => {
  const errors = {};
  const { details } = rawErrors;

  // details.forEach((d) => {
  //   errors[d.path] = d.message;
  // });

  errors[details[0].path] = details[0].message;

  return errors;
};
