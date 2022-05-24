import React from 'react';
import styles from './Header.module.css';
import Rebellion from '../../imgs/Rebellion.png';
import Empire from '../../imgs/Empire.png';
import StarWarsLogo from '../../imgs/StarWarsLogo.png';

const Header = () => {
  return (
    <div className={styles.Header}>
      <img
        alt='Rebellion'
        src={Rebellion}
      />
      <img
        alt='Star Wars Logo'
        src={StarWarsLogo}
      />
      <img
        alt='Empire'
        src= {Empire}
        style= {
          {
            height: '70%',
            marginRight: '10px'
          }
        }
      />
    </div>
  )
}

export default Header;