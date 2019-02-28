import * as Yup from 'yup';

const formValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(20, (val) => `Your name is too long max size is ${val.max} symbols`)
    .required('This field is required'),
  lastName: Yup.string()
    .max(20, (val) => `Your Lastname is too long max size is ${val.max} symbols`)
    .required('This field is required'),
  phone: Yup.string()
    .matches(/^((\+7|7|8)+([0-9]){10})$/, 'Only correct russian phone are valid ')
    .required('This field is required'),
  comments: Yup.string()
    .max(255, (val) => `Your comment is too long max size is ${val.max} symbols`)
    .required('This field is required'),
  link: Yup.string()
    .url('Fill correct link address, Example: http://www.some-address.com')
    .required('This field is required'),
    position: Yup.string()
    // .oneOf(positionValues, 'Выберите позицию из списка')
    .required('Choose position from list'),
  })

  export default formValidationSchema;