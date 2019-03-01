import React, { Component } from 'react';
import Select from 'react-select';
import { withFormik } from 'formik';

import MobileMenu from './mobile-menu';
import { positions } from './constants';
import formValues from './form-values';
import formStatus from './form-status';
import formValidationSchema from './form-schema';
import formSubmit from './form-submit';

import './App.css';
 
const customStyles = {
  option: (styles, state) => ({
    ...styles,
    border: 'none',
    color: '#737882',
    padding: 20,
    width: '100%',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    textAlign: 'left',
    '&:hover': {
      color: '#000',
    },
    '&:active': {
      backgroundColor: 'transparent',
    },
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }),
  menu: (styles) => ({
    ...styles,
    borderRadius: '20px',
  }),
  control: (styles) => ({
    ...styles,
    border: '1px solid #d9dbde',
    color: '#737882',
    fontSize: '17px',
    fontFamily: 'LabGrotesque-Light',
    display: 'flex',
    height: '42px',
    borderRadius: '20px',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
   },
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    display:'none',
  }),
  dropdownIndicator: (styles, state) => ({
    ...styles,
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
    cursor: 'pointer',
  }),


}

class InnerForm extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      mobileMenu: false, 
    }
  }

  handleChange = (e) => {
    const { setFieldValue } = this.props;

    setFieldValue('position', e.value);
  }

  uploadCV = () => {
    this.fileInput.current.click();
  }

  changeFile = (e) => {
    const { setFieldValue } = this.props;
    const file = e.target.files[0];

    setFieldValue('file', file);
  }

  toggleMobileMenu = (e) => {
    const isMobileMenuHamburger = e.target.classList.contains('active');

    if (isMobileMenuHamburger) {
      this.setState({ mobileMenu: false });
    } else {
      this.setState({ mobileMenu: true });
    }
  }

  hideMobileMenu = (e) => {
    const isMobileLayer = e.target.classList.contains('mobile-section');
    if(isMobileLayer) {
      this.setState({ mobileMenu: false });
    }
  }

  render() {
    const {
      handleSubmit,
      handleChange,
      handleBlur,
      values,
      errors,
      touched,
      isSubmitting,
      status,
    } = this.props;
    const { mobileMenu } = this.state;
    const { toggleMobileMenu } = this;

    return (
      <div className="App" onClick={this.hideMobileMenu}>
        <header className="header">
          <p className="header__title">tra robotics</p>
          <MobileMenu  isMobileMenuOpen={mobileMenu} toggleMobileMenu={toggleMobileMenu} />
        </header>
        <div className="form-wrap">
          <h1 className="form__title">Careers. Send us your CV</h1>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-field">
              <Select
                onChange={this.handleChange}
                onBlur={handleBlur}
                options={positions}
                className="form-react-select"
                styles={customStyles}
                name='position'
                placeholder="Select Position"
                isSearchable={false}
              />
              {errors.position && touched.position &&
                  <span className="form__error">{errors.position}</span>
                }
            </div>
            <div className="form-contacts">
              <div className="form-field">
                <input
                  className="form__input"
                  placeholder="Name"
                  name='firstName'
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.firstName && touched.firstName &&  
                  <span className="form__error">{errors.firstName}</span>
                }
              </div>
              <div className="form-field">
                <input
                  className="form__input"
                  placeholder="Lastname"
                  name='lastName'
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.lastName && touched.lastName &&  
                  <span className="form__error">{errors.lastName}</span>
                }
              </div>
              <div className="form-field">
                <input
                  className="form__input"
                  placeholder="Mobile Phone"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phone && touched.phone &&  
                  <span className="form__error">{errors.phone}</span>
                }
              </div>
            </div>
            <div className="form-field form-textarea">
              <textarea
                className="form__input form__textarea" 
                placeholder="Comments"
                name="comments"
                value={values.comments}
                onChange={handleChange}
                onBlur={handleBlur}
              >
              </textarea>
              {errors.comments && touched.comments &&  
                <span className="form__error">{errors.comments}</span>
              }
            </div>
            <div className="form-field form-link">
              <input
                className="form__input"
                placeholder="Link to your CV, ex. http://"
                name="link"
                value={values.link}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.link && touched.link &&
                <span className="form__error">{errors.link}</span>
              }
            </div>
            <input className="file__input" type="file" ref={this.fileInput} onChange={this.changeFile} />
            <button className="form-upload" type="button" onClick={this.uploadCV}>Upload CV file</button>
            {values.file.name && 
              <div className="file-name">attached file name: {values.file.name}</div>
            }
            <button className="form__submit" disabled={isSubmitting} type="submit">Send</button>  
            {!!status.length && <div className="form__success">{status}</div>}
          </form>
        </div>
        <footer className="footer">
          <p className="footer__text">Copyright © 2018, Tra Robotics ltd. All rights reserved.</p>
          <p className="footer__policy">Privacy Policy</p>
        </footer>
      </div>
    );
  }
}

const App = withFormik({
  mapPropsToValues: formValues,
  mapPropsToStatus: formStatus,
  validationSchema: formValidationSchema,
  handleSubmit: formSubmit,
})(InnerForm);

export default App;
