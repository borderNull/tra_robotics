import React, { Component } from 'react';
import Select from 'react-select';
import { withFormik } from 'formik';
import { positions } from './constants'
import formValues from './form-values';
import formStatus from './form-status';
import formValidationSchema from './form-schema';
import formSubmit from './form-submit';

import './App.css';


const positionValues = positions.map(position => position.value);
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
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      selectedOption: null,
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
                onChange={this.handleChange}
                onBlur={handleBlur}
                options={positions}
                className="form-react-select"
                styles={customStyles}
                name='position'
                // value={values.position}
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
            <div className="form-field form__link">
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
            <input className="hidden-input" type="file" ref={this.fileInput} onChange={this.changeFile} />
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
          <a className="footer__policy" href="#" >Privacy Policy</a>
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
