const formSubmit = (values, { setSubmitting, setStatus, ...formik}) => {

  window.alert(JSON.stringify(values));
  setStatus('Success! Your form was submitted!');
  setSubmitting(false);
}

export default formSubmit;