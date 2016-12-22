import React from 'react';
import css from 'next/css';

import { raleway, blueGrey, red } from '../styles/base';

const styles = {
  about: css(raleway, blueGrey, {
    textAlign: 'center',
    fontSize: '1.5rem',
    textTransform: 'uppercase',
  }),
  bullet: css({
    margin: '0 .5rem',
  }),
  location: css(red),
};

export default function() {
  return (
    <div className={styles.about}>
      <span className={styles.role}>Writer & Editor</span>
      <span className={styles.bullet}>•</span>
      <span className={styles.location}>New York, NY</span>
    </div>
  );
}

