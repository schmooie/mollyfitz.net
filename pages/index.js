import React from 'react';
import css from 'next/css';
import 'isomorphic-fetch';

import LINK_GROUPS from '../constants/link-groups';
import * as baseStyles from '../styles/base';

import Head from '../components/Head';
import About from '../components/About';
import Publication from '../components/Publication';

const styles = {
  background: css({
    backgroundColor: '#F9F7F6',
  }),
  h1: css(baseStyles.raleway, baseStyles.blueGrey, {
    fontSize: '5.5rem',
    textAlign: 'center',
    textTransform: 'uppercase',
    margin: '0',
  }),
};


export default class extends React.Component {
  static async getInitialProps({ res }) {
    if (!res) {
      return {};
    }

    const fetchResponse = await fetch('https://spreadsheets.google.com/feeds/list/1ZkQdqqcItaWeyinrCYibK0zmmw6_4HE3Zjgfe98cyeI/1/public/basic?alt=json');
    const data = await fetchResponse.json();
    const clipsByPublisher = data.feed.entry
    .map((entry) => {
      const content = entry.content.$t;
      const publisher = entry.title.$t;
      const headline = content.match(/^headline:\s(.*),\slink:/)[1];
      const link = content.match(/link:\s(.*$)/)[1];

      return { publisher, headline, link };
    })
    .reduce((groupedClips, clip) => {
      const publisher = clip.publisher;

      if (!groupedClips[publisher]) {
        groupedClips[publisher] = [];
      }

      groupedClips[publisher].push(clip);

      return groupedClips;
    }, {});

    const allClips = Object.keys(clipsByPublisher).map(publisher => ({
      publisher,
      clips: clipsByPublisher[publisher],
    }));

    return { allClips };
  }

  render() {
    const links = LINK_GROUPS.map((group, index) => (
      <div key={index} className="links__group">
        <h3 className="links__group__header">{group.title}</h3>
        <div className="links__group__items">
          {group.links.map((link, idx) =>
            <a key={idx} href={link.href} target={link.internal ? '_self' : '_blank'}>
              {link.label}
            </a>,
          )}
        </div>
      </div>
    ));

    const publications = this.props.allClips.map((publication, index) =>
      <Publication key={index} publication={publication} />,
    );

    return (
      <div>
        <Head />

        <div className="container">
          <h1 className={styles.h1}>Molly Fitzpatrick</h1>
          <About />
          <div className="links">{links}</div>
        </div>

        <div id="clips">
          {publications}
        </div>
      </div>
    );
  }
}

