import React from 'react';
import { mobile } from './constants';


const MobileMenu = (props) => {
    const { isMobileMenuOpen, toggleMobileMenu }  = props;

    return (
      <div className={`mobile-section ${isMobileMenuOpen ? 'visible' : ''}`} onClick={toggleMobileMenu}>
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu__item"></div>
          <div className="mobile-menu__item"></div>
          <div className="mobile-menu__item"></div>
        </div>
        <div className={`mobile-list ${isMobileMenuOpen ? 'visible' : ''}`}>
          {mobile.map(item => <div className="mobile-list__item" key={item}>{item}</div>)}
        </div>
      </div>
    )
}

export default MobileMenu;