import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <div className="pizza-block-wrapper">
    <ContentLoader
      className="pizza-block"
      speed={3}
      width={280}
      height={476}
      viewBox="0 0 280 476"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}>
      <rect x="0" y="270" rx="5" ry="5" width="280" height="27" />
      <circle cx="140" cy="125" r="125" />
      <rect x="0" y="307" rx="8" ry="8" width="280" height="90" />
      <rect x="129" y="415" rx="22" ry="22" width="153" height="46" />
      <rect x="0" y="427" rx="9" ry="9" width="91" height="27" />
    </ContentLoader>
  </div>
);

export default MyLoader;
