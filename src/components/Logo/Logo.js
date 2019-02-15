import React from 'react';

import emojiLogo from '../../assets/images/emoji-logo.png';
import classes from './Logo.css';

const logo  = (props) => (
  <div className={classes.Logo}>
    <img src={emojiLogo} alt="Emoji Pets!" />
  </div>
);

export default logo;