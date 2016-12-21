import React from 'react';
import css from 'next/css';

import { raleway, blueGrey } from '../styles/base';

const styles = {
  about: css(raleway, blueGrey),
};

export default function() {
  return (
    <div className={styles.about}>
      <span className="about__role">Writer & Editor</span>
      <span className="about__bullet">•</span>
      <span className="about__location">New York, NY</span>
    </div>
  );
}

