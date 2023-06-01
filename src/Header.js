import React from 'react'
import {FaLaptop,FaTabletAlt,FaMobileAlt} from 'react-icons/fa';
import useWindowS from './hooks/useWindowS';

const Header = ({title}) => {
  const {width}=useWindowS();
  return (
    <div style={{margin:0}}>
      <header className='Header'>
        <h2>{title}</h2>
        <div style={{position:'static',right:'20px'}}>
            {width<768 ? <FaMobileAlt />:width<992 ? <FaTabletAlt />: <FaLaptop />}
        </div>
    </header>
    </div>
  )
}

export default Header