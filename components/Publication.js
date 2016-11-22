import React from 'react';

export default class extends React.Component {
  constructor() {
    super();
    this.state = { isOpen: false };
  }

  render() {
    const clips = this.props.publication.clips.map(({ headline, link }, index) =>
      <a  key={index} href={link} className="clips-by-publication__clip" target="_blank" dangerouslySetInnerHTML={{ __html: headline }}></a>
    );
    return (
      <div className="clips-by-publication">
        <h3>{this.props.publication.publisher}</h3>
        <div className="clips-by-publication__pieces">
          {clips}
        </div>
      </div>
    );
  }
}