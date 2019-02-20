import React from 'react';

const SiteScripts = () => (
  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
    integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
    crossOrigin="anonymous"
  />
);

const Head = () => (
  <div>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <SiteScripts/>
  </div>
);

export default Head;
