import React, { Component } from 'react';
import Select from 'react-select';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { positions } from './constants'
import logo from './logo.svg';

import './App.css';


// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ];

const formValues = () => {
  const values = {
    firstName: '',
    lastName: '',
    phone: '',
    position: '',
    comments: '',
    link: '',
    file: '',
  }
  
  return values;
};

const formValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Заполните это поле'),
  lastName: Yup.string()
    .required('Заполните это поле'),
  phone: Yup.string()
    .matches(/^((\+7|7|8)+([0-9]){10})$/, 'Введите корректный номер телефона')
    .required('Заполните это поле'),
  comments: Yup.string()
    .required('Заполните это поле'),
  link: Yup.string()
    .url('Введите корректный адрес'),
  position: Yup.string()
    .oneOf(positions, 'Выберите позицию из списка'),
})

const formSubmit = (values, { setSubmitting, ...formik}) => {


  console.log('values',values)

  setSubmitting(false);
}

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
    width: '100%',
  }),
  control: (provided, state) => ({
    // none of react-select's styles are passed to <Control />
    // width: 200,
    // width: '100%',
    // height: '42px',
    // borderRadius: '20px',
    // outline: 'none',
    // paddingLeft: '14px',
    // boxSizing: 'border-box',
    ...provided,
    border: '1px solid #d9dbde',
    color: '#737882',
    fontSize: '17px',
    fontFamily: 'LabGrotesque-Light',
    display: 'flex',
    height: '42px',
    borderRadius: '20px',
    outline: 'none',
    
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
  indicatorSeparator: (provided, state) => {
    const display = 'none';

    return { ...provided, display };
  },

}

class InnerForm extends Component {
  state = {
    selectedOption: null,
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }
  render() {
    const {
      handleSubmit,
      handleChange,
      values,
    } = this.props;
    const { selectedOption } = this.state;

    console.log('values', values);
    return (
      <div className="App">
        <header className="header">
          <p className="header__title">tra robotics</p>
          <div className="mobile-menu">
            <div className="mobile-menu__item"></div>
            <div className="mobile-menu__item"></div>
            <div className="mobile-menu__item"></div>
          </div>
        </header>
        <div className="form-wrap">
          <h1 className="form__title">Careers. Send us your CV</h1>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-field">
              <Select
                // className="form__select"
                // value={selectedOption}
                onChange={handleChange}
                options={positions}
                className="form-react-select"
                styles={customStyles}
                name='position'
                value={values.position}
              />
            </div>
            <div className="form-contacts">
              <div className="form-field">
                <input className="form__input" onChange={handleChange}   placeholder="Name" name='firstName' value={values.firstName} />
              </div>
              <div className="form-field">
                <input className="form__input"  placeholder="Lastname" />
              </div>
              <div className="form-field">
                <input className="form__input"  placeholder="Mobile Phone" />
              </div>
            </div>
            <div className="form-field form-textarea">
              <textarea className="form__input form__textarea"  placeholder="Comments"></textarea>
            </div>
            <div className="form-field form__link">
              <input className="form__input"  placeholder="Link to your CV, ex. http://" />
            </div>

            <a className="form-upload" href="#">Upload CV file</a>

            <button className="form__submit">Send</button>

          </form>
        </div>
        <footer className="footer">
          <p className="footer__text">Copyright © 2018, Tra Robotics ltd. All rights reserved.</p>
          <a className="footer__policy" href="#" >Privacy Policy</a>
        </footer>
      </div>
    );
  }
}

const App = withFormik({
  mapPropsToValues: formValues,
  validationSchema: formValidationSchema,
  handleSubmit: formSubmit,
})(InnerForm);

export default App;
