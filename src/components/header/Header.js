import React from 'react'
import './styles.css';
import logo from '../../images/logo2.png'

function Header() {
  return (
    <div className='header-container' >
      <div className='logo'>
        <img src={logo} alt='logo' width='100' height='100' />
      </div>
      <div className='name'>
        <p className='font-weight-bold'>
          مركــز الإنــذار المبكــر بمخاطــر الطقــس
        </p>
      </div>
      <div className='ema-name'>
        <p>الهيئة العامة للأرصاد الجوية المصرية</p>
      </div>

      {/* <div className='name'>
        <p className='font-weight-bold name-p'>
          مركــز الإنــذار المبكــر بمخاطــر الطقــس
        </p>
      </div>
      <div className='logo'>
        <img src={logo} alt='logo' width='100' height='100' />
        <p class='ema-name'>الهيئة العامة للأرصاد الجوية المصرية</p>
      </div> */}
    </div>
  )
}

export default Header